<div align="center">

<img src="assets/images/BELUGA.png" alt="BELUGA Logo" width="120" />

# BELUGA

**Plataforma acadêmica inteligente para organização de estudos, acompanhamento de desempenho e engajamento universitário.**

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue?style=flat-square)](https://github.com/jimmyguus/beluga)
[![Tech](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JavaScript-yellow?style=flat-square)](#-tecnologias-utilizadas)
[![Arquitetura](https://img.shields.io/badge/arquitetura-SPA-blueviolet?style=flat-square)](#-arquitetura)
[![Licença](https://img.shields.io/badge/licença-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📌 Sobre o Projeto

O **BELUGA** é uma plataforma educacional desenvolvida como **Single Page Application (SPA)**, projetada para ser o ambiente central da vida acadêmica do estudante universitário.

O sistema integra em uma única experiência: organização de estudos, quizzes interativos, feed acadêmico, fórum de dúvidas, gamificação e um assistente inteligente — a **Beluginha IA** — preparada para receber integração com modelos de linguagem em versões futuras.

> O front-end está **completamente funcional**, com arquitetura organizada e preparada para integração com backend, autenticação real e IA.

---

## 🎯 Visão do Projeto

O BELUGA nasceu da necessidade real que estudantes têm de centralizar e organizar sua rotina acadêmica, sem depender de múltiplos aplicativos fragmentados.

| Objetivo                 | Descrição                                                      |
| ------------------------ | -------------------------------------------------------------- |
| 📚 Organização acadêmica | Planos de estudo, matriz curricular e progresso por disciplina |
| 🧠 Reforço de conteúdo   | Quizzes, biblioteca e aulas integradas                         |
| 🤝 Comunidade            | Feed acadêmico e fórum de discussão                            |
| 🏆 Engajamento           | Sistema de gamificação com XP, níveis e conquistas             |
| 🤖 IA acadêmica          | Assistente Beluginha preparada para recomendações inteligentes |
| 📈 Produtividade         | Notificações, lembretes e acompanhamento de metas              |

---

## 🚀 Funcionalidades

### 🔐 Autenticação

- Tela de **Landing** com apresentação da plataforma e screenshots reais das funcionalidades
- **Login** com validação e controle de sessão via `localStorage`
- **Cadastro** com formulário completo e feedback visual
- Proteção de rotas: páginas privadas bloqueadas sem autenticação

### 📊 Dashboard

- Visão geral das disciplinas e progresso por matéria
- Gráfico de desempenho com **Chart.js**
- Acesso rápido a todas as funcionalidades da plataforma
- Cards com resumo de atividades recentes

### 🗓️ Plano de Estudos

- Criação e gerenciamento de planos de estudo personalizados
- Organização por disciplinas e prazos
- Acompanhamento de metas semanais

### 🗂️ Matriz Curricular

- Visualização estruturada da grade de disciplinas
- Indicadores de status por matéria (cursando, concluída, pendente)

### 🎯 Quiz

- Questões interativas por tema
- Feedback imediato por resposta
- Histórico de desempenho

### 🎓 Aulas

- Acesso ao acervo de conteúdos por disciplina
- Organização por módulos e videoaulas

### 📚 Biblioteca

- Repositório de materiais de estudo
- Filtros por categoria e disciplina

### 📰 Feed Acadêmico

- Timeline com publicações da comunidade estudantil
- Interação com posts, comentários e reações

### 💬 Fórum

- Espaço para dúvidas e discussões acadêmicas
- Organização por tópicos e disciplinas

### 🏆 Conquistas & Gamificação

- Sistema de **XP e níveis** (ex.: "Estudante Ninja")
- Badges desbloqueáveis por desempenho
- Missões diárias e semanais
- Ranking e progresso visual

### 🔔 Notificações

- Central de alertas e lembretes acadêmicos
- Notificações inteligentes baseadas no progresso

### 👤 Perfil Acadêmico

- Dados do estudante, histórico e estatísticas
- Personalização da conta

### 🤖 Beluginha IA

- Assistente acadêmica flutuante disponível em todas as telas privadas
- Interface de chat com respostas contextuais
- Atualmente com respostas simuladas (mock)
- **Arquitetura pronta para integração com OpenAI/API externa**

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia          | Uso                                                              |
| ------------------- | ---------------------------------------------------------------- |
| **HTML5**           | Estrutura semântica da aplicação                                 |
| **CSS3**            | Estilização modular por telas, animações e responsividade        |
| **JavaScript ES6+** | Lógica da SPA, manipulação de DOM, roteamento e estado           |
| **Chart.js**        | Gráficos de desempenho no Dashboard                              |
| **LocalStorage**    | Persistência de sessão e dados do usuário                        |
| **Hash Routing**    | Navegação entre telas sem recarregar a página                    |
| _API / OpenAI_      | _(planejado)_ Integração futura com Beluginha IA                 |
| _Backend / Node.js_ | _(planejado)_ Autenticação real e persistência em banco de dados |

---

## 📁 Estrutura do Projeto

```
beluga/
│
├── index.html                      # Entry point da SPA
│
├── docs/                           # Documentação detalhada por tela
│   ├── landing.md
│   ├── login.md
│   ├── cadastro.md
│   ├── dashboard.md
│   ├── plano.md
│   ├── quiz.md
│   ├── aulas.md
│   ├── biblioteca.md
│   ├── feed.md
│   ├── forum.md
│   ├── conquistas.md
│   ├── notificacoes.md
│   ├── perfil.md
│   ├── matriz.md
│   └── beluginha.md
│
└── assets/
    ├── css/
    │   ├── main.css                # Ponto de entrada — importa todos os módulos CSS
    │   ├── base/                   # Tokens globais, reset e tipografia
    │   │   ├── variables.css
    │   │   ├── reset.css
    │   │   └── global.css
    │   ├── layout/                 # Estrutura de página e topbar
    │   │   ├── page-layout.css
    │   │   └── topbar.css
    │   ├── components/             # Componentes reutilizáveis
    │   │   ├── buttons.css
    │   │   ├── cards.css
    │   │   ├── forms.css
    │   │   ├── modals.css
    │   │   ├── beluginha-ia.css
    │   │   └── user-profile-modal.css
    │   └── pages/                  # Estilos isolados por tela
    │       ├── landing.css
    │       ├── login.css
    │       ├── cadastro.css
    │       ├── dashboard.css
    │       ├── plano.css
    │       ├── quiz.css
    │       ├── aulas.css
    │       ├── biblioteca.css
    │       ├── feed.css
    │       ├── forum.css
    │       ├── conquistas.css
    │       ├── notificacoes.css
    │       ├── perfil.css
    │       └── matriz.css
    │
    ├── js/
    │   ├── app.js                  # Inicialização e registro de rotas
    │   ├── router.js               # Roteador hash com proteção de rotas
    │   ├── state/
    │   │   ├── auth.js             # Controle de sessão e autenticação
    │   │   └── matriz.js           # Estado da matriz curricular
    │   ├── components/
    │   │   ├── modal.js            # Componente modal reutilizável
    │   │   └── userProfileModal.js # Modal de perfil do usuário
    │   └── screens/                # Módulos de cada tela (render + init)
    │       ├── landing.js
    │       ├── login.js
    │       ├── cadastro.js
    │       ├── dashboard.js
    │       ├── planoEstudo.js
    │       ├── quiz.js
    │       ├── aulas.js
    │       ├── biblioteca.js
    │       ├── feed.js
    │       ├── forum.js
    │       ├── conquistas.js
    │       ├── notificacoes.js
    │       ├── perfil.js
    │       ├── matriz.js
    │       └── beluginha.js        # Assistente IA flutuante
    │
    └── images/                     # Assets visuais do projeto
        ├── BELUGA.png              # Mascote principal
        ├── logof.png               # Logotipo
        ├── Dashboard.png           # Screenshot do Dashboard (preview na landing)
        ├── Beluguin-IA.png         # Screenshot da Beluginha IA (preview na landing)
        └── Quiz.png                # Screenshot do Quiz (preview na landing)
```

---

## 🏗️ Arquitetura

O BELUGA implementa uma **SPA com roteamento próprio** sem uso de frameworks externos:

- **`router.js`** — gerencia rotas via hash (`#/dashboard`), injeta/remove topbar e Beluginha conforme o contexto (público ou privado), e bloqueia rotas sem autenticação
- **Padrão render/init** — cada tela exporta `render()` (retorna HTML) e `init()` (registra eventos), separando estrutura de comportamento
- **State management simples** — autenticação centralizada em `state/auth.js` via `localStorage`
- **CSS modular por camada** — base, layout, components e pages em pastas separadas, evitando conflitos e facilitando manutenção
- **Documentação por tela** — cada tela possui um arquivo `.md` em `docs/` com estrutura HTML, classes CSS, eventos JS e guias de modificação

---

## 🎨 Design e Experiência

- **Dark mode nativo** — paleta escura com acentos em azul, pensada para longas sessões de estudo
- **Identidade visual própria** — logo, mascote Beluginha e elementos visuais exclusivos
- **UX acadêmica** — fluxos pensados para o estudante universitário, com navegação intuitiva
- **Gamificação visual** — barras de XP, badges, níveis e missões que tornam o estudo mais engajante
- **Topbar inteligente** — exibida apenas em páginas privadas, com navegação ativa e logout
- **Elementos animados** — transições suaves, animação flutuante do mascote e feedback visual nas interações
- **Preview com screenshots reais** — a landing exibe capturas reais das telas Dashboard, Beluginha IA e Quiz dentro de janelas estilizadas

---

## 🤖 Beluginha IA

A **Beluginha IA** é a assistente acadêmica inteligente do BELUGA, disponível como um botão flutuante (FAB) em todas as telas privadas da plataforma.

**Estado atual:** interface funcional com respostas contextuais simuladas (mock), projetada para simular uma experiência real de assistente IA.

**Exemplos de respostas atuais:**

> _"Vi que você tem uma entrega chegando. Quer transformar isso em uma sessão no seu plano de estudos?"_
> _"Seu desempenho em quizzes melhorou esta semana. Continue nesse ritmo!"_

**Integração futura planejada:**

- Conexão com **OpenAI API** (GPT-4 / assistants)
- Recomendações personalizadas com base no histórico acadêmico
- Geração automática de quizzes e resumos
- Análise de desempenho e sugestões proativas

---

## 🔮 Futuras Implementações

| Funcionalidade           | Descrição                                                  |
| ------------------------ | ---------------------------------------------------------- |
| 🔒 Autenticação real     | Login com JWT, OAuth (Google) e recuperação de senha       |
| 🗄️ Backend               | API REST (Node.js / Express) com banco de dados relacional |
| 🤖 Integração OpenAI     | Beluginha IA com LLM real e contexto personalizado         |
| 📊 Analytics acadêmico   | Relatórios de desempenho, tendências e previsões           |
| 🎮 Quizzes dinâmicos     | Geração automática de questões com IA                      |
| 🏅 Ranking em tempo real | Competição saudável entre estudantes                       |
| 📱 App mobile            | Versão React Native ou PWA                                 |
| 👨‍🏫 Sistema de monitoria  | Conexão entre alunos e monitores                           |
| 🔔 Notificações push     | Alertas em tempo real via WebSocket                        |
| 🌐 Migração para React   | Componentização e escalabilidade com React + TypeScript    |

---

## 📱 Responsividade

O BELUGA foi desenvolvido com foco em **desktop**, com elementos visuais adaptados para diferentes tamanhos de tela. A responsividade completa para dispositivos móveis está prevista nas próximas iterações do projeto.

---

## ⚙️ Como Executar

**Pré-requisito:** [VS Code](https://code.visualstudio.com/) com a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) instalada.

```bash
# 1. Clone o repositório
git clone https://github.com/jimmyguus/beluga.git

# 2. Acesse a pasta do projeto
cd beluga

# 3. Abra no VS Code
code .
```

Em seguida, clique com o botão direito no `index.html` e selecione **"Open with Live Server"**.

> O projeto utiliza ES Modules (`import/export`), portanto **não funciona abrindo o `index.html` diretamente** no navegador — é necessário um servidor local.

---

## 📈 Status do Projeto

```
🟢 Front-end funcional — todas as telas implementadas e navegáveis
🟢 Documentação — cada tela possui doc detalhada em docs/
🟡 Backend / API — planejado para próximas versões
🟡 Beluginha IA real — integração OpenAI planejada
🔵 Em desenvolvimento ativo
```

---

## 👨‍💻 Autor

Desenvolvido por **Gustavo Lima**

[![GitHub](https://img.shields.io/badge/GitHub-jimmyguus-181717?style=flat-square&logo=github)](https://github.com/jimmyguus)

---

## 📄 Licença

Este projeto está sob a licença **MIT**.
