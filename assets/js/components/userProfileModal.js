/* =========================================================
   BELUGA – userProfileModal.js
   Modal de perfil de usuário — reutilizável no Feed e no Fórum.
   Uso: importar initUserProfileModal() em cada screen init.
        Triggers: qualquer elemento com [data-profile-trigger]
                  + data-user-name, data-user-initials, data-user-color.
   ========================================================= */

// ─── Mock profiles DB ─────────────────────────────────────
// Futuramente substituído por GET /api/users/:name
const PROFILES = {
  "André Sanches": {
    bio: "Engenharia de Computação · Design de Interfaces e Algoritmos",
    isMonitor: true,
    level: 9,
    levelTitle: "Veterano",
    xp: 4200,
    xpNext: 5000,
    hoursStudied: 98,
    streak: 18,
    rankPosition: 1,
    achievements: [
      { icon: "🥇", name: "Top 1 Semanal", rare: false },
      { icon: "⚡", name: "Sequência de 14 Dias", rare: false },
      { icon: "🧠", name: "Neurônio de Ouro", rare: false },
      { icon: "🎓", name: "Monitor Aprovado", rare: true },
      { icon: "💎", name: "Diamante BELUGA", rare: true },
    ],
    recentActivity: [
      {
        type: "Feed",
        text: "Bati meu recorde pessoal: 3 horas de Design de Interfaces hoje! Semana produtiva.",
      },
      {
        type: "Fórum",
        text: "Respondeu: Qual a lógica por trás do algoritmo de busca binária?",
      },
    ],
  },

  "Laura Silva": {
    bio: "Ciência da Computação · Especialista em Algoritmos e Lógica",
    isMonitor: true,
    level: 8,
    levelTitle: "Estudante Ninja",
    xp: 3800,
    xpNext: 4500,
    hoursStudied: 76,
    streak: 12,
    rankPosition: 2,
    achievements: [
      { icon: "🏆", name: "Top 5 Semanal", rare: false },
      { icon: "🔥", name: "Sequência de 7 Dias", rare: false },
      { icon: "🎯", name: "Foco Total", rare: false },
      { icon: "🎓", name: "Monitor Aprovado", rare: true },
    ],
    recentActivity: [
      {
        type: "Feed",
        text: "Fiz o quiz de Algoritmos e acertei 8/10! Errei as questões de complexidade de tempo.",
      },
    ],
  },

  "Mariana Assis": {
    bio: "Sistemas de Informação · Banco de Dados e Desenvolvimento Web",
    isMonitor: false,
    level: 7,
    levelTitle: "Estudante Avançado",
    xp: 3100,
    xpNext: 4000,
    hoursStudied: 64,
    streak: 9,
    rankPosition: 4,
    achievements: [
      { icon: "🌟", name: "Estrela Ascendente", rare: false },
      { icon: "🔥", name: "Sequência de 7 Dias", rare: false },
      { icon: "🤝", name: "Colaborador", rare: false },
    ],
    recentActivity: [
      {
        type: "Feed",
        text: "Banco de Dados me venceu hoje... mas amanhã eu volto com tudo. Não vou desistir.",
      },
    ],
  },

  "Carlos Eduardo": {
    bio: "Engenharia de Software · Organização e produtividade no foco",
    isMonitor: false,
    level: 9,
    levelTitle: "Veterano",
    xp: 4600,
    xpNext: 5000,
    hoursStudied: 142,
    streak: 24,
    rankPosition: 3,
    achievements: [
      { icon: "💎", name: "Diamante BELUGA", rare: true },
      { icon: "⚡", name: "Sequência de 14 Dias", rare: false },
      { icon: "🥇", name: "Top 1 Semanal", rare: false },
      { icon: "📚", name: "Leitor Assíduo", rare: false },
      { icon: "🚀", name: "Superação", rare: false },
    ],
    recentActivity: [
      {
        type: "Feed",
        text: "Terminei meu plano de estudos da semana! Foram 11 horas no total, distribuídas em 5 disciplinas.",
      },
    ],
  },

  "Maria Cláudia": {
    bio: "Engenharia de Software · Avançando em Cálculo e Derivadas",
    isMonitor: false,
    level: 6,
    levelTitle: "Explorador",
    xp: 2850,
    xpNext: 3500,
    hoursStudied: 52,
    streak: 14,
    rankPosition: 5,
    achievements: [
      { icon: "🔥", name: "Sequência de 7 Dias", rare: false },
      { icon: "🌟", name: "Estrela Ascendente", rare: false },
      { icon: "💡", name: "Curiosidade Ativa", rare: false },
    ],
    recentActivity: [
      {
        type: "Feed",
        text: "Estudei 2 horas de derivada hoje, tô começando a entender melhor! A regra da cadeia finalmente fez sentido.",
      },
      {
        type: "Fórum",
        text: "Comentou em: Escalonamento de processos em Sistemas Operacionais.",
      },
    ],
  },

  "José Antônio": {
    bio: "Sistemas de Informação · Sistemas Operacionais e Infraestrutura",
    isMonitor: false,
    level: 7,
    levelTitle: "Estudante Avançado",
    xp: 3240,
    xpNext: 4000,
    hoursStudied: 71,
    streak: 11,
    rankPosition: 6,
    achievements: [
      { icon: "🎯", name: "Foco Total", rare: false },
      { icon: "🤝", name: "Colaborador", rare: false },
    ],
    recentActivity: [
      {
        type: "Feed",
        text: "Revisei os conteúdos de Sistemas Operacionais e finalmente entendi escalonamento de processos.",
      },
    ],
  },

  "Fernanda Lima": {
    bio: "Análise e Desenvolvimento · Inovação e Empreendedorismo",
    isMonitor: false,
    level: 5,
    levelTitle: "Estudante em Progresso",
    xp: 1950,
    xpNext: 2500,
    hoursStudied: 38,
    streak: 6,
    rankPosition: 9,
    achievements: [
      { icon: "🚀", name: "Primeiros Passos", rare: false },
      { icon: "💡", name: "Inovador", rare: false },
    ],
    recentActivity: [
      {
        type: "Feed",
        text: "Assisti duas aulas de Inovação e Tecnologia e fiquei inspirada com o conteúdo sobre startups universitárias.",
      },
    ],
  },

  "Rafael Torres": {
    bio: "Ciência da Computação · Lógica de Programação e consistência diária",
    isMonitor: false,
    level: 7,
    levelTitle: "Estudante Avançado",
    xp: 3180,
    xpNext: 4000,
    hoursStudied: 58,
    streak: 21,
    rankPosition: 7,
    achievements: [
      { icon: "⚡", name: "Sequência de 14 Dias", rare: false },
      { icon: "🔥", name: "Sequência de 7 Dias", rare: false },
      { icon: "🎯", name: "Foco Total", rare: false },
    ],
    recentActivity: [
      {
        type: "Feed",
        text: "Pratiquei exercícios de lógica por 40 minutos hoje. Parece pouco, mas faz 21 dias seguidos estudando!",
      },
    ],
  },

  "Ana Beatriz": {
    bio: "Engenharia de Computação · Resiliência e visão de longo prazo",
    isMonitor: false,
    level: 8,
    levelTitle: "Estudante Ninja",
    xp: 3650,
    xpNext: 4500,
    hoursStudied: 89,
    streak: 15,
    rankPosition: 8,
    achievements: [
      { icon: "🌟", name: "Estrela Ascendente", rare: false },
      { icon: "⚡", name: "Sequência de 14 Dias", rare: false },
      { icon: "💪", name: "Persistência", rare: false },
    ],
    recentActivity: [
      {
        type: "Feed",
        text: "Semana pesada de provas, mas consegui manter a sequência de estudos. Às vezes é sobre resistir, não sobre ser perfeito.",
      },
    ],
  },

  "Lucas Mendes": {
    bio: "Sistemas de Informação · Novo no BELUGA e empolgado!",
    isMonitor: false,
    level: 4,
    levelTitle: "Iniciante Animado",
    xp: 820,
    xpNext: 1500,
    hoursStudied: 12,
    streak: 3,
    rankPosition: null,
    achievements: [
      { icon: "✨", name: "Primeiro Acesso", rare: false },
      { icon: "🚀", name: "Primeiros Passos", rare: false },
    ],
    recentActivity: [
      {
        type: "Feed",
        text: "Hoje entrei no Beluga pela primeira vez e já organizei toda minha grade no Plano de Estudos. A plataforma é incrível!",
      },
    ],
  },

  "Isabela Rocha": {
    bio: "Redes de Computadores · Infraestrutura e protocolos de rede",
    isMonitor: false,
    level: 6,
    levelTitle: "Explorador",
    xp: 2650,
    xpNext: 3500,
    hoursStudied: 48,
    streak: 8,
    rankPosition: 11,
    achievements: [
      { icon: "🌐", name: "Explorador Digital", rare: false },
      { icon: "📚", name: "Leitor Assíduo", rare: false },
    ],
    recentActivity: [
      {
        type: "Feed",
        text: "Revisão completa de Redes de Computadores concluída! Protocolo TCP/IP nunca mais vai me dar trabalho.",
      },
    ],
  },

  // ─── Usuários do Fórum ───────────────────────────────────
  "Ana Lima": {
    bio: "Ciência da Computação · Algoritmos e Estruturas de Dados",
    isMonitor: false,
    level: 5,
    levelTitle: "Estudante em Progresso",
    xp: 1800,
    xpNext: 2500,
    hoursStudied: 31,
    streak: 5,
    rankPosition: 14,
    achievements: [
      { icon: "💡", name: "Curiosidade Ativa", rare: false },
      { icon: "🤝", name: "Colaborador", rare: false },
    ],
    recentActivity: [
      {
        type: "Fórum",
        text: "Perguntou: Qual a lógica por trás do algoritmo de busca binária?",
      },
    ],
  },

  "Marcos Vidal": {
    bio: "Engenharia de Computação · Sistemas Operacionais e Concorrência",
    isMonitor: true,
    level: 7,
    levelTitle: "Estudante Avançado",
    xp: 3400,
    xpNext: 4000,
    hoursStudied: 74,
    streak: 10,
    rankPosition: 5,
    achievements: [
      { icon: "🎓", name: "Monitor Aprovado", rare: true },
      { icon: "🔥", name: "Sequência de 7 Dias", rare: false },
      { icon: "🤝", name: "Colaborador", rare: false },
    ],
    recentActivity: [
      {
        type: "Fórum",
        text: "Perguntou: Como os semáforos evitam condições de corrida?",
      },
    ],
  },

  "Rafaela Silva": {
    bio: "Sistemas de Informação · Monitora de Sistemas Operacionais",
    isMonitor: true,
    level: 7,
    levelTitle: "Estudante Avançado",
    xp: 3550,
    xpNext: 4000,
    hoursStudied: 82,
    streak: 13,
    rankPosition: 4,
    achievements: [
      { icon: "🎓", name: "Monitor Aprovado", rare: true },
      { icon: "⚡", name: "Sequência de 14 Dias", rare: false },
      { icon: "🏆", name: "Top 5 Semanal", rare: false },
    ],
    recentActivity: [
      {
        type: "Fórum",
        text: "Respondeu: Como os semáforos evitam condições de corrida? (Pensa no semáforo como uma chave de banheiro: só um entra por vez.)",
      },
    ],
  },

  "Lucas Melo": {
    bio: "Engenharia de Software · Monitor de Cálculo e Algoritmos",
    isMonitor: true,
    level: 8,
    levelTitle: "Estudante Ninja",
    xp: 3900,
    xpNext: 4500,
    hoursStudied: 91,
    streak: 16,
    rankPosition: 3,
    achievements: [
      { icon: "🎓", name: "Monitor Aprovado", rare: true },
      { icon: "💎", name: "Diamante BELUGA", rare: true },
      { icon: "🧠", name: "Neurônio de Ouro", rare: false },
    ],
    recentActivity: [
      {
        type: "Fórum",
        text: "Respondeu: Como interpretar uma derivada em um gráfico?",
      },
    ],
  },

  "Beatriz Santos": {
    bio: "Matemática Computacional · Cálculo Diferencial e Integral",
    isMonitor: false,
    level: 5,
    levelTitle: "Estudante em Progresso",
    xp: 2100,
    xpNext: 2500,
    hoursStudied: 40,
    streak: 7,
    rankPosition: 12,
    achievements: [
      { icon: "🔥", name: "Sequência de 7 Dias", rare: false },
      { icon: "💡", name: "Curiosidade Ativa", rare: false },
    ],
    recentActivity: [
      {
        type: "Fórum",
        text: "Perguntou: Como interpretar uma derivada em um gráfico?",
      },
    ],
  },

  "Caio Fernandes": {
    bio: "Design Digital · UX/UI e Pesquisa com Usuários",
    isMonitor: false,
    level: 5,
    levelTitle: "Estudante em Progresso",
    xp: 1750,
    xpNext: 2500,
    hoursStudied: 27,
    streak: 4,
    rankPosition: 16,
    achievements: [{ icon: "✨", name: "Primeiro Acesso", rare: false }],
    recentActivity: [
      {
        type: "Fórum",
        text: "Perguntou: Qual a diferença entre UX e UI no Design de Interfaces?",
      },
    ],
  },

  "Vitória Rocha": {
    bio: "Ciência da Computação · Banco de Dados e Modelagem de Dados",
    isMonitor: false,
    level: 5,
    levelTitle: "Estudante em Progresso",
    xp: 2050,
    xpNext: 2500,
    hoursStudied: 35,
    streak: 6,
    rankPosition: 13,
    achievements: [
      { icon: "📚", name: "Leitor Assíduo", rare: false },
      { icon: "🤝", name: "Colaborador", rare: false },
    ],
    recentActivity: [
      {
        type: "Fórum",
        text: "Perguntou: Como normalizar uma tabela no banco de dados?",
      },
    ],
  },

  "Jerferson Alves": {
    bio: "Banco de Dados · Modelagem e Engenharia de Dados",
    isMonitor: false,
    level: 4,
    levelTitle: "Iniciante Animado",
    xp: 1200,
    xpNext: 1500,
    hoursStudied: 22,
    streak: 4,
    rankPosition: 18,
    achievements: [{ icon: "🚀", name: "Primeiros Passos", rare: false }],
    recentActivity: [
      {
        type: "Fórum",
        text: "Perguntou: Quando usar chave composta em vez de chave primária simples?",
      },
    ],
  },
};

