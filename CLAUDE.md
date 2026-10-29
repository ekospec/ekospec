# Ekospec.pro — kontekst projektu dla Claude Code

## O projekcie
Strona firmowa **Ekospec** — doradztwo w efektywności energetycznej, audyty energetyczne,
modernizacje i wykonawstwo instalacji, automatyka budynkowa.
- Właściciel: Bartłomiej Głąbiński (inżynier, jednoosobowa działalność)
- Firma prawna: Przedsiębiorstwo Techniczne Usługowo Handlowe JANTAR Bartłomiej Głąbiński
- Lokalizacja: ul. Szaflarska 100/1, Nowy Targ (Podhale, Małopolska); obsługa Podhala i Zakopanego
- Kontakt: +48 573 018 657 · biuro@ekospec.pro · WhatsApp
- Odbiorcy: osoby prywatne (domy), wspólnoty, hotele i pensjonaty (często z basenem),
  biura/usługi, zakłady produkcyjne, obiekty publiczne
- Ton komunikacji: rzeczowy, ekspercki, konkretny, w 1. osobie („Znajdę, gdzie ją traci”).
  Bez marketingowego nadęcia. Liczby i efekty > ogólniki.

## Technologia i hosting
- **Statyczna strona HTML/CSS/JS, bez frameworka.** Nie wprowadzaj Reacta, Next.js, bundlerów
  ani npm-owych zależności runtime bez wyraźnej zgody właściciela.
- **Jedyny krok budowania: `python _build.py`** (sam Python, bez zależności). Skrypt:
  1. wstawia fragmenty z `_partials/` do `index.html` między znaczniki `<!-- @nazwa -->` … `<!-- /@nazwa -->`,
  2. z każdego `_strony/NAZWA.html` buduje `NAZWA/index.html` (meta, JSON-LD Service/FAQPage),
  3. odświeża `sitemap.xml`.
  **Nie edytuj ręcznie** `*/index.html` podstron ani treści między znacznikami `@nazwa` w `index.html` —
  zmieniaj źródło w `_strony/` lub `_partials/`, uruchom `_build.py` i commituj źródło razem z wynikiem.
- Hosting: **GitHub Pages** z gałęzi `main` — push na `main` = publikacja. Domena: ekospec.pro (`CNAME`).
  Foldery zaczynające się od `_` nie są publikowane.
- `.github/workflows/indexnow.yml` — zgłasza zmienione adresy do IndexNow (Bing) po pushu;
  klucz w `0e7d9d2a15eeb3df751cb5a9febc7482.txt` — nie usuwaj.
- Język strony: polski (`lang="pl"`, `og:locale` pl_PL). Wszystkie teksty dla użytkownika po polsku,
  z poprawnymi polskimi znakami i typografią (półpauza „–”, cudzysłowy „ ”, twarda spacja przed
  jednoliterowymi spójnikami tam, gdzie to ma znaczenie).
- Formularz kontaktowy: **Formspree** + **Cloudflare Turnstile** (CAPTCHA) + pole honeypot.
  Nie usuwaj żadnego z tych zabezpieczeń.
- Analityka: tylko **Cloudflare Web Analytics** (bez cookies, w `_partials/overlays.html`).

## Struktura plików (stan na 2026-10-29)
- `index.html` — strona główna, sekcje w kolejności: `#hero`, `#o-mnie`, `#oferta`, `#proces`,
  `#realizacje`, `#kalkulator`, `#kontakt`, stopka
- `_partials/` — wspólne fragmenty: `nav.html` (menu), `footer.html` (stopka),
  `overlays.html` (baner cookies, okna, skrypt analityki); `{{root}}` = ścieżka do katalogu głównego
- `_strony/*.html` — źródła podstron usług: nagłówek `klucz: wartość` do linii `---`, potem treść HTML
- Podstrony usług (wynik `_build.py`, katalog + `index.html`):
  `/audyt-energetyczny/`, `/planowanie-modernizacji/`, `/optymalizacja-kosztow/`,
  `/doradztwo-techniczne/`, `/lekarz-budynkow/`, `/automatyka-budynkowa/`, `/instalacje/`, `/tani-prad/`
- `assets/ekospec.css`, `assets/ekospec.js` — główne style i skrypty (w `ekospec.js` m.in. treści
  dokumentów prawnych `LEGAL_DOCS` i `openLegal()`)
- `assets/ekospec-3d.css`, `assets/ekospec-3d.js` — efekty 3D
- `assets/fonts/` — fonty hostowane lokalnie (Rajdhani, Nunito Sans, woff2 + licencje OFL)
- Grafiki: ilustracje usług `ilustracja-*.svg`, logo `obwod.svg`, `slon.svg`, `logo-m-*.svg` (mobile),
  `logo-ekospec-{104,156,208}.webp`, zdjęcia `*-800.webp` / `*-1600.webp`, obrazy OG w `og/`
- `favicon.svg` (adaptacyjny jasny/ciemny) + `favicon-*.png`, `apple-touch-icon.png`, `site.webmanifest`
- `ekospec-kontakt.vcf` — wizytówka vCard
- `llms.txt` — opis strony dla modeli AI (aktualizuj przy zmianach oferty)
- `robots.txt`, `sitemap.xml` (generowany przez `_build.py`)
- `kalkulator-hydrauliczny.html` (dobór średnic, Darcy–Weisbach, wężownice CWU, Kv,
  PN-EN 1264, VDI 2089) — **nie ma go w tym repo**; zapytaj właściciela, zanim go dodasz

