// === NAVBAR ===
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>40);
});
function toggleMenu(){
  const h=document.getElementById('hamburger');
  const open=document.getElementById('mobileMenu').classList.toggle('open');
  h.classList.toggle('open',open);
  h.setAttribute('aria-expanded',open);
}
function closeMenu(){
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('hamburger').setAttribute('aria-expanded','false');
  document.getElementById('mobileMenu').classList.remove('open');
}

// === SCROLL ANIMATIONS ===
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
// Przejście z menu / linku #sekcja: pokaż sekcję od razu, bez czekania na animację
function revealNow(id){
  const sec=id&&document.getElementById(id);
  if(!sec) return;
  sec.querySelectorAll('.fade-up:not(.visible)').forEach(el=>{
    el.classList.add('instant','visible');
    requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.remove('instant')));
  });
}
document.addEventListener('click',e=>{
  const a=e.target.closest&&e.target.closest('a[href*="#"]');
  if(!a||a.pathname!==location.pathname) return;
  revealNow(decodeURIComponent(a.hash.slice(1)));
});
if(location.hash) revealNow(decodeURIComponent(location.hash.slice(1)).replace(/^kontakt-.*/,'kontakt'));


// === SHARE ===
function shareP(btn){
  const shareUrl = window.location.origin + window.location.pathname + '?z=polecenie';
  const text = 'Polecam Ekospec – inżynier z Nowego Targu, który obniża koszty energii i rozwiązuje problemy z instalacjami.';
  if(navigator.share){navigator.share({title:'Ekospec',text,url:shareUrl}).catch(()=>{});}
  else{navigator.clipboard.writeText(shareUrl).then(()=>{
    const b=btn||document.getElementById('shareBtn');
    const o=b.innerHTML;
    b.innerHTML='<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span>Skopiowano link!</span>';
    setTimeout(()=>b.innerHTML=o,2000);
  });}
}