// ─── Helpers internos ─────────────────────────────────────
function getProfile(author) {
  const db = PROFILES[author.name];
  if (db)
    return {
      ...db,
      name: author.name,
      initials: author.initials,
      color: author.color,
    };
  return {
    name: author.name,
    initials: author.initials,
    color: author.color,
    bio: "Estudante BELUGA",
    isMonitor: false,
    level: 1,
    levelTitle: "Iniciante",
    xp: 0,
    xpNext: 500,
    hoursStudied: 0,
    streak: 0,
    rankPosition: null,
    achievements: [],
    recentActivity: [],
  };
}

function badgeItem(a) {
  return `<div class="up-badge${a.rare ? " up-badge--rare" : ""}" data-tip="${a.name}" title="${a.name}">${a.icon}</div>`;
}

function activityItem(a) {
  const tagClass = a.type === "Feed" ? "up-tag--feed" : "up-tag--forum";
  return `
    <div class="up-activity-item">
      <span class="up-activity-tag ${tagClass}">${a.type}</span>
      <p class="up-activity-text">${a.text}</p>
    </div>`;
}

function buildContent(profile) {
  const xpPct = Math.min(100, Math.round((profile.xp / profile.xpNext) * 100));

  const badgesHTML = profile.achievements.length
    ? profile.achievements.map(badgeItem).join("")
    : `<p class="up-empty">Nenhuma conquista ainda.</p>`;

  const activitiesHTML = profile.recentActivity.length
    ? profile.recentActivity.map(activityItem).join("")
    : `<p class="up-empty">Sem atividade recente.</p>`;

  return `
    <div class="up-header">
      <div class="up-avatar" style="background:${profile.color}1a;border:3px solid ${profile.color}66;color:${profile.color}">
        ${profile.initials}
      </div>
      <div class="up-header-info">
        <div class="up-name-row">
          <h2 class="up-name" id="up-modal-name">${profile.name}</h2>
          ${profile.isMonitor ? `<span class="up-monitor-badge">Monitor</span>` : ""}
        </div>
        <p class="up-bio">${profile.bio}</p>
      </div>
    </div>

    <div class="up-section up-section--stats">
      <div class="up-xp-row">
        <span class="up-level-label">Nível ${profile.level} — ${profile.levelTitle}</span>
        <span class="up-xp-nums">${profile.xp.toLocaleString("pt-BR")} / ${profile.xpNext.toLocaleString("pt-BR")} XP</span>
      </div>
      <div class="up-xp-bar">
        <div class="up-xp-fill" data-width="${xpPct}" style="width:0%"></div>
      </div>
      <div class="up-stats-grid">
        <div class="up-stat">
          <span class="up-stat-val">${profile.hoursStudied}h</span>
          <span class="up-stat-key">estudadas</span>
        </div>
        <div class="up-stat">
          <span class="up-stat-val">🔥 ${profile.streak}</span>
          <span class="up-stat-key">dias seguidos</span>
        </div>
        <div class="up-stat">
          <span class="up-stat-val">${profile.rankPosition ? "#" + profile.rankPosition : "—"}</span>
          <span class="up-stat-key">no ranking</span>
        </div>
      </div>
    </div>

    <div class="up-section">
      <h3 class="up-section-title">Conquistas</h3>
      <div class="up-badges-grid">${badgesHTML}</div>
    </div>

    <div class="up-section">
      <h3 class="up-section-title">Atividade Recente</h3>
      <div class="up-activity-list">${activitiesHTML}</div>
    </div>`;
}