## System wizualny (nie zmieniaj bez zgody)
- Kolory:
  - tło / ciemny granat `#0b0f1e` (też `theme-color`)
  - akcent niebieski `#4e8ecb`
  - akcent złoty `#c8a96e` (logo „złoty obwód”, wyróżnienia kursywą w nagłówkach)
- Fonty: **Rajdhani** (nagłówki, techniczny charakter) + **Nunito Sans** (tekst)
- Motyw przewodni: obwód / schemat techniczny, słoń w złotym obwodzie (logo)
- Nagłówki sekcji: mała etykieta nad nagłówkiem + nagłówek z wyróżnionym fragmentem *kursywą w złocie*
- Ilustracje: własne SVG w stylu schematów technicznych — nowe grafiki rób w tej samej konwencji
- Kolory i odstępy trzymaj w zmiennych CSS (`:root`); nowe komponenty muszą z nich korzystać

## Standardy jakości (cel: nowoczesna, szybka, dostępna strona)
- **Wydajność (Core Web Vitals):** LCP < 2,5 s, INP < 200 ms, CLS < 0,1 na mobile.
  Obrazy w WebP/AVIF z `srcset`/`sizes`, jawne `width`/`height`, `loading="lazy"` poniżej
  pierwszego ekranu, `fetchpriority="high"` dla obrazu LCP. Fonty z `font-display: swap`
  i preload. Minimum JS, bez ciężkich bibliotek.
- **Dostępność: WCAG 2.2 AA.** Kontrast ≥ 4.5:1 (sprawdzaj szczególnie złoto i niebieski na granacie),
  widoczny focus, obsługa klawiaturą (modale, lightbox, akordeony „Czytaj więcej”), `aria-*` tam,
  gdzie trzeba, link „Przejdź do treści”, `prefers-reduced-motion` dla każdej animacji.
- **Responsywność:** mobile-first; testuj 360 px, 768 px, 1280 px, 1920 px. Zachowanie modali
  kart usług na desktopie i mobile jest celowo różne — nie ujednolicaj bez zgody.
- **SEO / AEO:**
  - Unikalne `<title>` i `meta description` na każdej podstronie, `canonical`, OG/Twitter
  - Schema.org JSON-LD (LocalBusiness/ProfessionalService, Service na podstronach, FAQPage tam,
    gdzie są pytania), zgodne z treścią widoczną na stronie
  - Spójność NAP (nazwa, adres, telefon) z Google Business Profile, Facebookiem i LinkedIn
  - Przy dodawaniu podstron: nowy plik w `_strony/`, `python _build.py` (sitemap), aktualizacja `llms.txt`
- **Animacje:** subtelne, celowe (wejście sekcji, hover, mikrointerakcje); tylko `transform`/`opacity`.

## Znane braki / zadania do zrobienia
- [ ] Dokumenty prawne (polityka prywatności, cookies, RODO) są oknami modalnymi
      (`LEGAL_DOCS` w `assets/ekospec.js`, data w `LEGAL_UPDATED`). Treść uzupełniona 2026-10
      (art. 13 RODO, transfer do USA, okresy przechowywania, PKE art. 398/399) — czeka na akceptację
      właściciela. Do decyzji: osobne podstrony z własnym adresem URL. Przy każdej zmianie usług
      zewnętrznych (hosting, formularz, analityka) zaktualizuj te teksty.
- [ ] Sekcja „Zaufali mi” ma jedno logo klienta — przygotuj układ skalujący się na więcej logotypów.
- [ ] Liczby w sekcji „O mnie” (audyty, % oszczędności, lata, klienci) zmienia tylko właściciel.

## Zasady pracy
- Przed większą zmianą wizualną opisz plan i poczekaj na akceptację.
- Pracuj na osobnej gałęzi; małe, logiczne commity z opisem po polsku
  (np. „Poprawa kontrastu przycisków w sekcji Oferta”).
- **Nie publikuj (push / merge do `main`) bez potwierdzenia** — strona jest produkcyjna od razu po pushu.
- Git na tym komputerze: `C:\Git\Git\cmd\git.exe` (może nie być w PATH).
- Podgląd lokalny (Windows): `python -m http.server 8000` w katalogu repo → http://localhost:8000
- Po zmianach sprawdź: konsolę przeglądarki (zero błędów), widok mobilny, działanie formularza,
  kalkulatora oszczędności, lightboxa i modali.
- Nie zmieniaj danych kontaktowych, cen, wyników realizacji ani liczb bez polecenia.
- Nie wymyślaj realizacji, opinii klientów ani certyfikatów — tylko treści od właściciela.
- Nie dodawaj zewnętrznych trackerów/analityki bez zgody (RODO, baner cookies).
- Obliczenia inżynierskie (kalkulatory): wzory zgodne z normami (PN-EN 1264, VDI 2089);
  przy zmianach obliczeń pokaż przykład z wynikiem do weryfikacji.

## Skille do używania w tym projekcie
- `frontend-design` — kierunek wizualny i nowe sekcje
- `impeccable` (critique, polish, audit, animate, typeset, adapt…) — przeglądy i dopracowanie UI
- `web-design-guidelines` — zgodność z wytycznymi interfejsu
- `accessibility`, `performance`, `core-web-vitals`, `seo`, `best-practices`, `web-quality-audit`
  — audyt jakości przed publikacją
- Kolejność przy nowej funkcji: projekt (frontend-design) → wdrożenie → critique/polish → web-quality-audit