// === FORM ===
let lbItems=[],lbIndex=0;
function openLightbox(el){
  lbItems=Array.from(document.querySelectorAll('[data-lb]'));
  lbIndex=lbItems.indexOf(el);
  lbShow();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
  dlgOpen('lightbox','.lb-close');
}
function lbShow(){
  const el=lbItems[lbIndex];
  const img=el.querySelector('img');
  document.getElementById('lb-img').src=img ? (img.dataset.full||img.currentSrc||img.src) : '';
  document.getElementById('lb-img').alt=(img&&img.alt)||'Zdjęcie realizacji Ekospec';
  document.getElementById('lb-title').textContent=el.dataset.title||'';
  document.getElementById('lb-desc').textContent=el.dataset.desc||'';
}
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
  dlgClose();
}
function closeLightboxBg(e){if(e.target===document.getElementById('lightbox'))closeLightbox();}
function lbNav(dir){
  lbIndex=(lbIndex+dir+lbItems.length)%lbItems.length;
  lbShow();
}
document.addEventListener('keydown',e=>{
  const lb=document.getElementById('lightbox');
  if(!lb.classList.contains('open'))return;
  if(e.key==='Escape')closeLightbox();
  if(e.key==='ArrowRight')lbNav(1);
  if(e.key==='ArrowLeft')lbNav(-1);
});  
// Dokumenty prawne. Treść przygotowana 2026-10 do akceptacji właściciela (nie jest poradą prawną).
const LEGAL_UPDATED='29 października 2026 r.';
const LEGAL_DOCS={
  privacy:{
    title:'Polityka prywatności',
    html:`
      <p>Ta polityka wyjaśnia, jakie dane osobowe przetwarzam w związku z działaniem strony ekospec.pro i kontaktem ze mną, w jakim celu, jak długo i jakie masz prawa. Spełnia obowiązek informacyjny z art. 13 RODO (Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679).</p>
      <h4>1. Administrator danych</h4>
      <p>Administratorem Twoich danych osobowych jest <strong>Bartłomiej Głąbiński</strong>, prowadzący działalność gospodarczą pod firmą <strong>Przedsiębiorstwo Techniczne Usługowo Handlowe JANTAR Bartłomiej Głąbiński</strong>, ul. Szaflarska 100/1, 34-400 Nowy Targ, NIP 7352516870 (marka Ekospec).</p>
      <p>Kontakt w sprawach danych osobowych: <strong>biuro@ekospec.pro</strong>, tel. +48 573 018 657 lub listownie na adres powyżej. Nie wyznaczyłem inspektora ochrony danych — nie jest to wymagane przy tej skali działalności.</p>
      <h4>2. Jakie dane przetwarzam i skąd je mam</h4>
      <p>Przetwarzam wyłącznie dane, które sam mi przekazujesz:</p>
      <ul>
        <li><strong>formularz kontaktowy</strong> — imię i nazwisko, adres e-mail, numer telefonu (opcjonalnie), temat, treść wiadomości oraz informacje o obiekcie, które zaznaczysz (rodzaj obiektu, powierzchnia, przybliżone koszty energii);</li>
        <li><strong>kontakt telefoniczny, e-mailowy lub przez WhatsApp</strong> — dane, które podasz w rozmowie lub wiadomości (zwykle imię, numer telefonu lub adres e-mail i opis sprawy);</li>
        <li><strong>współpraca</strong> — jeśli zawrzemy umowę: dane potrzebne do jej wykonania i wystawienia faktury (np. adres obiektu, dane firmy, NIP).</li>
      </ul>
      <p>Razem z formularzem przesyłana jest też informacja techniczna: skąd trafiłeś na stronę (np. wyszukiwarka Google, LinkedIn, wejście bezpośrednie) i z której podstrony wysłano wiadomość. Nie jest ona zapisywana na Twoim urządzeniu i nie zawiera adresu IP ani identyfikatorów.</p>
      <h4>3. Cele i podstawy prawne</h4>
      <ul>
        <li><strong>Odpowiedź na zapytanie i przygotowanie oferty</strong> — art. 6 ust. 1 lit. b RODO (działania na Twoje żądanie przed zawarciem umowy), a gdy zapytanie nie dotyczy umowy — art. 6 ust. 1 lit. f RODO (mój prawnie uzasadniony interes: prowadzenie korespondencji i odpowiadanie na pytania).</li>
        <li><strong>Wykonanie umowy</strong> (audyt, doradztwo, projekt, wykonawstwo) — art. 6 ust. 1 lit. b RODO.</li>
        <li><strong>Obowiązki podatkowe i księgowe</strong> (faktury, ewidencja) — art. 6 ust. 1 lit. c RODO w związku z przepisami podatkowymi.</li>
        <li><strong>Ustalenie, dochodzenie lub obrona roszczeń</strong> — art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes: ochrona moich praw).</li>
        <li><strong>Informacje marketingowe</strong> — tylko jeśli zaznaczysz osobną zgodę w formularzu: art. 6 ust. 1 lit. a RODO oraz art. 398 ustawy z dnia 12 lipca 2024 r. — Prawo komunikacji elektronicznej (zgoda na marketing bezpośredni e-mailem lub telefonicznie). Zgodę możesz wycofać w każdej chwili, np. pisząc na biuro@ekospec.pro.</li>
        <li><strong>Bezpieczeństwo strony i ochrona formularza przed spamem</strong> oraz <strong>statystyki odwiedzin</strong> — art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes: zapewnienie działania, bezpieczeństwa i rozwoju strony).</li>
      </ul>
      <h4>4. Jak długo przechowuję dane</h4>
      <ul>
        <li>zapytania, po których nie doszło do współpracy — do 12 miesięcy od ostatniego kontaktu (na wypadek pytań uzupełniających), a potem je usuwam;</li>
        <li>dane związane z umową — przez czas jej wykonywania, a następnie do upływu terminu przedawnienia roszczeń (co do zasady 6 lat, a dla roszczeń związanych z działalnością gospodarczą 3 lata — art. 118 Kodeksu cywilnego);</li>
        <li>faktury i dokumenty księgowe — 5 lat, licząc od końca roku kalendarzowego, w którym upłynął termin płatności podatku (art. 86 w zw. z art. 70 Ordynacji podatkowej);</li>
        <li>dane do marketingu — do wycofania zgody lub wniesienia sprzeciwu;</li>
        <li>dane techniczne u dostawców (logi serwera, zabezpieczenia) — przez okresy określone w ich politykach, zwykle krótkie.</li>
      </ul>
      <h4>5. Komu przekazuję dane</h4>
      <p>Nie sprzedaję danych i nie udostępniam ich w celach marketingowych innym firmom. Dane mogą trafić wyłącznie do dostawców usług, z których korzystam przy prowadzeniu strony i firmy, i tylko w zakresie potrzebnym do ich usługi:</p>
      <ul>
        <li><strong>GitHub, Inc.</strong> (GitHub Pages) — hosting strony; serwer zapisuje w logach m.in. adres IP odwiedzającego w celach bezpieczeństwa;</li>
        <li><strong>Formspree, Inc.</strong> — przekazanie wiadomości z formularza na adres biuro@ekospec.pro;</li>
        <li><strong>Cloudflare, Inc.</strong> — ochrona formularza przed spamem (Turnstile, przetwarza m.in. adres IP i dane techniczne przeglądarki) oraz statystyki odwiedzin (Web Analytics);</li>
        <li>dostawca poczty elektronicznej obsługujący adres biuro@ekospec.pro;</li>
        <li>przy współpracy: biuro rachunkowe lub doradca podatkowy, a w razie sporu — kancelaria prawna;</li>
        <li>organy publiczne — tylko gdy wymaga tego prawo.</li>
      </ul>
      <p>Jeśli piszesz do mnie przez <strong>WhatsApp</strong>, operatorem komunikatora jest Meta (WhatsApp Ireland Ltd.), który przetwarza dane na własnych zasadach opisanych w polityce prywatności WhatsApp.</p>
      <h4>6. Przekazywanie danych poza Europejski Obszar Gospodarczy</h4>
      <p>GitHub, Formspree i Cloudflare to firmy z siedzibą w Stanach Zjednoczonych, więc dane mogą być przetwarzane w USA. Przekazanie odbywa się na podstawie decyzji Komisji Europejskiej z 10 lipca 2023 r. stwierdzającej odpowiedni stopień ochrony (EU-US Data Privacy Framework, art. 45 RODO) — w odniesieniu do firm w nim certyfikowanych — lub standardowych klauzul umownych zatwierdzonych przez Komisję Europejską (art. 46 ust. 2 lit. c RODO). Kopię zabezpieczeń możesz uzyskać, pisząc na biuro@ekospec.pro.</p>
      <h4>7. Statystyki odwiedzin</h4>
      <p>Korzystam z Cloudflare Web Analytics, która nie używa plików cookies, nie śledzi odwiedzających między stronami i nie tworzy profili. Widzę wyłącznie dane zbiorcze: liczbę odwiedzin, odwiedzane podstrony, źródło wejścia, rodzaj urządzenia i przeglądarki oraz kraj. Na ich podstawie nie da się zidentyfikować konkretnej osoby.</p>
      <h4>8. Twoje prawa</h4>
      <p>Masz prawo do:</p>
      <ul>
        <li>dostępu do swoich danych i otrzymania ich kopii (art. 15 RODO),</li>
        <li>sprostowania danych (art. 16 RODO),</li>
        <li>usunięcia danych (art. 17 RODO),</li>
        <li>ograniczenia przetwarzania (art. 18 RODO),</li>
        <li>przeniesienia danych przetwarzanych na podstawie zgody lub umowy (art. 20 RODO),</li>
        <li>wycofania zgody w dowolnym momencie — bez wpływu na zgodność z prawem przetwarzania przed jej wycofaniem,</li>
        <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa (uodo.gov.pl), jeśli uznasz, że przetwarzam dane niezgodnie z prawem.</li>
      </ul>
      <p><strong>Prawo sprzeciwu (art. 21 RODO).</strong> W każdej chwili możesz wnieść sprzeciw wobec przetwarzania danych na podstawie mojego prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO) z przyczyn związanych z Twoją szczególną sytuacją. Sprzeciw wobec marketingu bezpośredniego uwzględnię zawsze, bez podawania przyczyny.</p>
      <p>Aby skorzystać z praw, napisz na <strong>biuro@ekospec.pro</strong>. Odpowiem bez zbędnej zwłoki, najpóźniej w ciągu miesiąca.</p>
      <h4>9. Czy musisz podać dane</h4>
      <p>Podanie danych jest dobrowolne, ale bez danych kontaktowych nie odpowiem na zapytanie, a bez danych wymaganych przepisami nie zawrę umowy i nie wystawię faktury. Zgoda na marketing nie jest warunkiem odpowiedzi ani współpracy.</p>
      <h4>10. Profilowanie</h4>
      <p>Nie podejmuję decyzji w sposób zautomatyzowany i nie profiluję odwiedzających w rozumieniu art. 22 RODO. Kalkulator oszczędności na stronie działa wyłącznie w Twojej przeglądarce — wpisane w nim liczby nie są nigdzie wysyłane, chyba że sam przeniesiesz je do formularza.</p>
      <h4>11. Linki do innych serwisów</h4>
      <p>Strona zawiera linki do LinkedIn, Facebooka, Google i WhatsApp. Po przejściu do tych serwisów obowiązują ich własne zasady prywatności.</p>
      <h4>12. Zmiany polityki</h4>
      <p>Politykę aktualizuję, gdy zmienia się sposób działania strony lub przepisy. Ostatnia aktualizacja: <strong>${LEGAL_UPDATED}</strong></p>
    `
  },
  cookies:{
    title:'Polityka cookies',
    html:`
      <h4>Czym są pliki cookies</h4>
      <p>Pliki cookies (ciasteczka) i podobne technologie (np. pamięć lokalna przeglądarki) to małe porcje danych zapisywane na Twoim urządzeniu lub z niego odczytywane podczas odwiedzania strony. Zasady ich stosowania określa art. 399 ustawy z dnia 12 lipca 2024 r. — Prawo komunikacji elektronicznej: na zapisywanie informacji nieniezbędnych potrzebna jest Twoja zgoda.</p>
      <h4>Czego używa ta strona</h4>
      <p><strong>Strona ekospec.pro sama nie zapisuje plików cookies ani niczego w pamięci Twojej przeglądarki</strong>, dlatego nie wyświetla baneru z prośbą o zgodę.</p>
      <ul>
        <li><strong>Ochrona formularza (Cloudflare Turnstile)</strong> — działa w osobnej ramce dostawcy Cloudflare dopiero wtedy, gdy przewiniesz stronę do formularza. Do sprawdzenia, że wiadomość wysyła człowiek, może odczytywać z przeglądarki informacje techniczne. Jest to niezbędne do wykonania usługi, której żądasz (wysłania wiadomości), więc nie wymaga zgody.</li>
        <li><strong>Statystyki odwiedzin (Cloudflare Web Analytics)</strong> — działają <strong>bez plików cookies</strong>, bez zapisywania czegokolwiek na urządzeniu i bez identyfikowania odwiedzających.</li>
      </ul>
      <p>Nie używam cookies reklamowych, pikseli śledzących (np. Meta Pixel) ani Google Analytics.</p>
      <h4>Serwisy zewnętrzne</h4>
      <p>Po kliknięciu linku do LinkedIn, Facebooka, Google lub WhatsApp przechodzisz do serwisów, które mogą stosować własne cookies na zasadach opisanych w swoich politykach.</p>
      <h4>Jak zarządzać cookies</h4>
      <p>Ustawienia cookies zmienisz w swojej przeglądarce:</p>
      <ul>
        <li>Google Chrome — Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie innych firm</li>
        <li>Mozilla Firefox — Ustawienia → Prywatność i bezpieczeństwo</li>
        <li>Safari — Ustawienia → Prywatność</li>
        <li>Microsoft Edge — Ustawienia → Pliki cookie i uprawnienia witryny</li>
      </ul>
      <p>Zablokowanie zabezpieczenia Cloudflare Turnstile może uniemożliwić wysłanie formularza — wtedy zadzwoń lub napisz na biuro@ekospec.pro.</p>
      <h4>Podstawa prawna</h4>
      <p>Ochronę formularza i statystyki stosuję na podstawie prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO): zapewnienia działania, bezpieczeństwa i rozwoju strony. Więcej o danych osobowych w Polityce prywatności.</p>
      <p>Ostatnia aktualizacja: <strong>${LEGAL_UPDATED}</strong></p>
    `
  },
  rodo:{
    title:'Informacja RODO',
    html:`
      <h4>Klauzula informacyjna — art. 13 RODO</h4>
      <p>Skrót najważniejszych informacji. Pełna treść jest w Polityce prywatności.</p>
      <h4>1. Administrator danych</h4>
      <p><strong>Bartłomiej Głąbiński</strong><br/>
      Przedsiębiorstwo Techniczne Usługowo Handlowe JANTAR Bartłomiej Głąbiński<br/>
      ul. Szaflarska 100/1, 34-400 Nowy Targ<br/>
      NIP: 7352516870<br/>
      E-mail: biuro@ekospec.pro, tel. +48 573 018 657</p>
      <h4>2. Cele i podstawy prawne</h4>
      <ul>
        <li>odpowiedź na zapytanie i przygotowanie oferty — art. 6 ust. 1 lit. b RODO, a gdy zapytanie nie dotyczy umowy — art. 6 ust. 1 lit. f RODO,</li>
        <li>wykonanie umowy — art. 6 ust. 1 lit. b RODO,</li>
        <li>obowiązki podatkowe i księgowe — art. 6 ust. 1 lit. c RODO,</li>
        <li>dochodzenie i obrona roszczeń, bezpieczeństwo strony, statystyki — art. 6 ust. 1 lit. f RODO,</li>
        <li>marketing — wyłącznie za zgodą: art. 6 ust. 1 lit. a RODO i art. 398 Prawa komunikacji elektronicznej.</li>
      </ul>
      <h4>3. Odbiorcy</h4>
      <p>Dostawcy usług technicznych (GitHub — hosting, Formspree — formularz, Cloudflare — ochrona formularza i statystyki, dostawca poczty e-mail), przy współpracy biuro rachunkowe i kancelaria prawna, a także organy publiczne, gdy wymaga tego prawo.</p>
      <h4>4. Przekazanie poza EOG</h4>
      <p>GitHub, Formspree i Cloudflare mają siedzibę w USA. Przekazanie odbywa się na podstawie EU-US Data Privacy Framework (art. 45 RODO) lub standardowych klauzul umownych (art. 46 ust. 2 lit. c RODO).</p>
      <h4>5. Okres przechowywania</h4>
      <p>Zapytania bez współpracy — do 12 miesięcy od ostatniego kontaktu. Dane z umowy — do przedawnienia roszczeń (art. 118 Kodeksu cywilnego). Dokumenty księgowe — 5 lat od końca roku, w którym upłynął termin płatności podatku. Marketing — do wycofania zgody.</p>
      <h4>6. Twoje prawa</h4>
      <p>Dostęp do danych, sprostowanie, usunięcie, ograniczenie przetwarzania, przeniesienie danych, sprzeciw (art. 21 RODO — w tym zawsze wobec marketingu) oraz wycofanie zgody w dowolnym momencie bez wpływu na zgodność z prawem wcześniejszego przetwarzania.</p>
      <h4>7. Skarga</h4>
      <p>Możesz złożyć skargę do <strong>Prezesa Urzędu Ochrony Danych Osobowych</strong>, ul. Stawki 2, 00-193 Warszawa.</p>
      <h4>8. Dobrowolność</h4>
      <p>Podanie danych jest dobrowolne, ale niezbędne do odpowiedzi na zapytanie lub zawarcia umowy. Zgoda na marketing nie jest warunkiem współpracy.</p>
      <h4>9. Profilowanie</h4>
      <p>Dane nie służą do zautomatyzowanego podejmowania decyzji ani profilowania.</p>
      <p>Ostatnia aktualizacja: <strong>${LEGAL_UPDATED}</strong></p>
    `
  }
};

