// === NAVBAR ===
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>40);
});
function toggleMenu(){
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu(){
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

// === SCROLL ANIMATIONS ===
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));

// === COOKIES ===
function acceptCookies(){lsSet('cookies_choice','accepted');document.getElementById('cookie-banner').classList.remove('show');}
function rejectCookies(){lsSet('cookies_choice','rejected');document.getElementById('cookie-banner').classList.remove('show');}

// === SHARE ===
function shareP(){
  const shareUrl = window.location.origin + window.location.pathname;
  if(navigator.share){navigator.share({title:'Ekospec',text:'Polecam firmę Ekospec',url:shareUrl});}
  else{navigator.clipboard.writeText(shareUrl).then(()=>{
    const b=document.getElementById('shareBtn');
    const o=b.innerHTML;
    b.innerHTML='<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg><span>Skopiowano!</span>';
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
}
function lbShow(){
  const el=lbItems[lbIndex];
  const img=el.querySelector('img');
  document.getElementById('lb-img').src=img ? (img.dataset.full||img.currentSrc||img.src) : '';
  document.getElementById('lb-title').textContent=el.dataset.title||'';
  document.getElementById('lb-desc').textContent=el.dataset.desc||'';
}
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
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
const LEGAL_DOCS={
  privacy:{
    title:'Polityka prywatności',
    html:`
      <h4>Administrator danych osobowych</h4>
      <p>Administratorem Twoich danych osobowych jest <strong>Bartłomiej Głąbiński</strong>, prowadzący działalność gospodarczą pod firmą <strong>Przedsiębiorstwo Techniczne Usługowo Handlowe JANTAR</strong>, ul. Szaflarska 100/1, 34-400 Nowy Targ, NIP: 7352516870, email: <strong>biuro@ekospec.pro</strong>.</p>
      <h4>Jakie dane zbieramy</h4>
      <p>Zbieramy wyłącznie dane, które sam nam przekazujesz za pośrednictwem formularza kontaktowego na stronie:</p>
      <ul>
        <li>imię i nazwisko</li>
        <li>adres email lub numer telefonu</li>
        <li>treść wiadomości oraz informacje o obiekcie, które zaznaczysz (np. rodzaj obiektu, powierzchnia, przybliżone koszty energii)</li>
      </ul>
      <p>Razem z wiadomością formularz przekazuje też informację techniczną: skąd trafiłeś na stronę (np. wyszukiwarka Google, LinkedIn, wejście bezpośrednie) oraz które strony serwisu oglądałeś podczas tej wizyty. Nie zawiera ona adresu IP ani żadnych identyfikatorów. Pomaga nam lepiej przygotować odpowiedź i ocenić, które formy informowania o naszych usługach działają.</p>
      <h4>Cel i podstawa przetwarzania</h4>
      <p><strong>Odpowiedź na zapytanie</strong> — przetwarzamy dane w celu udzielenia odpowiedzi na Twoje pytanie lub przygotowania oferty (podstawa: art. 6 ust. 1 lit. b RODO — niezbędność do podjęcia działań przed zawarciem umowy, lub art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes administratora).</p>
      <p><strong>Marketing</strong> — jeśli wyraziłeś zgodę na otrzymywanie informacji marketingowych, będziemy przesyłać Ci informacje o usługach i promocjach (podstawa: art. 6 ust. 1 lit. a RODO — zgoda). Zgodę możesz wycofać w dowolnym momencie.</p>
      <h4>Okres przechowywania danych</h4>
      <p>Dane przechowujemy przez okres niezbędny do obsługi zapytania, a następnie przez czas wynikający z przepisów prawa (np. obowiązek archiwizacji dokumentów księgowych) lub do momentu wycofania zgody na marketing.</p>
      <h4>Odbiorcy danych</h4>
      <p>Twoje dane nie są sprzedawane ani udostępniane podmiotom trzecim w celach komercyjnych. Mogą być przetwarzane wyłącznie przez dostawców usług technicznych niezbędnych do działania strony:</p>
      <ul>
        <li><strong>GitHub</strong> (GitHub Pages) — hosting strony,</li>
        <li><strong>Formspree</strong> — przekazywanie wiadomości z formularza kontaktowego na adres biuro@ekospec.pro,</li>
        <li><strong>Cloudflare</strong> — zabezpieczenie formularza przed spamem (Turnstile) oraz anonimowe statystyki odwiedzin (Web Analytics).</li>
      </ul>
      <h4>Statystyki odwiedzin</h4>
      <p>Korzystamy z usługi Cloudflare Web Analytics, która nie używa plików cookies, nie śledzi użytkowników między stronami i nie tworzy ich profili. Zbieramy wyłącznie dane zbiorcze: liczbę odwiedzin, odwiedzane podstrony, źródło wejścia (np. wyszukiwarka), rodzaj urządzenia i przeglądarki oraz kraj. Na tej podstawie nie da się zidentyfikować konkretnej osoby.</p>
      <h4>Twoje prawa</h4>
      <p>Przysługuje Ci prawo do:</p>
      <ul>
        <li>dostępu do swoich danych i otrzymania ich kopii</li>
        <li>sprostowania (poprawienia) danych</li>
        <li>usunięcia danych („prawo do bycia zapomnianym")</li>
        <li>ograniczenia przetwarzania danych</li>
        <li>przenoszenia danych</li>
        <li>wniesienia sprzeciwu wobec przetwarzania</li>
        <li>wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania dokonanego przed wycofaniem)</li>
        <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa)</li>
      </ul>
      <p>Aby skorzystać z powyższych praw, skontaktuj się z nami pod adresem: <strong>biuro@ekospec.pro</strong></p>
      <h4>Dobrowolność podania danych</h4>
      <p>Podanie danych jest dobrowolne, jednak niezbędne do udzielenia odpowiedzi na zapytanie. Brak podania danych uniemożliwi kontakt zwrotny.</p>
    `
  },
  cookies:{
    title:'Polityka cookies',
    html:`
      <h4>Czym są pliki cookies</h4>
      <p>Pliki cookies (ciasteczka) i podobne technologie (np. pamięć przeglądarki) to małe porcje danych zapisywane na Twoim urządzeniu podczas odwiedzania strony internetowej.</p>
      <h4>Czego używamy</h4>
      <p><strong>Elementy niezbędne</strong> — zapamiętanie, że zapoznałeś się z informacją o prywatności (w pamięci przeglądarki), oraz zabezpieczenie formularza kontaktowego przed spamem (Cloudflare Turnstile). Są konieczne do działania strony i nie wymagają zgody.</p>
      <p><strong>Informacja do formularza</strong> — w bieżącej karcie przeglądarki (sessionStorage, nie cookies) zapamiętujemy, skąd trafiłeś na stronę i które jej strony oglądasz. Dołączamy to do wiadomości tylko wtedy, gdy sam wyślesz formularz; w przeciwnym razie informacja nie opuszcza Twojej przeglądarki i znika po zamknięciu karty.</p>
      <p><strong>Statystyki odwiedzin</strong> — Cloudflare Web Analytics działa <strong>bez plików cookies</strong> i bez identyfikowania użytkowników. Zbiera wyłącznie anonimowe dane zbiorcze o ruchu na stronie.</p>
      <p>Nie używamy cookies reklamowych ani narzędzi śledzących.</p>
      <h4>Jak zarządzać cookies</h4>
      <p>Możesz w każdej chwili zmienić ustawienia cookies w swojej przeglądarce. Poniżej linki do instrukcji dla popularnych przeglądarek:</p>
      <ul>
        <li>Google Chrome — Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie</li>
        <li>Mozilla Firefox — Opcje → Prywatność i bezpieczeństwo</li>
        <li>Safari — Preferencje → Prywatność</li>
        <li>Microsoft Edge — Ustawienia → Pliki cookie i uprawnienia witryny</li>
      </ul>
      <p>Zablokowanie elementów niezbędnych może utrudnić wysłanie formularza kontaktowego.</p>
      <h4>Okres przechowywania</h4>
      <p>Informacja o zapoznaniu się z komunikatem o prywatności pozostaje w pamięci Twojej przeglądarki do czasu jej wyczyszczenia. Informacja o źródle wizyty i oglądanych stronach jest usuwana automatycznie po zamknięciu karty przeglądarki.</p>
      <h4>Podstawa prawna</h4>
      <p>Elementy niezbędne oraz anonimowe statystyki odwiedzin stosujemy na podstawie prawnie uzasadnionego interesu administratora (art. 6 ust. 1 lit. f RODO), polegającego na zapewnieniu działania i bezpieczeństwa strony oraz jej rozwoju.</p>
    `
  },
  rodo:{
    title:'Informacja RODO',
    html:`
      <h4>Klauzula informacyjna — art. 13 RODO</h4>
      <p>Zgodnie z art. 13 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych (RODO) informujemy:</p>
      <h4>1. Administrator danych</h4>
      <p><strong>Bartłomiej Głąbiński</strong><br/>
      Przedsiębiorstwo Techniczne Usługowo Handlowe JANTAR<br/>
      ul. Szaflarska 100/1, 34-400 Nowy Targ<br/>
      NIP: 7352516870<br/>
      Email: biuro@ekospec.pro</p>
      <h4>2. Cel i podstawa prawna przetwarzania</h4>
      <ul>
        <li>Obsługa zapytań i korespondencji — art. 6 ust. 1 lit. b lub f RODO</li>
        <li>Marketing usług własnych — art. 6 ust. 1 lit. a RODO (zgoda)</li>
        <li>Wykonanie umowy lub podjęcie działań przed jej zawarciem — art. 6 ust. 1 lit. b RODO</li>
        <li>Wypełnienie obowiązków prawnych (np. podatkowych) — art. 6 ust. 1 lit. c RODO</li>
      </ul>
      <h4>3. Okres przechowywania danych</h4>
      <p>Dane przetwarzane są przez okres niezbędny do realizacji celu, dla którego zostały zebrane, a następnie przez czas wynikający z przepisów prawa (w szczególności przepisów podatkowych i rachunkowych — do 5 lat od końca roku kalendarzowego, w którym powstał obowiązek podatkowy).</p>
      <h4>4. Prawa osoby, której dane dotyczą</h4>
      <p>Przysługuje Ci prawo do: dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu oraz — w przypadku zgody — jej wycofania w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania sprzed wycofania.</p>
      <h4>5. Prawo do skargi</h4>
      <p>Masz prawo wniesienia skargi do organu nadzorczego — <strong>Prezesa Urzędu Ochrony Danych Osobowych</strong>, ul. Stawki 2, 00-193 Warszawa, gdy uznasz że przetwarzanie danych narusza przepisy RODO.</p>
      <h4>6. Dobrowolność podania danych</h4>
      <p>Podanie danych osobowych jest dobrowolne. Niepodanie danych niezbędnych do obsługi zapytania uniemożliwi udzielenie odpowiedzi lub zawarcie umowy.</p>
      <h4>7. Zautomatyzowane podejmowanie decyzji</h4>
      <p>Dane osobowe nie będą wykorzystywane do zautomatyzowanego podejmowania decyzji ani profilowania.</p>
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
}
function closeLegal(){
  document.getElementById('legal-modal').classList.remove('open');
  document.body.style.overflow='';
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
  document.body.style.overflow = 'hidden';
}
function closeServiceModal(){
  document.getElementById('service-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function closeServiceModalBg(e){
  if(e.target===document.getElementById('service-modal')) closeServiceModal();
}
document.addEventListener('keydown', e=>{
  if(e.key==='Escape' && document.getElementById('service-modal').classList.contains('open')){
    closeServiceModal();
  }
});

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
      btn.style.background='#2a6b3a';
      e.target.reset();
    } else {
      btn.textContent='Błąd wysyłania — spróbuj ponownie';
      btn.style.background='#8b2020';
      btn.disabled=false;
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
function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}

// --- SKĄD PRZYSZŁO ZAPYTANIE ---
// Zapamiętuje w bieżącej karcie (sessionStorage) źródło wizyty i oglądane strony.
// Dane opuszczają przeglądarkę tylko razem z wiadomością wysłaną przez formularz.
const TRASA=(function(){
  const KEY='ekospec_trasa';
  let t=null;
  try{t=JSON.parse(sessionStorage.getItem(KEY)||'null');}catch(e){}
  if(!t||!t.src){
    const q=new URLSearchParams(location.search);
    const tag=q.get('z')||q.get('utm_source');
    let src='Wejście bezpośrednie (wpisany adres, zakładka, QR, link z maila lub aplikacji)';
    if(tag){
      const T={linkedin:'LinkedIn',facebook:'Facebook',fb:'Facebook',qr:'Kod QR',gmb:'Profil firmy w Google',google:'Profil firmy w Google',mail:'E-mail',email:'E-mail',sms:'SMS',wizytowka:'Wizytówka'};
      src=(T[tag.toLowerCase()]||tag)+' (oznaczony link)';
    } else if(document.referrer){
      let h='';try{h=new URL(document.referrer).hostname.replace(/^www\./,'');}catch(e){}
      if(h&&h!==location.hostname.replace(/^www\./,'')){
        if(/(^|\.)google\./.test(h)) src='Google (wyszukiwarka lub Mapy)';
        else if(/bing\.|duckduckgo\.|yahoo\.|ecosia\./.test(h)) src='Inna wyszukiwarka ('+h+')';
        else if(/linkedin\.|lnkd\.in/.test(h)) src='LinkedIn';
        else if(/facebook\.|fb\.|instagram\./.test(h)) src='Facebook / Instagram';
        else src='Link na stronie: '+h;
      }
    }
    t={src,first:location.pathname,pages:[]};
  }
  const name=document.body&&document.body.classList.contains('subpage')
    ?(document.title.split(/\s[–|-]\s/)[0]||location.pathname):'Strona główna';
  if(t.pages[t.pages.length-1]!==name) t.pages.push(name);
  t.pages=t.pages.slice(-12);
  try{sessionStorage.setItem(KEY,JSON.stringify(t));}catch(e){}
  return t;
})();
function fillTrasa(form){
  const set=(id,v)=>{const el=form.querySelector('#'+id); if(el) el.value=v;};
  set('fZrodlo',TRASA.src);
  set('fPierwsza',TRASA.first);
  set('fOgladane',TRASA.pages.join(' → '));
  set('fZeStrony',location.pathname);
}
// temat z podstrony: ../?temat=slug#kontakt
window.addEventListener('DOMContentLoaded',()=>{
  const sel=document.getElementById('fTemat'); if(!sel) return;
  const q=new URLSearchParams(location.search), slug=q.get('temat');
  if(slug){
    const o=sel.querySelector(`option[data-slug="${CSS.escape(slug)}"]`);
    if(o) sel.value=o.value||o.textContent;
    q.delete('temat');
    const rest=q.toString();
    try{history.replaceState(null,'',location.pathname+(rest?'?'+rest:'')+location.hash);}catch(e){}
  }
});

// --- start strony (bez intro) ---
window.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('fabWrap').style.display='flex';
  document.getElementById('shareBtn').style.display='flex';
  if(!lsGet('cookies_choice'))
    setTimeout(()=>document.getElementById('cookie-banner').classList.add('show'),1800);
  initHeroLogo();
});

// --- HERO: słoń i obwód rysują się ---
function initHeroLogo(){
  const slon=document.getElementById('hlSlon');
  const obw=document.getElementById('hlObwod');
  if(!slon||!obw) return;
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
