"""
Budowanie strony ekospec.pro
============================

Wspólne fragmenty (menu, stopka, baner cookies, okna) są w folderze _partials/.
Podstrony usług są w folderze _strony/ (jeden plik = jedna podstrona).

Uruchomienie (z folderu repozytorium):
    python _build.py

Skrypt:
  1. wstawia aktualne fragmenty z _partials/ do index.html (między znacznikami <!-- @nazwa --> ... <!-- /@nazwa -->),
  2. z każdego pliku _strony/NAZWA.html buduje podstronę NAZWA/index.html,
  3. odświeża sitemap.xml.

Foldery zaczynające się od „_” GitHub Pages pomija przy publikacji, więc szablony nie trafiają na stronę.
"""
import datetime
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).parent
DOMAIN = 'https://ekospec.pro'
PARTIALS = {p.stem: p.read_text(encoding='utf-8') for p in (ROOT / '_partials').glob('*.html')}


def partial(name, root):
    return PARTIALS[name].replace('{{root}}', root).rstrip()


def inject(html, root):
    """Podmienia treść między <!-- @nazwa --> a <!-- /@nazwa -->."""
    def repl(m):
        indent, name = m.group(1), m.group(2)
        return f'{indent}<!-- @{name} -->\n{partial(name, root)}\n{indent}<!-- /@{name} -->'
    return re.sub(r'([ \t]*)<!-- @(\w+) -->.*?<!-- /@\2 -->', repl, html, flags=re.S)


def parse_page(text):
    """Plik podstrony: nagłówek z polami „klucz: wartość” do linii „---”, potem treść HTML."""
    head, body = text.split('\n---\n', 1)
    meta = {}
    for line in head.strip().splitlines():
        k, v = line.split(':', 1)
        meta[k.strip()] = v.strip()
    return meta, body


def build_page(src):
    meta, body = parse_page(src.read_text(encoding='utf-8'))
    slug = src.stem
    url = f'{DOMAIN}/{slug}/'
    root = '../'
    faq = re.findall(r'<details class="faq-item">\s*<summary>(.*?)</summary>\s*<div class="faq-a">(.*?)</div>', body, flags=re.S)
    strip = lambda s: re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', s)).strip()
    graph = [
        {'@type': 'Service', 'name': meta['nazwa'], 'serviceType': meta['nazwa'], 'description': meta['opis'], 'url': url,
         'provider': {'@type': 'ProfessionalService', 'name': 'Ekospec', 'url': DOMAIN + '/', 'telephone': '+48573018657',
                      'address': {'@type': 'PostalAddress', 'streetAddress': 'ul. Szaflarska 100/1', 'addressLocality': 'Nowy Targ', 'postalCode': '34-400', 'addressCountry': 'PL'}},
         'areaServed': {'@type': 'Country', 'name': 'Polska'}},
        {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Ekospec', 'item': DOMAIN + '/'},
            {'@type': 'ListItem', 'position': 2, 'name': meta['nazwa'], 'item': url}]},
    ]
    if faq:
        graph.append({'@type': 'FAQPage', 'mainEntity': [
            {'@type': 'Question', 'name': strip(q), 'acceptedAnswer': {'@type': 'Answer', 'text': strip(a)}} for q, a in faq]})
    schema = json.dumps({'@context': 'https://schema.org', '@graph': graph}, ensure_ascii=False, indent=1)
    html = f'''<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{meta['tytul']}</title>
<meta name="description" content="{meta['opis']}">
<link rel="canonical" href="{url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:locale" content="pl_PL">
<meta property="og:site_name" content="Ekospec">
<meta property="og:title" content="{meta['tytul']}">
<meta property="og:description" content="{meta['opis']}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{DOMAIN}/og-image-ekospec.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0b0f1e">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{root}assets/ekospec.css">
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<script type="application/ld+json">
{schema}
</script>
</head>
<body class="subpage">
<div id="site">

  <!-- @nav -->
  <!-- /@nav -->

{body.strip()}

  <!-- @footer -->
  <!-- /@footer -->

</div>

<!-- @overlays -->
<!-- /@overlays -->

<script src="{root}assets/ekospec.js"></script>
</body>
</html>
'''
    out = ROOT / slug / 'index.html'
    out.parent.mkdir(exist_ok=True)
    out.write_text(inject(html, root), encoding='utf-8')
    return slug


def main():
    index = ROOT / 'index.html'
    index.write_text(inject(index.read_text(encoding='utf-8'), ''), encoding='utf-8')
    slugs = [build_page(p) for p in sorted((ROOT / '_strony').glob('*.html'))]
    today = datetime.date.today().isoformat()
    urls = [f'{DOMAIN}/'] + [f'{DOMAIN}/{s}/' for s in slugs]
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sitemap += ''.join(f'  <url><loc>{u}</loc><lastmod>{today}</lastmod></url>\n' for u in urls)
    sitemap += '</urlset>\n'
    (ROOT / 'sitemap.xml').write_text(sitemap, encoding='utf-8')
    print('Zbudowano:', ', '.join(['index.html'] + [f'{s}/index.html' for s in slugs]))


if __name__ == '__main__':
    main()
