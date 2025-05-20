import { getMistakes, getStats } from './storage.js';
import { renderSettings } from './settings.js';

export function renderDashboard(container) {
  container.innerHTML = `
    <div class="mb-4 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-primary">Hiragana Helper Dashboard</h1>
      <button id="settingsBtn" class="btn btn-ghost btn-circle">
        <span class="material-symbols-outlined">settings</span>
      </button>
    </div>
    <p class="text-lg text-base-content/70 mb-4">Track your progress and see where you can improve!</p>
    <div class="grid grid-cols-1 gap-4">
      <div>
        <div class="card bg-base-100 shadow-xl mb-4">
          <div class="card-body">
            <h2 class="card-title">Mistake Overview</h2>
            <canvas id="mistakeChart" class="stats-graph"></canvas>
          </div>
        </div>
      </div>
      <div>
        <div class="card bg-base-100 shadow-xl mb-4">
          <div class="card-body">
            <h2 class="card-title">Session Statistics</h2>
            <canvas id="sessionChart" class="stats-graph"></canvas>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-4">
      <button id="startSessionBtn" class="btn btn-primary playful-btn w-full">
        <span class="material-symbols-outlined mr-2">play_arrow</span> Start New Session
      </button>
      <button id="startMistakeSessionBtn" class="btn btn-accent playful-btn w-full">
        <span class="material-symbols-outlined mr-2">error</span> Practice Mistakes
      </button>
    </div>
    <dialog id="settingsModal" class="modal">
      <div class="modal-box">
        <div id="settingsContainer"></div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  `;
  renderMistakeChart();
  renderSessionChart();
  document.getElementById('startSessionBtn').onclick = () => window.renderSessionView('all');
  document.getElementById('startMistakeSessionBtn').onclick = () => window.renderSessionView('mistakes');
  document.getElementById('settingsBtn').onclick = () => {
    const modal = document.getElementById('settingsModal');
    const settingsContainer = document.getElementById('settingsContainer');
    renderSettings(settingsContainer);
    modal.showModal();
  };
}

function renderMistakeChart() {
  const mistakes = getMistakes();
  const labels = Object.keys(mistakes).map(k => k.split('|')[0]);
  const data = Object.values(mistakes);
  if (window.mistakeChart && window.mistakeChart instanceof Chart) {
    window.mistakeChart.destroy();
  }
  const ctx = document.getElementById('mistakeChart').getContext('2d');
  window.mistakeChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Mistakes',
        data,
        backgroundColor: '#f472b6',
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function renderSessionChart() {
  const stats = getStats();
  const labels = stats.map((s, i) => `Session ${i + 1}`);
  const errorRates = stats.map(s => s.errorRate);
  if (window.sessionChart && window.sessionChart instanceof Chart) {
    window.sessionChart.destroy();
  }
  const ctx = document.getElementById('sessionChart').getContext('2d');
  window.sessionChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Error Rate (%)',
        data: errorRates,
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96,165,250,0.2)',
        fill: true,
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });
} 