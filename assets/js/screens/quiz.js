import { getDisciplines } from "../state/matriz.js";

/* =========================================================
   BANCO DE QUESTÕES
   Estrutura extensível — cada chave é um padrão de disciplina.
   Quando a IA for integrada, este banco será substituído por
   chamadas à API, sem alterar o restante do componente.
   ========================================================= */
const BANK = {
  algoritmos: [
    {
      q: "Qual estrutura de dados usa o princípio LIFO (Last In, First Out)?",
      opts: [
        "Fila (Queue)",
        "Pilha (Stack)",
        "Lista Encadeada",
        "Árvore Binária",
      ],
      a: 1,
    },
    {
      q: "Qual é a complexidade de tempo da busca binária em um vetor ordenado?",
      opts: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
      a: 2,
    },
    {
      q: "O que é recursão em programação?",
      opts: [
        "Uma técnica para otimizar uso de memória",
        "Uma função que chama a si mesma como parte de sua execução",
        "Um loop infinito controlado pelo sistema operacional",
        "A capacidade de um programa rodar em paralelo",
      ],
      a: 1,
    },
    {
      q: "Qual alternativa descreve corretamente o Bubble Sort?",
      opts: [
        "Divide o array em duas metades e ordena recursivamente",
        "Seleciona o menor elemento e o coloca na posição correta",
        "Compara pares adjacentes e os troca se estiverem fora de ordem",
        "Insere cada elemento na posição correta em um subarray já ordenado",
      ],
      a: 2,
    },
  ],

  sistemas: [
    {
      q: "O que é um deadlock em sistemas operacionais?",
      opts: [
        "Quando um processo consome 100% da CPU continuamente",
        "Quando dois ou mais processos esperam indefinidamente por recursos entre si",
        "Quando o SO trava por falta de memória física",
        "Quando um arquivo é corrompido durante uma escrita em disco",
      ],
      a: 1,
    },
    {
      q: "Qual das seguintes é uma função do sistema operacional?",
      opts: [
        "Compilar código-fonte em código de máquina",
        "Gerenciar processos, memória e dispositivos de I/O",
        "Executar queries em banco de dados relacional",
        "Renderizar páginas HTML no navegador",
      ],
      a: 1,
    },
    {
      q: "O que é paginação em gerenciamento de memória?",
      opts: [
        "Uma técnica de compressão de arquivos em disco",
        "O processo de salvar dados em swap quando a RAM está cheia",
        "Divisão da memória em blocos de tamanho fixo para gerenciamento eficiente",
        "Um protocolo de rede para transferência de páginas HTML",
      ],
      a: 2,
    },
    {
      q: "Qual a diferença entre processo e thread?",
      opts: [
        "Não há diferença técnica entre os dois termos",
        "Threads são processos com prioridade mais alta no escalonador",
        "Processos têm espaço de memória isolado; threads compartilham memória dentro de um processo",
        "Processos são sempre mais rápidos que threads",
      ],
      a: 2,
    },
  ],

  design: [
    {
      q: "Qual princípio é fundamental no Design de Interfaces voltado para usabilidade?",
      opts: [
        "Usar o máximo de cores para tornar o sistema mais atrativo",
        "Esconder funcionalidades para o usuário descobrir por conta própria",
        "Manter consistência visual e funcional em todas as partes da interface",
        "Priorizar estética acima da funcionalidade em todos os casos",
      ],
      a: 2,
    },
    {
      q: "O que significa UX (User Experience)?",
      opts: [
        "A experiência técnica da equipe de desenvolvimento de produto",
        "A percepção e resposta do usuário ao interagir com um produto ou sistema",
        "Um framework de desenvolvimento front-end baseado em componentes",
        "Um protocolo de comunicação entre interfaces distintas",
      ],
      a: 1,
    },
    {
      q: "O que é 'affordance' em design de interfaces?",
      opts: [
        "A capacidade de uma interface funcionar em múltiplos idiomas",
        "A paleta de cores definida no guia de estilo do produto",
        "A propriedade de um elemento que sugere como ele deve ser utilizado",
        "O tempo de carregamento percebido pelo usuário",
      ],
      a: 2,
    },
    {
      q: "Qual é o objetivo principal da hierarquia visual em design?",
      opts: [
        "Tornar a interface mais colorida e visualmente rica",
        "Guiar o olhar do usuário para os elementos mais importantes primeiro",
        "Reduzir o número de elementos visíveis na tela",
        "Padronizar o tamanho de todos os componentes da interface",
      ],
      a: 1,
    },
  ],

  inovacao: [
    {
      q: "O que caracteriza uma startup em contraste com uma empresa tradicional?",
      opts: [
        "Ter obrigatoriamente menos de 10 funcionários",
        "Buscar crescimento escalável e repetível com alto grau de incerteza",
        "Não ter fins lucrativos em nenhuma etapa de seu desenvolvimento",
        "Atuar exclusivamente no mercado de tecnologia da informação",
      ],
      a: 1,
    },
    {
      q: "O que é Design Thinking?",
      opts: [
        "Uma metodologia focada exclusivamente em design gráfico",
        "Um processo de desenvolvimento de software baseado em sprints",
        "Uma abordagem centrada no humano para resolução criativa de problemas",
        "Um framework para gestão de equipes de tecnologia",
      ],
      a: 2,
    },
    {
      q: "O que é MVP (Minimum Viable Product)?",
      opts: [
        "O produto mais caro e completo do portfólio de uma empresa",
        "A versão mais polida de um produto antes do lançamento oficial",
        "A versão com o mínimo de funcionalidades para validar uma hipótese de negócio",
        "Um produto desenvolvido exclusivamente para o mercado mobile",
      ],
      a: 2,
    },
    {
      q: "O que é o conceito de 'pivô' no contexto de startups?",
      opts: [
        "A mudança de CEO de uma empresa em fase de crise",
        "Uma mudança estruturada na estratégia após aprender com feedbacks do mercado",
        "O momento em que uma startup abre capital na bolsa de valores",
        "A divisão de uma empresa em duas unidades de negócio separadas",
      ],
      a: 1,
    },
  ],

  limite: [
    {
      q: "O que representa o limite de f(x) quando x tende a 'a'?",
      opts: [
        "O valor exato de f(a)",
        "O valor que f(x) se aproxima conforme x se aproxima de 'a'",
        "A derivada de f em 'a'",
        "A área sob a curva de f(x) até o ponto 'a'",
      ],
      a: 1,
    },
    {
      q: "Qual condição é necessária para que uma função seja derivável em um ponto?",
      opts: [
        "A função deve ser constante naquele ponto",
        "A função deve ser contínua naquele ponto",
        "A função deve ser crescente naquele ponto",
        "A função deve ter um máximo local naquele ponto",
      ],
      a: 1,
    },
    {
      q: "O que a derivada representa geometricamente?",
      opts: [
        "A área sob a curva da função",
        "O valor máximo atingido pela função",
        "A inclinação da reta tangente à curva em um ponto",
        "O ponto onde a função intercepta o eixo x",
      ],
      a: 2,
    },
    {
      q: "Qual é a regra da cadeia em derivação?",
      opts: [
        "d(f·g)/dx = f'·g'",
        "d(f/g)/dx = (f'g − fg') / g²",
        "d(f(g(x)))/dx = f'(g(x)) · g'(x)",
        "d(f + g)/dx = f' + g'",
      ],
      a: 2,
    },
  ],

  trabalho: [
    {
      q: "O que é um artigo científico?",
      opts: [
        "Um resumo comentado de livros acadêmicos relevantes",
        "Um texto informal que relata experiências pessoais de pesquisadores",
        "Um trabalho original que relata resultados de pesquisa publicado em periódico revisado por pares",
        "Um manual de instruções técnicas para uso em laboratórios",
      ],
      a: 2,
    },
    {
      q: "O que é plágio em trabalhos acadêmicos?",
      opts: [
        "Citar autores sem adicionar análise própria ao texto",
        "Usar ideias, textos ou dados de outros autores sem a devida atribuição",
        "Reutilizar partes de trabalhos anteriores com permissão formal do orientador",
        "Resumir artigos científicos originalmente escritos em língua estrangeira",
      ],
      a: 1,
    },
    {
      q: "Qual é a função da revisão bibliográfica em um trabalho científico?",
      opts: [
        "Aumentar o número de páginas para atingir a cota mínima exigida",
        "Demonstrar o estado atual do conhecimento e embasar teoricamente a pesquisa",
        "Listar todos os autores que discordam da hipótese do pesquisador",
        "Substituir a metodologia quando não há dados empíricos suficientes",
      ],
      a: 1,
    },
    {
      q: "O que diferencia uma hipótese de uma tese em pesquisa científica?",
      opts: [
        "Hipótese é uma afirmação provada; tese é uma suposição inicial",
        "Não há diferença prática entre os dois conceitos na academia",
        "Hipótese é uma suposição a ser testada; tese é uma proposição defendida com base em evidências",
        "Tese é usada apenas em ciências exatas; hipótese em ciências humanas",
      ],
      a: 2,
    },
  ],
};