function openLegal(type){
  const doc=LEGAL_DOCS[type];
  document.getElementById('lm-title').textContent=doc.title;
  document.getElementById('lm-body').innerHTML=doc.html;
  document.getElementById('lm-body').scrollTop=0;
  document.getElementById('legal-modal').classList.add('open');
  document.body.style.overflow='hidden';
  dlgOpen('legal-modal','.lm-close');
}
function closeLegal(){
  document.getElementById('legal-modal').classList.remove('open');
  document.body.style.overflow='';
  dlgClose();
}
function closeLegalBg(e){
  if(e.target===document.getElementById('legal-modal'))closeLegal();
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&document.getElementById('legal-modal').classList.contains('open'))closeLegal();
});

  
// Wyrównanie wysokości kafelków oferty (zwiniętych)
function equalizeServiceCards(){
  const cards=document.querySelectorAll('.service-card');
  if(!cards.length) return;

  cards.forEach(c=>c.style.minHeight='');

  if(window.innerWidth<600) return;

  let max=0;
  cards.forEach(c=>{
    if(c.classList.contains('open')) return;
    const h=c.offsetHeight;
    if(h>max) max=h;
  });

  if(max>0){
    cards.forEach(c=>{
      if(!c.classList.contains('open')) c.style.minHeight=max+'px';
    });
  }
}

