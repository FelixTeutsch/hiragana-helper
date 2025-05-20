const THEME_KEY = 'hiragana_theme';

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
  container.innerHTML = `
    <h3 class="text-lg font-bold mb-4">Settings</h3>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Theme</span>
      </label>
      <select id="themeSelect" class="select select-bordered">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="cupcake">Cupcake</option>
        <option value="bumblebee">Bumblebee</option>
        <option value="emerald">Emerald</option>
        <option value="corporate">Corporate</option>
        <option value="synthwave">Synthwave</option>
        <option value="retro">Retro</option>
        <option value="cyberpunk">Cyberpunk</option>
        <option value="valentine">Valentine</option>
        <option value="halloween">Halloween</option>
        <option value="garden">Garden</option>
        <option value="forest">Forest</option>
        <option value="aqua">Aqua</option>
        <option value="pastel">Pastel</option>
        <option value="fantasy">Fantasy</option>
        <option value="wireframe">Wireframe</option>
        <option value="black">Black</option>
        <option value="luxury">Luxury</option>
        <option value="dracula">Dracula</option>
        <option value="cmyk">CMYK</option>
        <option value="autumn">Autumn</option>
        <option value="business">Business</option>
        <option value="acid">Acid</option>
        <option value="lemonade">Lemonade</option>
        <option value="night">Night</option>
        <option value="coffee">Coffee</option>
        <option value="winter">Winter</option>
      </select>
    </div>
    <div class="form-control mt-4">
      <button id="clearDataBtn" class="btn btn-error">Clear All Data</button>
    </div>
  `;

  const themeSelect = document.getElementById('themeSelect');
  themeSelect.value = document.documentElement.getAttribute('data-theme') || 'light';
  themeSelect.onchange = () => {
    document.documentElement.setAttribute('data-theme', themeSelect.value);
    localStorage.setItem('theme', themeSelect.value);
  };

  document.getElementById('clearDataBtn').onclick = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };
} 