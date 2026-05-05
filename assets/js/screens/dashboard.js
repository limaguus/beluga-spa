export function dashboardScreen() {
  return `
  <main class="dashboard">

    <h1 class="dashboard-title">
      Bem-vindo de volta, Jimmy!
    </h1>

    <h2 class="dashboard-subtitle">
      Suas matérias nesse semestre:
    </h2>

    <section class="subjects">

      <div class="subject-card">
        <h3>Estrutura de Dados</h3>
        <div class="progress">31%</div>
      </div>

      <div class="subject-card">
        <h3>Sistemas Distribuídos</h3>
        <div class="progress">50%</div>
      </div>

      <div class="subject-card">
        <h3>S G B D</h3>
        <div class="progress">60%</div>
      </div>

      <div class="subject-card highlight">
        <h3>Algoritmos</h3>
        <div class="progress">30%</div>
      </div>

      <div class="subject-card">
        <h3>P O O </h3>
        <div class="progress">45%</div>
      </div>

      <div class="subject-card">
        <h3>Probabilidade</h3>
        <div class="progress">90%</div>
      </div>

    </section>

    <section class="chart-area">
      <canvas id="dashboard-chart"></canvas>
    </section>

    <section class="dashboard-actions">

      <div class="action-card">Cadastro de Matriz</div>
      <div class="action-card">Quiz Diagnóstico</div>
      <div class="action-card">Plano de Estudos</div>
      <div class="action-card">Beluga Feed</div>
      <div class="action-card">Fórum comunidade</div>
      <div class="action-card">Notificações</div>
      <div class="action-card">Minhas aulas</div>
      <div class="action-card">Conquistas</div>

    </section>

  </main>
  `;
}

export function dashboardInit() {
  const ctx = document.getElementById("dashboard-chart");

  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Estrura de dados",
        "Sistemas Distribuídos",
        "SGBD",
        "Algoritmos",
        "POO",
        "Probabilidade",
      ],
      datasets: [
        {
          label: "Progresso",
          data: [30, 65, 48, 60, 35, 90],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
    },
  });
}