window.addEventListener('load',()=>{
  if(document.fonts && document.fonts.ready){
    document.fonts.ready.then(equalizeServiceCards);
  } else {
    equalizeServiceCards();
  }
});

let _eqTimer;
window.addEventListener('resize',()=>{
  clearTimeout(_eqTimer);
  _eqTimer=setTimeout(equalizeServiceCards,150);
});

// Modal oferty — otwieranie / zamykanie (używane tylko na PC)
function openServiceModal(card){
  const title  = card.querySelector('.service-title')?.textContent || '';
  const number = card.querySelector('.service-number')?.textContent || '';
  const expand = card.querySelector('.service-expand .expand-inner');
  if(!expand) return;

  document.getElementById('sm-number').textContent = number;
  document.getElementById('sm-title').textContent  = title;

  // Skopiuj paragrafy z karty do modala
  const contentEl = document.getElementById('sm-content');
  contentEl.innerHTML = '';
  expand.querySelectorAll('p').forEach(p=>{
    const newP = document.createElement('p');
    newP.innerHTML = p.innerHTML;
    contentEl.appendChild(newP);
  });

  // Obrazek — opcjonalny
  const img       = expand.querySelector('img');
  const smImg     = document.getElementById('sm-img');
  const smImgWrap = document.querySelector('.sm-img-wrap');
  if(img && img.src){
    smImg.src = img.dataset.full || img.currentSrc || img.src;
    smImg.alt = img.alt || title;
    smImgWrap.style.display = 'flex';
  } else {
    smImgWrap.style.display = 'none';
  }

  const more = card.querySelector('.service-link');
  if(more){
    const l = more.cloneNode(true);
    const wrap = document.createElement('p'); wrap.appendChild(l);
    contentEl.appendChild(wrap);
  }
  document.querySelector('.sm-text').scrollTop = 0;
  document.getElementById('service-modal').classList.add('open');
  dlgOpen('service-modal','.sm-close');
  document.body.style.overflow = 'hidden';
}
function closeServiceModal(){
  document.getElementById('service-modal').classList.remove('open');
  document.body.style.overflow = '';
  dlgClose();
}
function closeServiceModalBg(e){
  if(e.target===document.getElementById('service-modal')) closeServiceModal();
}
document.addEventListener('keydown', e=>{
  if(e.key==='Escape' && document.getElementById('service-modal').classList.contains('open')){
    closeServiceModal();
  }
});

