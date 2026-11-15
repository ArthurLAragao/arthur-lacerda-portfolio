/* PERSONALIZE AQUI. Links vazios são exibidos como pendentes, nunca como links fictícios.
   Ao adicionar trabalhos reais, atualize concept, descrição, stack, ano e URLs.
   Uma imagem em project.image substitui a demonstração visual. */
window.PORTFOLIO = {
  name: 'Arthur Lacerda', role: 'Engenharia de Software / AI Engineering',
  location: 'Fortaleza, Brasil', status: '', siteUrl: 'https://arthurlaragao.github.io/arthur-lacerda-portfolio/', updated: '2026-11-15',
  positioning: 'Desenvolvimento web, automação e IA aplicada.',
  currentFocus: [
    'Engenharia de Software: aplicações web, arquitetura local-first, testes e entrega contínua.',
    'AI Engineering: integrar IA a fluxos de captura, estruturação e revisão humana.',
    'Fundamentos de cloud e MLOps: aprofundar o caminho do desenvolvimento à operação.'
  ],
  softSkills: [{name:'Organização',context:'Dividir projetos em etapas pequenas, com escopo e próximos passos claros.'},{name:'Resolução de problemas',context:'Aprender com implementação, depuração e revisão das decisões.'},{name:'Comunicação',context:'Buscar clareza ao explicar ideias, registrar aprendizados e colaborar.'}], email: '', /* TODO: inserir email profissional quando fornecido. */ github: 'https://github.com/ArthurLAragao', linkedin: 'https://www.linkedin.com/in/arthur-lacerda-213788343/', instagram: 'https://www.instagram.com/arthurlaragao/', resume: '',
  portrait: 'assets/portrait.webp', portraitAlt: 'Retrato editorial ilustrativo gerado por IA; não representa Arthur Lacerda',
  projects: [
    {
      id: 'atlas', name: 'Atlas', category: 'PRODUTIVIDADE', year: '2026',
      stack: 'React · TypeScript · IndexedDB · Vite · PWA',
      description: 'Um espaço de trabalho pessoal para organizar tarefas, hábitos, notas, metas e estudos com dados armazenados no próprio navegador.',
      image: 'assets/atlas-desktop.webp', imageAlt: 'Tela Hoje do Atlas, com resumo de atividades, anotações e atalhos de estudo.',
      demo: 'https://arthurlaragao.github.io/atlas/', demoLabel: 'Abrir Atlas',
      repository: 'https://github.com/ArthurLAragao/atlas',
      problem: 'Organizar o dia e acompanhar objetivos sem espalhar tarefas, notas e hábitos por várias ferramentas.',
      solution: 'Uma aplicação web progressiva com tarefas em lista, Kanban e calendário, acompanhamento de hábitos, notas em Markdown, metas, flashcards e temporizador de foco.',
      result: 'Aplicação pública que pode ser usada sem criar conta.',
      learning: 'A versão web grava os dados em IndexedDB e permite exportar backups em JSON. Cada navegador tem seu próprio armazenamento. A sincronização em nuvem não faz parte da versão pública.'
    },
    {
      id: 'lumen', name: 'Lumen', category: 'CONHECIMENTO E IA', year: '2026',
      stack: 'React · TypeScript · Python · Markdown · Codex',
      description: 'Uma ferramenta local para transformar vídeos, links, PDFs e ideias em notas estruturadas, com revisão antes de enviar ao Obsidian ou Notion.',
      image: 'assets/lumen-desktop.webp', imageAlt: 'Tela de captura do Lumen, com entrada para links e arquivos e escolha de destino.',
      demo: 'https://arthurlaragao.github.io/lumen-organizer/', demoLabel: 'Conhecer o Lumen',
      repository: 'https://github.com/ArthurLAragao/lumen-organizer',
      problem: 'Reduzir o trabalho manual entre encontrar uma fonte útil e transformá-la em uma nota que possa ser revisada e recuperada depois.',
      solution: 'A interface em React orienta a captura e a prévia editável. Um serviço local em Python processa as fontes e usa o acesso configurado ao Codex para gerar notas. A transferência depende de confirmação e fica registrada no histórico.',
      result: 'Código e instruções de instalação públicos. A aplicação funciona localmente.',
      learning: 'A geração automatiza a estruturação inicial; a revisão humana ajuda a conferir o conteúdo antes de escolher o destino. A página pública apresenta o projeto e não executa o serviço local.'
    }
  ],
  skills: [
    {name:'Engenharia de Software',caption:'Uso em projetos',items:'TypeScript · JavaScript · Python · Arquitetura local-first · Testes automatizados'},
    {name:'Desenvolvimento web',caption:'Uso em Atlas e Lumen',items:'React · HTML · CSS · Vite · PWA · IndexedDB'},
    {name:'Engenharia de IA / AI Engineering',caption:'IA aplicada no Lumen',items:'Processamento de fontes · Geração de notas estruturadas · Revisão humana · Integração com Obsidian e Notion'},
    {name:'Versionamento e entrega',caption:'Prática em projetos publicados',items:'Git · GitHub · GitHub Actions · GitHub Pages · Documentação técnica'},
    {name:'Fundamentos e experimentação',caption:'Uso em estudos',items:'Java · Estruturas de dados · Godot · GDScript'},
    {name:'Em aprendizado',caption:'Áreas de aprofundamento',items:'AWS · Cloud · MLOps · Cibersegurança · C#'}
  ]
};
