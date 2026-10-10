# Arthur Lacerda — Portfolio

An editorial portfolio built with HTML, CSS and JavaScript. Three.js, GSAP and Lenis provide progressive motion; static content and the SVG hero remain available when motion or WebGL is unavailable.

Published address: https://arthurlaragao.github.io/arthur-lacerda-portfolio/

## Local preview

Use Node.js 24 or newer:

```sh
npm ci
npm run build
npm run lint
npm test
npm run dev
```

The preview address is printed by the server. Publish only `dist/`; configuration files, tests and source scripts remain in the repository.

## Updating content

- Identity, positioning, professional links, email, résumé, skills and projects: `dist/config.js`.
- Verified certificates: `dist/certificates.js`; the schema example is in `examples/certificate.example.js`.
- Static About text and page metadata: `dist/index.html`.
- Images and sharing artwork: `dist/assets/`.
- Visual tokens: `dist/tokens.css`; layout: `dist/styles.css`; motion: `dist/motion.js`, `dist/experience.css` and `dist/scene.js`.

Sonora and Atlas are explicitly marked as concept studies. Replace them with real projects and URLs when available. Empty email, résumé and certificate fields do not claim credentials or contact details.

Set `siteUrl` in `dist/config.js` to the actual published HTTPS address before building. This generates the canonical URL, social image URLs and structured-data URLs.

## GitHub Pages

In repository **Settings → Pages**, select **GitHub Actions** as the publishing source. The workflow in `.github/workflows/pages.yml` checks and publishes `dist/` whenever changes reach `main`. It can also be run manually from **Actions**.

After editing, run the checks above, commit and push to `main`. Wait for **Publish portfolio to GitHub Pages** to succeed before treating an update as published. No hosting credentials or personal access tokens belong in the repository.

Further design and verification notes are in `LEIA-ME.md`, `RELATORIO.md` and `VALIDACAO.md`.