// „Czytaj więcej”: na PC otwiera okno (aria-haspopup), niżej rozwija kartę (aria-expanded)
function syncReadMoreAria(){
  const pc=window.innerWidth>1024;
  document.querySelectorAll('.read-more-btn').forEach(b=>{
    const card=b.closest('.service-card');
    if(pc){b.removeAttribute('aria-expanded');b.setAttribute('aria-haspopup','dialog');}
    else{b.removeAttribute('aria-haspopup');b.setAttribute('aria-expanded',card&&card.classList.contains('open')?'true':'false');}
  });
}
syncReadMoreAria();
window.addEventListener('resize',syncReadMoreAria);

// Klik w „Czytaj więcej" — na PC modal, niżej zachowanie dotychczasowe
function toggleService(btn){
  const card = btn.closest('.service-card');

  // PC (powyżej 1024 px) — otwórz modal zamiast rozwijać kartę w siatce
  if(window.innerWidth > 1024){
    openServiceModal(card);
    return;
  }

  // Tablet / telefon — dotychczasowe rozwijanie kart w miejscu
  const isOpen = card.classList.contains('open');
  const topBefore = card.getBoundingClientRect().top;

  document.querySelectorAll('.service-card.open').forEach(c=>{
    if(c!==card) c.classList.remove('open');
  });
  card.classList.toggle('open', !isOpen);
  syncReadMoreAria();

  const start = performance.now();
  const duration = 600;
  function lockPosition(now){
    const diff = card.getBoundingClientRect().top - topBefore;
    if(Math.abs(diff)>0.5) window.scrollBy(0,diff);
    if(now-start<duration) requestAnimationFrame(lockPosition);
  }
  requestAnimationFrame(lockPosition);
}

async function submitForm(e){
  e.preventDefault();
  const btn=e.target.querySelector('button[type=submit]');
  if(btn.disabled) return;          // <-- guard przed double-click
  const turnstileToken = e.target.querySelector('[name="cf-turnstile-response"]')?.value;
  if(!turnstileToken){
  alert('Proszę poczekać chwilę na zakończenie weryfikacji bezpieczeństwa.');
  return;
  }
  const originalText=btn.textContent;
  btn.textContent='Wysyłanie...';
  btn.disabled=true;
  
  fillTrasa(e.target);
  const data=new FormData(e.target);
  
  try{
    const res=await fetch('https://formspree.io/f/xqeworaz',{
      method:'POST',
      body:data,
      headers:{'Accept':'application/json'}
    });
    
    if(res.ok){
      btn.textContent='✓ Wysłano – odpiszemy wkrótce';
      formSay('Wiadomość wysłana. Odpiszemy wkrótce.');
      btn.style.background='#2a6b3a';
      e.target.reset();
    } else {
      btn.textContent='Błąd wysyłania — spróbuj ponownie';
      btn.style.background='#8b2020';
      btn.disabled=false;
      formSay('Nie udało się wysłać wiadomości. Spróbuj ponownie.');
    }
  } catch(err){
    btn.textContent='Błąd wysyłania — spróbuj ponownie';
    btn.style.background='#8b2020';
    btn.disabled=false;
  }
}

// =====================================================
// PRZEBUDOWA 2026-09
// =====================================================
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- SKĄD PRZYSZŁO ZAPYTANIE ---
// Nic nie jest zapisywane w przeglądarce. Źródło odczytujemy z adresu strony
// (oznaczone linki ?z=...) albo z adresu poprzedniej strony, a dołączamy je
// do wiadomości tylko wtedy, gdy ktoś sam wyśle formularz.
const SRC_NAMES={linkedin:'LinkedIn',facebook:'Facebook / Instagram',fb:'Facebook / Instagram',qr:'Kod QR',gmb:'Profil firmy w Google',google:'Google (wyszukiwarka lub Mapy)',mail:'E-mail',email:'E-mail',sms:'SMS',polecenie:'Polecenie znajomego (przycisk „Poleć znajomemu”)',wizytowka:'Wizytówka w telefonie',szukaj:'Inna wyszukiwarka'};
function detectSource(){
  const q=new URLSearchParams(location.search);
  const tag=(q.get('z')||q.get('utm_source')||'').toLowerCase();
  if(tag) return {tag,label:SRC_NAMES[tag]||tag};
  let h='';try{h=document.referrer?new URL(document.referrer).hostname.replace(/^www\./,''):'';}catch(e){}
  const own=location.hostname.replace(/^www\./,'');
  if(!h) return {tag:'',label:'Wejście bezpośrednie (wpisany adres, zakładka lub link z aplikacji)'};
  if(h===own) return {tag:'',label:'',internal:true};
  if(/(^|\.)google\./.test(h)) return {tag:'google',label:SRC_NAMES.google};
  if(/bing\.|duckduckgo\.|yahoo\.|ecosia\./.test(h)) return {tag:'szukaj',label:SRC_NAMES.szukaj};
  if(/linkedin\.|lnkd\.in/.test(h)) return {tag:'linkedin',label:'LinkedIn'};
  if(/facebook\.|fb\.|instagram\./.test(h)) return {tag:'facebook',label:SRC_NAMES.facebook};
  return {tag:h,label:'Link na stronie: '+h};
}
const SOURCE=detectSource();
// na podstronie: przekaż źródło dalej w linkach do strony głównej (w adresie, bez zapisywania)
window.addEventListener('DOMContentLoaded',()=>{
  if(!document.body.classList.contains('subpage')||!SOURCE.tag) return;
  document.querySelectorAll('a[href^="../"]').forEach(a=>{
    const href=a.getAttribute('href'), i=href.indexOf('#');
    const base=i<0?href:href.slice(0,i), hash=i<0?'':href.slice(i);
    a.setAttribute('href',base+(base.includes('?')?'&':'?')+'z='+encodeURIComponent(SOURCE.tag)+hash);
  });
});
function fillTrasa(form){
  const set=(id,v)=>{const el=form.querySelector('#'+id); if(el) el.value=v;};
  let label=SOURCE.label;
  if(SOURCE.internal){let p='';try{p=new URL(document.referrer).pathname;}catch(e){} label='Przejście z innej strony serwisu ('+p+'), źródło nieznane';}
  set('fZrodlo',label);
  set('fZeStrony',location.pathname);
}
// temat z podstrony: ../#kontakt-slug (fragment adresu – wyszukiwarki go pomijają, więc nie ma duplikatów stron)
// obsługa także starych linków ../?temat=slug#kontakt
window.addEventListener('DOMContentLoaded',()=>{
  const sel=document.getElementById('fTemat'); if(!sel) return;
  const q=new URLSearchParams(location.search);
  let slug=q.get('temat'), fromHash=false;
  const m=location.hash.match(/^#kontakt-([a-z0-9-]+)$/);
  if(m){slug=m[1];fromHash=true;}
  if(!slug) return;
  const o=sel.querySelector(`option[data-slug="${CSS.escape(slug)}"]`);
  if(o) sel.value=o.value||o.textContent;
  q.delete('temat');
  const rest=q.toString();
  try{history.replaceState(null,'',location.pathname+(rest?'?'+rest:'')+'#kontakt');}catch(e){}
  if(fromHash){const k=document.getElementById('kontakt'); if(k) requestAnimationFrame(()=>k.scrollIntoView());}
});

// --- start strony (bez intro) ---
window.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('fabWrap').style.display='flex';
  document.getElementById('shareBtn').style.display='flex';
  initHeroLogo();
  initHeroLogoMobile();
});

