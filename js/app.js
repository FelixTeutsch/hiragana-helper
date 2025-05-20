import { renderDashboard } from './dashboard.js';
import { renderSession } from './session.js';
import { loadTheme } from './settings.js';

function renderDashboardView() {
  renderDashboard(app);
}

function renderSessionView(mode = 'all') {
  renderSession(app, mode);
}

window.renderDashboardView = renderDashboardView;
window.renderSessionView = renderSessionView;

document.addEventListener('DOMContentLoaded', () => {
  // Load saved theme
  const theme = loadTheme();
  document.documentElement.setAttribute('data-theme', theme);
  // Load Chart.js from CDN
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = () => renderDashboardView();
  document.body.appendChild(script);
}); 