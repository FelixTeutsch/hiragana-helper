const THEME_KEY = 'theme';

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

export function clearAllData() {
  localStorage.clear();
}

export function renderSettings(container) {
  const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
  container.innerHTML = `
    <div class="flex flex-col items-start justify-center gap-4 w-xs">
      <h2 class="text-xl font-bold mb-4 w-xs">Settings</h2>
      <select class="select select-neutral" onChange="setTheme(this.value)">
        <option disabled>Pick a color</option>
        <option value="light" ${currentTheme === 'light' ? 'selected' : ''}>Light</option>
        <option value="dark" ${currentTheme === 'dark' ? 'selected' : ''}>Dark</option>
        <option value="cupcake" ${currentTheme === 'cupcake' ? 'selected' : ''}>Cupcake</option>
        <option value="valentine" ${currentTheme === 'valentine' ? 'selected' : ''}>Valentine</option>
        <option value="lemonade" ${currentTheme === 'lemonade' ? 'selected' : ''}>Lemonade</option>
      </select>
      <div class="form-control mt-4">
        <button id="clearDataBtn" class="btn btn-error">
          <span class="material-symbols-outlined mr-2">delete</span> Clear All Data
        </button>
      </div>
    </div>
  `;

  document.getElementById('clearDataBtn').onclick = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };
} 