// --- HERO: słoń i obwód rysują się ---
function initHeroLogo(){
  const slon=document.getElementById('hlSlon');
  const obw=document.getElementById('hlObwod');
  if(!slon||!obw) return;
  if(window.matchMedia('(max-width:900px)').matches) return; // na telefonie logo jest ukryte
  const setMask=(el,m)=>{el.style.webkitMaskImage=m;el.style.maskImage=m;};
  const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  let started=false;
  function run(){
    if(started) return; started=true;
    const D1=900, D2=1400, START=200, OFF2=950;
    let t0=null;
    function frame(ts){
      if(!t0) t0=ts;
      const t=ts-t0-START;
      const p1=ease(Math.min(Math.max(t/D1,0),1));
      const p2=ease(Math.min(Math.max((t-OFF2)/D2,0),1));
      const r=(p1*85).toFixed(1);
      setMask(slon,`radial-gradient(circle at 50% 55%, #000 ${r}%, transparent ${(+r+8).toFixed(1)}%)`);
      const a=(p2*120).toFixed(2);
      setMask(obw,`conic-gradient(from -90deg, #000 0deg ${a}deg, transparent ${a}deg 120deg, #000 120deg ${120+ +a}deg, transparent ${120+ +a}deg 240deg, #000 240deg ${240+ +a}deg, transparent ${240+ +a}deg 360deg)`);
      if(t<OFF2+D2) requestAnimationFrame(frame);
      else {setMask(slon,'none');setMask(obw,'none');}
    }
    requestAnimationFrame(frame);
  }
  // obwód w kolorze złotym — przekolorowanie SVG
  fetch('obwod.svg').then(r=>{if(!r.ok) throw 0; return r.text();}).then(txt=>{
    const svg=txt.replace(/fill="#000000"/g,'fill="#c8a96e"');
    obw.src=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
    obw.onload=run;
  }).catch(()=>{obw.classList.add('white');obw.src='obwod.svg';obw.onload=run;});
  setTimeout(run,1500); // zabezpieczenie, gdyby obraz obwodu nie zgłosił załadowania
}

// --- HERO: poświata za kursorem ---
(function(){
  const hero=document.getElementById('hero');
  if(!hero||!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  let raf=0,x=0,y=0;
  hero.addEventListener('pointermove',e=>{
    const r=hero.getBoundingClientRect(); x=e.clientX-r.left; y=e.clientY-r.top;
    if(!raf) raf=requestAnimationFrame(()=>{hero.style.setProperty('--mx',x+'px');hero.style.setProperty('--my',y+'px');raf=0;});
  });
})();

// --- KARTY USŁUG: poświata od kursora ---
document.querySelectorAll('.service-card').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--gx',(e.clientX-r.left)+'px');
    card.style.setProperty('--gy',(e.clientY-r.top)+'px');
  });
});

// --- PŁYNNE WJEŻDŻANIE: kaskada w siatkach ---
document.querySelectorAll('.services-grid, .cases-grid, .about-stats').forEach(g=>{
  [...g.children].forEach((c,i)=>{ if(c.classList.contains('fade-up')) c.style.transitionDelay=((i%3)*0.09+0.05).toFixed(2)+'s'; });
});

// --- LICZNIKI ---
(function(){
  const fmt=(v,dec)=>{const s=v.toFixed(dec).split('.');return s[0].replace(/\B(?=(\d{3})+(?!\d))/g,' ')+(dec?','+s[1]:'');};
  const els=document.querySelectorAll('.count-up');
  if(!('IntersectionObserver' in window)) return;
  els.forEach(el=>{
    const dec=+(el.dataset.decimals||0), pre=el.dataset.prefix||'', suf=el.dataset.suffix||'';
    el.textContent=pre+fmt(0,dec)+suf;
  });
  const io=new IntersectionObserver(ents=>{
    ents.forEach(en=>{
      if(!en.isIntersecting) return;
      io.unobserve(en.target);
      const el=en.target, target=+el.dataset.target, dec=+(el.dataset.decimals||0);
      const pre=el.dataset.prefix||'', suf=el.dataset.suffix||'', D=target<10?900:1800;
      let t0=null;
      function step(ts){
        if(!t0) t0=ts;
        const p=Math.min((ts-t0)/D,1), e=1-Math.pow(1-p,4);
        let v=target*e; v=dec?v:Math.round(v);
        if(target>=1000&&p<1) v=Math.round(v/100)*100;
        el.textContent=pre+fmt(v,dec)+suf;
        if(p<1) requestAnimationFrame(step);
      }
      setTimeout(()=>requestAnimationFrame(step),250);
    });
  },{threshold:.6});
  els.forEach(el=>io.observe(el));
})();

