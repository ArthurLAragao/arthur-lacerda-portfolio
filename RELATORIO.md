# Entrega 03 — Arthur Lacerda

## Mudanças

1. Identidade: Arthur Lacerda em hero, biografia, assinatura, rodapé, metadados, favicon AL e imagem social. Hero em duas linhas onde necessário; edição 2026, sem rótulo de obra inacabada.
2. Redes: GitHub, LinkedIn e Instagram fornecidos pelo proprietário, com URLs exatas, target/rel seguros, nomes acessíveis, setas SVG e linhas interativas. CTA usa essas redes. Email continua vazio com TODO. Person.sameAs contém as três URLs.
3. Arquivo de projetos removido do HTML, dados, renderer e estilos ativos. Sete seções/navegação permanecem consistentes.
4. Campo estrutural: uma fita espacial entrelaçada de nós e linhas, renderizada em Three.js com shaders próprios. O desenho sugere fluxo e conexões, sem ícones literais. SVG original equivalente mantém composição nos estados estáticos. A câmera muda na transição hero→conteúdo; o canvas pausa ao sair de vista.
5. Motion: GSAP/ScrollTrigger e Lenis, títulos revelados por máscara, seções com deslocamento de 24 px, contador fixo, perspectiva mínima em projetos, cursor complementar, tema circular com fallback. Pausa e reduced motion desativam os aprimoramentos.
6. Sonora e Atlas: conteúdo preservado, inclusive indicação de conceito. Sem projetos, métricas, contatos ou certificados inventados.

## Arquivos principais tocados

Alterados: `dist/index.html`, `config.js`, `render.js`, `app.js`, `scene.js`, `styles.css`, `tokens.css`, `assets/social.png`, `scripts/build.mjs`, `scripts/check.mjs`, `tests/contracts.test.mjs`, `tests/qa.html`, `tests/qa-server.mjs`, documentação e relatório de testes. Arquivos auxiliares receberam normalização da identidade; nenhuma ocorrência do nome anterior permanece nos arquivos de texto entregues. O histórico Git mantém snapshots anteriores, como deve acontecer em versionamento.

Criados: `dist/experience.css`, `dist/motion.js`, `dist/assets/system-field.svg`, `dist/assets/favicon.svg`, `dist/vendor/*`, `package.json`, `package-lock.json`, `.gitignore`, `scripts/vendor.mjs`, `scripts/serve.mjs`, avisos de licença.

Removidos: snapshot HTML/CSS/JS antigo de `tests/baseline` que mantinha a seção retirada; versão anterior continua recuperável no Git. Assets legados foram preservados.

## Decisões e riscos tratados

Stack estática mantida. As três dependências atendem aos efeitos pedidos e são servidas localmente, com versões fixas. Three.js minificado reduz o download dos módulos; o carregamento é posterior ao conteúdo crítico. Não foi adicionada biblioteca de pós-processamento: transparência e atenuação por profundidade nos shaders fornecem o acabamento sem render targets extras.

Touch usa qualidade reduzida e não usa hover. Hardware com memória/concurrency declarados muito baixos permanece no SVG. Este é um critério conservador, não um benchmark do dispositivo. O controle de movimento preserva a experiência estática.

Documentação consultada: [Three.js](https://threejs.org/docs/), [Lenis](https://github.com/darkroomengineering/lenis) e integração GSAP/ScrollTrigger documentada no README do Lenis. A referência GSAP online retornou uma página de verificação; os artefatos locais e exemplos oficiais foram usados.

## Depende do proprietário

Email opcional, currículo real, certificados verificáveis, domínio final e desenvolvimento dos projetos conceituais. Sem deployment nesta entrega. Testes e limites estão em `VALIDACAO.md`; comandos e edição estão em `LEIA-ME.md`.
