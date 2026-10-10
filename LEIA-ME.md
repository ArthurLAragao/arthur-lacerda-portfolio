# Arthur Lacerda — Portfólio 2026

HTML, CSS e JavaScript, preservando a base existente. A pasta publicável é `dist`. Redes reais fornecidas pelo proprietário; Sonora e Atlas continuam estudos conceituais.

## Executar

Dentro desta pasta, com Node 22 ou mais recente:

```sh
npm ci
npm run build
npm run lint
npm test
npm run dev
```

Abra http://127.0.0.1:4173/. Pare o servidor anterior se a porta já estiver ocupada. `ABRIR_PORTFOLIO.cmd` continua disponível com Python. Use HTTP: abrir por `file://` não suporta o carregamento dos módulos WebGL em todos os navegadores.

`npm run lint` é o verificador estrutural próprio: sintaxe, dados, referências, âncoras e CSS. Não há ESLint nem TypeScript. O build copia as bibliotecas para `dist/vendor` e pré-renderiza os dados no HTML; não exige CDN no navegador.

## Editar conteúdo

- `dist/config.js`: nome, cargo, posicionamento, redes, projetos, competências e foco atual. O email segue vazio, com TODO; não preencha endereço fictício. `resume` aceita `assets/curriculo.pdf` após adicionar o PDF real.
- `dist/index.html`: biografia em primeira pessoa, localização, títulos editoriais, textos e metadados. Revise os metadados ao alterar a identidade.
- `dist/certificates.js`: somente credenciais reais. Modelo separado em `examples/certificate.example.js`. Nenhum certificado foi criado. Sem credenciais, a seção exibe uma nota editorial sobre aprendizado e não mostra contagem zero.
- `dist/assets/`: `favicon.svg`, `social.png`, `system-field.svg` e fonte local. O retrato antigo permanece como asset legado, sem exibição; foto real pode ser adicionada ao About com alt e dimensões.
- `siteUrl` em config: domínio HTTPS definitivo. O build gera canonical e URL absoluta de compartilhamento quando este campo está preenchido. Não há domínio inventado.
- Após qualquer alteração dos dados: `npm run build` para atualizar também a versão sem JavaScript.

## Arquitetura e dependências

Three.js **0.180.0**, GSAP/ScrollTrigger **3.13.0**, Lenis **1.3.11**, fixados no package.json e package-lock.json. Licenças/avisos em `licenses`.

- `scene.js`: módulo Three.js lazy, BufferGeometry e GLSL próprios. Uma malha entrelaçada emerge de um campo de pontos; sem texturas, bloom pesado ou objetos alocados por frame. Limites de DPR 1,75 desktop / 1,25 compacto, com redução adicional por tempo de frame. Rendering suspenso fora da viewport/aba oculta. Geometrias e materiais liberados ao sair.
- `motion.js`: GSAP/ScrollTrigger, Lenis, cursor complementar e reação local nos previews/redes. Teclado, scroll touch e âncoras permanecem disponíveis.
- `app.js`: dados, tema, pausa, navegação e dialogs. Tema usa View Transitions quando disponível, com fallback direto. Preferência reduzida tem prioridade sobre o botão.
- `tokens.css`, `styles.css`, `experience.css`: tokens, layout base e acabamento desta versão.

O SVG é exibido imediatamente e permanece com Motion off, reduced motion, ausência de WebGL ou hardware declarado limitado. A câmera acompanha a saída do hero; fora dele, a cena suspende renderização para preservar leitura e recursos. Não existe canvas adicional nas outras seções.

## Verificar

```sh
node tests/qa-server.mjs
```

Abra http://127.0.0.1:4174/qa.html e pressione Executar testes. O servidor injeta fixtures somente nas rotas de teste; nunca publique `tests`. Detalhes dos resultados e limitações em `VALIDACAO.md`. O histórico local Git contém commits separados; nenhum push ou deployment foi executado.