// --- JAK PRACUJĘ: aktywny krok + linia postępu ---
(function(){
  const wrap=document.getElementById('procesSteps');
  if(!wrap) return;
  const steps=[...wrap.querySelectorAll('.p-step')];
  const nav=[...document.querySelectorAll('#procesNav li')];
  const fill=document.getElementById('procesRailFill');
  let ticking=false;
  function update(){
    ticking=false;
    const vh=window.innerHeight, mark=vh*0.62;
    let active=0;
    steps.forEach((s,i)=>{
      const dot=s.querySelector('.p-dot').getBoundingClientRect();
      const lit=dot.top+dot.height/2<mark;
      s.classList.toggle('lit',lit);
      if(lit) active=i+1;
    });
    nav.forEach((li,i)=>{li.classList.toggle('active',i+1===active);li.classList.toggle('done',i+1<active);});
    const first=steps[0].querySelector('.p-dot').getBoundingClientRect();
    const last=steps[steps.length-1].querySelector('.p-dot').getBoundingClientRect();
    const wr=wrap.getBoundingClientRect();
    const start=first.top+first.height/2, end=last.top+last.height/2;
    const p=Math.min(Math.max((mark-start)/(end-start),0),1);
    fill.style.top=(start-wr.top)+'px';
    fill.style.height=(p*(end-start))+'px';
  }
  const req=()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}};
  window.addEventListener('scroll',req,{passive:true});
  window.addEventListener('resize',req);
  update();
})();

// --- KALKULATOR ---
(function(){
  const cost=document.getElementById('calcCost'); if(!cost) return;
  const range=document.getElementById('calcRange');
  const type=document.getElementById('calcType');
  const band=document.getElementById('gaugeBand');
  const needle=document.getElementById('gaugeNeedle');
  const pctEl=document.getElementById('calcPct');
  const moneyEl=document.getElementById('calcMoney');
  const cta=document.getElementById('calcCta');
  // Założenia: typowy przedział oszczędności [%] dla instalacji 5–15 letniej
  const BASE={dom:[8,20],wielo:[10,25],biuro:[12,28],hotel:[15,32],prod:[10,25],publ:[12,28]};
  const AGE={new:0.6,mid:1.0,old:1.25};
  const AGE_TXT={new:'do 5 lat',mid:'5–15 lat',old:'ponad 15 lat / nie wiem'};
  const MIN=5000, MAX=3000000, SCALE_MAX=50;
  const toVal=s=>Math.round(MIN*Math.pow(MAX/MIN,s/1000));
  const toPos=v=>Math.round(1000*Math.log(v/MIN)/Math.log(MAX/MIN));
  const fmt=v=>String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
  const round=v=>v>=100000?Math.round(v/1000)*1000:Math.round(v/100)*100;
  const parse=s=>+String(s).replace(/[^\d]/g,'');

  // podziałka wskaźnika
  const ticks=document.getElementById('gaugeTicks');
  for(let p=0;p<=SCALE_MAX;p+=10){
    const a=Math.PI*(1-p/SCALE_MAX), cx=170, cy=170;
    const x1=cx+Math.cos(a)*141, y1=cy-Math.sin(a)*141, x2=cx+Math.cos(a)*148, y2=cy-Math.sin(a)*148;
    const lx=cx+Math.cos(a)*161, ly=cy-Math.sin(a)*161+4;
    ticks.insertAdjacentHTML('beforeend',`<line class="g-tick" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/><text class="g-lbl" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle">${p}%</text>`);
  }
  let last={};
  function calc(){
    const v=Math.min(Math.max(parse(cost.value)||0,0),50000000);
    const age=(document.querySelector('input[name=calcAge]:checked')||{}).value||'mid';
    const b=BASE[type.value], m=AGE[age];
    const lo=Math.round(b[0]*m), hi=Math.min(Math.round(b[1]*m),40);
    const mLo=round(v*lo/100), mHi=round(v*hi/100);
    // wskaźnik: pasmo od lo do hi, wskazówka na środku
    const a=lo/SCALE_MAX*100, bb=hi/SCALE_MAX*100;
    band.setAttribute('stroke-dasharray',`${(bb-a).toFixed(2)} 100`);
    band.setAttribute('stroke-dashoffset',(-a).toFixed(2));
    const mid=(lo+hi)/2/SCALE_MAX;
    needle.style.transform=`rotate(${(mid*180-90).toFixed(1)}deg)`;
    pctEl.textContent=`${lo}–${hi}% kosztów`;
    moneyEl.textContent=v?`${fmt(mLo)} – ${fmt(mHi)} zł`:'—';
    last={v,lo,hi,mLo,mHi,type:type.options[type.selectedIndex].text,age:AGE_TXT[age]};
    range.style.setProperty('--fill',(range.value/10)+'%');
  }
  function fromRange(){cost.value=fmt(toVal(+range.value));calc();}
  function fromInput(){
    const v=parse(cost.value);
    if(v) range.value=Math.min(Math.max(toPos(Math.max(v,MIN)),0),1000);
    calc();
  }
  range.addEventListener('input',fromRange);
  cost.addEventListener('input',fromInput);
  cost.addEventListener('blur',()=>{const v=parse(cost.value); cost.value=v?fmt(v):'';});
  type.addEventListener('change',calc);
  document.querySelectorAll('input[name=calcAge]').forEach(r=>r.addEventListener('change',calc));
  cta.addEventListener('click',()=>{
    const ta=document.querySelector('#kontakt textarea[name=wiadomosc]');
    if(last.v){
      const OB={dom:'Dom jednorodzinny',wielo:'Budynek wielorodzinny / wspólnota',biuro:'Biuro, sklep, usługi',hotel:'Hotel, pensjonat',prod:'Zakład produkcyjny, warsztat',publ:'Szkoła, urząd, obiekt publiczny'};
      const r=document.querySelector(`#kontakt input[name=Obiekt][value="${OB[type.value]}"]`); if(r) r.checked=true;
      const k=document.getElementById('fKoszt');
      if(k&&!k.value) k.selectedIndex=last.v<=20000?1:last.v<=100000?2:last.v<=500000?3:4;
      const t=document.getElementById('fTemat');
      if(t&&!t.value) t.value='Obniżenie kosztów energii';
    }
    if(ta&&last.v&&!ta.value.trim()){
      ta.value=`Dzień dobry, skorzystałem z kalkulatora na stronie.\nObiekt: ${last.type}\nRoczny koszt energii: ok. ${fmt(last.v)} zł\nWiek instalacji: ${last.age}\nSzacowany potencjał: ${fmt(last.mLo)} – ${fmt(last.mHi)} zł rocznie (${last.lo}–${last.hi}%).\nProszę o kontakt w sprawie oceny obiektu.`;
    }
  });
  range.value=toPos(parse(cost.value));
  // start wskaźnika od zera, animacja po wjechaniu w widok
  band.setAttribute('stroke-dasharray','0 100');
  needle.style.transform='rotate(-90deg)';
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(e=>{if(e[0].isIntersecting){io.disconnect();setTimeout(calc,300);}},{threshold:.4});
    io.observe(document.querySelector('.calc-result'));
  } else calc();
  range.style.setProperty('--fill',(range.value/10)+'%');
})();

