# Validação — edição 03, 1 de outubro de 2026

## Executado

- Baseline: check estrutural e seis testes anteriores passaram antes das mudanças.
- `npm install --ignore-scripts`: três dependências fixadas; auditoria npm informou zero vulnerabilidades naquele momento.
- `npm run build`: cópia local das bibliotecas e HTML pré-renderizado.
- `npm run lint`: checker estrutural passou. Não se apresenta este resultado como uma execução de ESLint ou typecheck TypeScript.
- `npm test`: sete testes de contrato passaram, zero falhas.
- Navegador incorporado: **31/31** verificações passaram na suíte atualizada. Resultado bruto em `reports/qa-results.json`.

O primeiro comando npm de validação foi chamado a partir da pasta pai sem package.json e falhou; foi corrigido para `outputs/portfolio`, onde passou. A primeira rodada de texto ampliado capturou um overflow transitório durante o redimensionamento; a verificação após estabilizar o layout passou, e uma página carregada diretamente com texto a 200% também não apresentou overflow.

## Cobertura

- 375, 768 e 1440 px: sem overflow horizontal, dois estudos preservados, sem exceções de runtime capturadas. Inspeção visual em mobile e tablet claros e desktop escuro.
- Claro/escuro, persistência, aria-pressed e pausa exercitados. A transição de tema foi observada na interface.
- WebGL renderizou no navegador incorporado, com canvas decorativo. A versão compacta e o fallback ao pausar foram observados. Não é garantia de 60 fps em todo notebook: o alvo limita a frequência e reduz resolução por custo de frame.
- Reduced motion, preferência de sistema e touch foram simulados em matchMedia. As regras CSS foram revisadas; não houve emulação nativa de sistema operacional nem dispositivo físico.
- Ausência de WebGL simulada no servidor de QA: SVG permaneceu visível. Conteúdo sem scripts foi exercitado.
- Modal de certificados: sete fixtures isoladas, filtros, ordenação, entrada/retorno do foco e link seguro passaram. Zero fixtures no site de produção.
- Navegação por âncoras e contador de seção observados. Skip link e Escape/foco mantêm os fluxos nativos; verificações manuais adicionais registradas abaixo.
- Contraste dos tokens mantido: textos secundários de 6,03:1 a 8:1 conforme `reports/contrast.json`. Arte decorativa não transmite informação essencial.
- URLs das três redes verificadas no config, HTML e JSON-LD. O fetch externo das páginas foi indisponível nesta sessão; não se afirma teste autenticado dessas plataformas.

## Lighthouse

| Categoria | Resultado |
| --- | --- |
| Performance | Indisponível |
| Accessibility | Indisponível |
| Best Practices | Indisponível |
| SEO | Indisponível |

Lighthouse 12.8.2 foi instalado isoladamente em `work/lighthouse`, fora das dependências do portfólio. A primeira tentativa via npm exec falhou por lock de cache. Após instalação direta, o Edge não expôs a porta de depuração (`waiting for dynamic debugging port in chrome-err.log`). Nova tentativa com porta 9222 retornou `Unable to connect to Chrome`. Nenhuma pontuação foi gerada; as metas 90/95/95/95 não estão comprovadas.

Comando tentado, a partir do workspace:

```powershell
$env:CHROME_PATH='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
node work/lighthouse/node_modules/lighthouse/cli/index.js http://127.0.0.1:4173/ --port=9222 --chrome-flags='--headless=new --no-first-run' --output=json --output-path=outputs/portfolio/reports/lighthouse.json --quiet
```

Os dados PerformanceObserver do JSON são diagnósticos locais de uma execução, não notas Lighthouse nem Web Vitals de produção. A redução posterior para módulos Three.js minificados foi verificada pelo build.

## Critérios

- Identidade antiga ausente dos arquivos de texto ativos; histórico Git preservado.
- Três redes corretas, com target/rel seguros, SVG e nomes acessíveis.
- Arquivo de projetos removido e âncoras válidas.
- Hero WebGL com SVG de fallback e pausa; fluidez em hardware arbitrário não certificada.
- Tema, Motion, responsividade e testes de acessibilidade cobertos nos limites descritos.
- Build e testes aprovados.

Não foram testados leitores de tela, Safari/Firefox, hardware touch físico, modo forced-colors nativo ou deployment público. Falta definir domínio para canonical e OG absolutos. Certificados e currículo reais dependem do proprietário.

Verificação manual final nesta edição: Shift+Tab permaneceu dentro do dialog de certificado; Escape fechou e devolveu o foco ao acionador; skip link por Enter focou main. Console observado sem erros ou warnings.