const LETTERS = ["A", "B", "C", "D"];

/* =========================================================
   UTILITÁRIOS
   ========================================================= */
function matchKey(discipline) {
  const d = discipline.toLowerCase();
  if (d.includes("algoritmo") || d.includes("programa")) return "algoritmos";
  if (d.includes("sistema") && (d.includes("operac") || d.includes("so")))
    return "sistemas";
  if (d.includes("design") || d.includes("interface")) return "design";
  if (d.includes("inova")) return "inovacao";
  if (d.includes("limite") || d.includes("derivada")) return "limite";
  if (d.includes("trabalho") || d.includes("cient") || d.includes("mtc"))
    return "trabalho";
  return null;
}

function genericQuestions(discipline) {
  return [
    {
      q: `Qual alternativa melhor descreve o objetivo central do estudo de ${discipline}?`,
      opts: [
        "Memorizar definições sem compreender sua aplicação prática",
        "Compreender fundamentos e aplicá-los para resolver problemas reais",
        "Executar tarefas técnicas de forma mecânica e repetitiva",
        "Estudar de forma isolada, sem conexão com outras áreas",
      ],
      a: 1,
    },
    {
      q: `Em ${discipline}, qual postura favorece um aprendizado mais eficaz?`,
      opts: [
        "Estudar somente nos momentos anteriores às avaliações",
        "Praticar regularmente e relacionar o conteúdo com exemplos do cotidiano",
        "Focar exclusivamente nos tópicos cobrados em provas",
        "Depender apenas das aulas sem realizar pesquisa adicional",
      ],
      a: 1,
    },
    {
      q: `Qual desafio é comum no aprendizado de ${discipline}?`,
      opts: [
        "Excesso de materiais de estudo gratuitos disponíveis",
        "Dificuldade em conectar teoria com aplicação prática",
        "Conteúdo apresentado em velocidade excessiva em sala",
        "Falta de acesso a equipamentos e laboratórios",
      ],
      a: 1,
    },
  ];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(disciplines) {
  const all = [];
  for (const disc of disciplines) {
    const key = matchKey(disc);
    const pool = key ? BANK[key] : genericQuestions(disc);
    pool.forEach((item) => all.push({ discipline: disc, ...item }));
  }
  return shuffle(all);
}

/* =========================================================
   COMPONENTE
   ========================================================= */
export function quizScreen() {
  return `
  <main class="quiz">
    <div class="quiz-layout">

      <div class="quiz-main">
        <div class="quiz-top">
          <h1 class="quiz-title">Quiz</h1>
          <img src="assets/images/BELUGA.png" alt="Beluga" class="quiz-beluga" />
        </div>

        <div class="quiz-intro-box">
          <p>Preparado? Vem aí um quiz com perguntas aleatórias das suas matérias. Quero
          descobrir o quanto você já domina, sem pressão — só quero te conhecer melhor! 😊</p>
        </div>

        <p class="quiz-counter" id="quiz-counter">PERGUNTA 1/1</p>

        <div class="quiz-question-card">
          <p id="quiz-question-text"></p>
        </div>

        <div id="quiz-options" class="quiz-options"></div>

        <div class="quiz-nav">
          <div class="quiz-nav-row">
            <button id="btn-prev" class="quiz-prev-btn">&#8592; Anterior</button>
            <button id="btn-next" class="quiz-next-btn">Próxima &#8594;</button>
          </div>
          <button id="btn-finish" class="button quiz-finish-btn">
            Finalizar e Acessar Meu Plano de Estudos
          </button>
        </div>
      </div>

      <aside class="quiz-sidebar">
        <p class="quiz-sidebar-label">Progresso</p>
        <div id="quiz-progress-bar" class="quiz-progress-bar"></div>
      </aside>

    </div>

  </main>`;
}

export function quizInit() {
  const disciplines = getDisciplines();
  const questions = buildQuestions(
    disciplines.length ? disciplines : ["Conhecimentos Gerais"],
  );

  let current = 0;
  const answers = new Array(questions.length).fill(null);

  const counterEl = document.getElementById("quiz-counter");
  const questionEl = document.getElementById("quiz-question-text");
  const optionsEl = document.getElementById("quiz-options");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const btnFinish = document.getElementById("btn-finish");
  const progressEl = document.getElementById("quiz-progress-bar");

  // C3: delegação única no container — evita acúmulo de listeners a cada renderProgress()
  progressEl.addEventListener("click", (e) => {
    const tile = e.target.closest(".progress-tile");
    if (!tile) return;
    current = Number(tile.dataset.q);
    render();
  });

  // Q: delegação única no container de opções — consistente com o padrão C3 das tiles de progresso
  optionsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".quiz-option");
    if (!btn) return;
    answers[current] = Number(btn.dataset.idx);
    optionsEl.querySelectorAll(".quiz-option").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    renderProgress();
  });

  function renderProgress() {
    // C7: variável cls removida — era código morto (nunca usada no template)
    // C3: listeners removidos daqui — delegação única configurada em quizInit() abaixo
    progressEl.innerHTML = questions
      .map((_, i) =>
        `<button class="progress-tile ${i === current ? "current" : answers[i] !== null ? "answered" : ""}" data-q="${i}" title="Pergunta ${i + 1}"></button>`
      )
      .join("");
  }

  function renderQuestion() {
    const q = questions[current];
    const total = questions.length;

    counterEl.textContent = `PERGUNTA ${current + 1}/${total}`;
    questionEl.textContent = q.q;

    optionsEl.innerHTML = q.opts
      .map(
        (opt, i) => `
        <button class="quiz-option${answers[current] === i ? " selected" : ""}" data-idx="${i}">
          <span class="option-letter">${LETTERS[i]}</span>
          <span class="option-text">${opt}</span>
        </button>`,
      )
      .join("");

    const isLast = current === questions.length - 1;
    btnPrev.style.visibility = current === 0 ? "hidden" : "visible";
    btnNext.style.display = isLast ? "none" : "";
    btnFinish.style.display = isLast ? "" : "none";
  }

  function render() {
    renderQuestion();
    renderProgress();
  }

  btnPrev.addEventListener("click", () => {
    if (current > 0) {
      current--;
      render();
    }
  });

  btnNext.addEventListener("click", () => {
    if (current < questions.length - 1) {
      current++;
      render();
    }
  });

  btnFinish.addEventListener("click", () => {
    window.location.hash = "#/plano";
  });

  render();
}
