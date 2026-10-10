# Auditoria e plano — Monochrome Systems

## Linha de base (antes das alterações)

- Projeto atual: `outputs/portfolio`, HTML/CSS/JavaScript estático. Não existe repositório Git inicializado nesta pasta, nem package.json, AGENTS.md físico, roteador, framework ou scripts de lint/typecheck/test/build. As instruções AGENTS fornecidas na conversa são respeitadas.
- Arquitetura: `index.html` contém seções; `config.js` guarda projetos/redes/skills; `app.js` renderiza conteúdo e controla interações; `styles.css` concentra estilos. Uma única rota, com âncoras.
- Assets: Space Grotesk e Manrope TTF locais, retrato WebP ilustrativo, licenças OFL. Tamanho original do diretório público: 236.567 bytes.
- Conteúdo: dois estudos conceituais, três espaços de arquivo, contatos vazios, UNIFOR/Computação/Fortaleza. Nenhum certificado, currículo, empregador, resultado comprovado ou link real encontrado.
- Preservar: estudos e detalhes, navegação ativa, âncoras nativas, arquivo expansível, tema persistente, pausa, reduced motion, modal com Escape, idioma PT-BR, launcher, licenças, manifesto Sites e assets originais.
- Comandos disponíveis: `node --check dist/app.js` e `node --check dist/config.js` passaram; HTTP local 200; console observado sem erros. Lint/typecheck/test/build inexistentes, não tratados como aprovados.
- Lighthouse/Playwright headless: lançamento do Edge bloqueado por `spawn EPERM`. A inspeção visual segue no navegador incorporado. Sem pontuação Lighthouse de baseline.

## Achados

1. Microtextos entre 6 e 10 px e controles reduzidos no mobile prejudicam legibilidade.
2. Projetos, redes e skills desaparecem sem JavaScript. Skip link aponta ao projeto, não ao início do conteúdo principal.
3. Links ausentes parecem ações úteis, mas apenas exibem avisos. Ano/papel/resultados não possuem campos separados.
4. Cores azuis fixas nos previews e CTA; tokens incompletos. Fontes estáticas declaradas como variáveis.
5. Intro se repete, cena e listeners não têm ciclo de descarte completo. Nenhum certificado ou viewer correspondente.
6. Fotos, URLs e biografia exigem alterações em mais de um lugar; URL local de currículo é rejeitada em file://.

## Plano aprovado pelo escopo do pedido

1. Tokens monocromáticos, contraste, preferência inicial de sistema e estado semântico do tema.
2. Seções semânticas na ordem solicitada, navegação e tipografia fluida. Mesmos HTML/CSS/JS; sem framework novo.
3. Renderização compartilhada entre navegador e prerender estático. Preservar estudos; separar exemplos não reais dos dados publicados.
4. Connect honesto, certificados vazios com modelo de exemplo separado, viewer nativo e links seguros.
5. About/Now/Skills centralizados, níveis descritos por texto, sem métricas ou senioridade inventadas.
6. Monólito modular CSS 3D, placeholder SVG, aprimoramento adiado, touch/reduced motion estáticos, pausa fora da viewport, cleanup.
7. Motion e responsividade; SEO e social image; testes de contrato e verificações no navegador.

Arquivos a editar: `dist/index.html`, `dist/styles.css`, `dist/app.js`, `dist/config.js`, documentação. Adicionar: tokens, renderer compartilhado, dados/exemplo de certificados, módulo da cena, assets geométricos, scripts e testes sem dependências runtime. Manter os assets antigos para reversibilidade.

## Referências

- Apple Design Skill: https://github.com/dickwu/apple-design-skill — princípios e fundamentos web, sem convenções exclusivas de Apple ou Liquid Glass. `npx skills add dickwu/apple-design-skill -a codex -y` falhou em clone com EPERM; instalador alternativo também bloqueado. Arquivos consultados diretamente e guardados em `work/design-reference`, sem instalar/submodule/alterar AGENTS.
- https://www.seyi.dev/ — leitura editorial, projetos em capítulos, metadados e encerramento tipográfico. Nenhum texto, asset, classe ou código copiado.

Decisão: monólito CSS 3D, porque lâminas modulares não exigem WebGL. Nenhuma dependência de produção nova. A identidade vem da relação entre tipografia, vazio e estrutura, sem decoração repetida.