function _close() {
  const overlay = document.getElementById("up-modal-overlay");
  if (!overlay) return;
  overlay.classList.remove("up-overlay--open");
  document.body.style.overflow = "";
}

// ─── API pública ──────────────────────────────────────────
export function openUserProfileModal(author) {
  const overlay = document.getElementById("up-modal-overlay");
  if (!overlay) return;

  const body = overlay.querySelector(".up-modal-body");
  const profile = getProfile(author);
  body.innerHTML = buildContent(profile);

  overlay.classList.add("up-overlay--open");
  document.body.style.overflow = "hidden";

  // Anima a barra de XP após a transição de abertura do modal
  const fill = body.querySelector(".up-xp-fill");
  if (fill) {
    const target = fill.dataset.width + "%";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.width = target;
      });
    });
  }
}

// Idempotente — cria o overlay UMA vez e registra listeners globais.
// Chamar em feedInit() e forumInit() sem preocupação de duplicar.
export function initUserProfileModal() {
  if (document.getElementById("up-modal-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "up-modal-overlay";
  overlay.className = "up-overlay";
  overlay.innerHTML = `
    <div class="up-modal" role="dialog" aria-modal="true" aria-labelledby="up-modal-name">
      <button class="up-close" aria-label="Fechar perfil">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
             width="16" height="16">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <div class="up-modal-body"></div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector(".up-close").addEventListener("click", _close);

  // Fecha ao clicar no backdrop (fora do modal)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) _close();
  });

  // Fecha com Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") _close();
  });

  // Delegação global — captura cliques em qualquer [data-profile-trigger]
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-profile-trigger]");
    if (!trigger) return;
    openUserProfileModal({
      name: trigger.dataset.userName,
      initials: trigger.dataset.userInitials,
      color: trigger.dataset.userColor,
    });
  });
}