// --- PODSTRONA AUDYT: czy audyt jest obowiązkowy ---
(function(){
  const inp=document.getElementById('chkMwh'); if(!inp) return;
  const tjEl=document.getElementById('chkTj'), box=document.getElementById('chkVerdict');
  const title=document.getElementById('chkTitle'), text=document.getElementById('chkText');
  const parse=s=>+String(s).replace(/[^\d]/g,'');
  const fmt=v=>String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
  function upd(){
    const mwh=parse(inp.value), tj=mwh*0.0036;
    tjEl.textContent=tj.toFixed(1).replace('.',',');
    let lvl,t,x;
    if(!mwh){lvl='low';t='Wpisz zużycie';x='Podaj roczne zużycie energii w MWh.';}
    else if(tj<10){lvl='low';t='Poniżej 10 TJ';x='Według nowych zasad audyt nie jest obowiązkowy, chyba że firma jest dużym przedsiębiorstwem. Może się jednak opłacać.';}
    else if(tj<=85){lvl='mid';t='Powyżej 10 TJ';x='Według nowych zasad: audyt energetyczny co 4 lata.';}
    else {lvl='high';t='Powyżej 85 TJ';x='Według nowych zasad: system zarządzania energią (np. ISO 50001) zamiast samego audytu.';}
    box.dataset.level=lvl; title.textContent=t; text.textContent=x;
  }
  inp.addEventListener('input',upd);
  inp.addEventListener('blur',()=>{const v=parse(inp.value); inp.value=v?fmt(v):'';});
  upd();
})();

/* Cloudflare Turnstile (ochrona formularza) – skrypt doczytywany dopiero, gdy formularz zbliża się do ekranu,
   żeby nie spowalniać startu strony na telefonach. Działa tak samo jak wcześniej. */
(function(){
  const box=document.querySelector('.cf-turnstile');
  if(!box) return;
  let loaded=false;
  const load=()=>{
    if(loaded) return; loaded=true;
    const s=document.createElement('script');
    s.src='https://challenges.cloudflare.com/turnstile/v0/api.js';
    s.async=true; s.defer=true;
    document.head.appendChild(s);
  };
  const form=box.closest('form');
  if(form){form.addEventListener('focusin',load,{once:true});form.addEventListener('pointerdown',load,{once:true});}
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(e=>{if(e.some(x=>x.isIntersecting)){io.disconnect();load();}},{rootMargin:'800px 0px'});
    io.observe(form||box);
  } else load();
})();

// === Dostępność (audyt 2026-10) ===
let dlgReturn=null;
function dlgOpen(id,closeSel){
  if(!dlgReturn) dlgReturn=document.activeElement;
  const b=document.querySelector('#'+id+' '+closeSel);
  if(b) setTimeout(()=>b.focus(),30);
}
function dlgClose(){
  const el=dlgReturn; dlgReturn=null;
  if(el && document.contains(el) && el.focus) el.focus();
}
function formSay(t){const s=document.getElementById('formStatus'); if(s) s.textContent=t;}
document.addEventListener('keydown',e=>{
  const t=e.target;
  if(t && t.matches && t.matches('.case-img[data-lb]') && (e.key==='Enter'||e.key===' ')){
    e.preventDefault(); openLightbox(t);
  }
});

// --- LOGO NA TELEFON I TABLET ---
// Pliki (~6 KB) wczytywane dopiero po pełnym załadowaniu strony, więc nie spowalniają startu.
// Animacja w CSS rusza, gdy logo pojawi się na ekranie; poza ekranem obrót jest wstrzymany.
function initHeroLogoMobile(){
  const box=document.getElementById('heroLogoM');
  if(!box||!window.matchMedia('(max-width:900px)').matches) return;
  const imgs=[...box.querySelectorAll('img[data-src]')];
  let ready=false, seen=false, started=false;
  const go=()=>{
    if(started||!ready||!seen) return; started=true;
    box.classList.add('go');
    setTimeout(()=>box.classList.add('done'),2700);
  };
  if('IntersectionObserver' in window){
    new IntersectionObserver(e=>{
      const vis=e[0].isIntersecting;
      if(vis){seen=true;go();}
      box.classList.toggle('paused',!vis);
    },{threshold:.35}).observe(box);
  } else seen=true;
  const load=()=>{
    imgs.forEach(i=>{i.decoding='async';i.src=i.dataset.src;});
    Promise.all(imgs.map(i=>i.decode?i.decode().catch(()=>{}):Promise.resolve())).then(()=>{ready=true;go();});
  };
  const later=()=>('requestIdleCallback' in window)?requestIdleCallback(load,{timeout:1200}):setTimeout(load,200);
  if(document.readyState==='complete') later(); else window.addEventListener('load',later,{once:true});
}
