/* PERSONALIZE AQUI. Links vazios são exibidos como pendentes, nunca como links fictícios.
   Ao adicionar trabalhos reais, atualize concept, descrição, stack, ano e URLs.
   Uma imagem em project.image substitui a demonstração visual. */
window.PORTFOLIO = {
  name: 'Arthur Lacerda', role: 'Estudante de Computação / Software Developer',
  location: 'Fortaleza, Brasil', status: '', siteUrl: 'https://arthurlaragao.github.io/arthur-lacerda-portfolio/', updated: '2026-09-30',
  positioning: 'Construindo software. Explorando sistemas.',
  currentFocus: ['DevOps e automação: do código à operação.', 'AI Engineering: experimentar, avaliar e aprender.', 'Cloud e fundamentos para explorar MLOps.'],
  softSkills: [{name:'Organização',context:'Dividir projetos em etapas pequenas, com escopo e próximos passos claros.'},{name:'Resolução de problemas',context:'Aprender com implementação, depuração e revisão das decisões.'},{name:'Comunicação',context:'Buscar clareza ao explicar ideias, registrar aprendizados e colaborar.'}], email: '', /* TODO: inserir email profissional quando fornecido. */ github: 'https://github.com/ArthurLAragao', linkedin: 'https://www.linkedin.com/in/arthur-lacerda-213788343/', instagram: 'https://www.instagram.com/arthurlaragao/', resume: '',
  portrait: 'assets/portrait.webp', portraitAlt: 'Retrato editorial ilustrativo gerado por IA; não representa Arthur Lacerda',
  projects: [
    {id:'sonora',name:'Sonora',category:'MUSIC × DATA',year:'CONCEITO',stack:'JavaScript · Spotify API · Interface',description:'Uma direção de interface para explorar hábitos musicais e transformar dados de escuta em descobertas.',type:'sonora',concept:true,role:'',result:'',caseStudy:'',image:'',demo:'',repository:'',problem:'Como tornar um histórico de escuta mais fácil de explorar, sem reduzir a experiência musical a números?',solution:'Uma proposta de navegação que combina faixas, padrões de escuta e recomendações em uma interface silenciosa, com a música em primeiro plano.',learning:'Este é um estudo visual demonstrativo. Integração com Spotify, autenticação e dados reais ainda não foram implementados. Substitua pelo contexto, decisões e resultados de um projeto seu.'},
    {id:'atlas',name:'Atlas',category:'PRODUCTIVITY × SYSTEMS',year:'CONCEITO',stack:'Python · APIs · Visualização de dados',description:'Um estudo de ferramenta pessoal para organizar rotinas e visualizar progresso com clareza.',type:'atlas',concept:true,role:'',result:'',caseStudy:'',image:'',demo:'',repository:'',problem:'Como reunir prioridades e progresso em uma visão útil, sem criar mais trabalho de organização?',solution:'Uma proposta de síntese semanal com poucas métricas e uma leitura direta de foco, atividades e evolução.',learning:'Os números da prévia são ilustrativos. Não há backend ou coleta de dados. Use este espaço para documentar arquitetura, testes e aprendizados de um trabalho real.'}
  ],
  skills:[
    {name:'Linguagens e desenvolvimento',caption:'Uso atual em estudos e projetos',items:'JavaScript · Python · Java · HTML · CSS'},
    {name:'Frontend e produto',caption:'Familiaridade em projetos',items:'Interfaces web · APIs · Prototipagem'},
    {name:'Cloud e DevOps',caption:'Em aprendizado',items:'AWS · Automação · Fundamentos de entrega e operação'},
    {name:'IA e dados',caption:'Em exploração',items:'Inteligência artificial aplicada · AI Engineering · Interesse em MLOps'},
    {name:'Ferramentas e sistemas',caption:'Uso atual e familiaridade',items:'Git & GitHub · Godot · GDScript · Jogos 2D'},
    {name:'Em aprendizado',caption:'Áreas de aprofundamento',items:'Cloud · DevOps · Cibersegurança · Inteligência artificial'}
  ],
  suggestedLearning: ['TypeScript','React','Node.js','SQL','Docker','C#']
};

