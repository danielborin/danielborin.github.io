# danielborin.github.io (old address)

The website moved to **https://danielborin.com/** (repository `danielborin/danielborin.com`).

This repository only forwards visitors and search engines from the old address
`https://danielborin.github.io/` to the same page on the new domain.

| Old address | Goes to |
|---|---|
| `/` | https://danielborin.com/ |
| `/publications/` | https://danielborin.com/publications/ |
| `/teaching/` | https://danielborin.com/teaching/ |
| `/research-network/` | https://danielborin.com/research-network/ |
| `/pt/` | https://danielborin.com/pt/ |
| `/pt/publicacoes/` | https://danielborin.com/pt/publicacoes/ |
| `/pt/ensino/` | https://danielborin.com/pt/ensino/ |
| `/pt/rede-de-pesquisa/` | https://danielborin.com/pt/rede-de-pesquisa/ |
| anything else (PDFs, CV, images…) | same path on https://danielborin.com/ (via `404.html`) |

How it works:

- Each page has an instant `<meta http-equiv="refresh">`, a JavaScript redirect and
  a `<link rel="canonical">` pointing to the new address. Google treats this as a permanent move.
- `404.html` catches every other old address and sends it to the same path on the new domain.
- `robots.txt` keeps crawling allowed, so Google can find the redirects.
- Separate project sites such as `danielborin.github.io/ICC` live in their own repositories
  and are **not** affected.

Do not add content here; edit the website in the `danielborin.com` repository.
