import { hiraganaCharacters } from './hiragana-data.js';
import { saveMistake, saveStats, getMistakes } from './storage.js';

export function renderSession(container, mode = 'all') {
  let chars = mode === 'all' ? [...hiraganaCharacters] : getMistakeChars();
  shuffle(chars);
  let current = 0;
  let mistakes = 0;
  let sessionMistakes = [];
  let showHint = false;

  function render() {
    if (current >= chars.length) {
      const errorRate = chars.length ? Math.round((mistakes / chars.length) * 100) : 0;
      saveStats({ date: new Date().toISOString(), errorRate });
      container.innerHTML = `
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-4 text-success">Session Complete!</h2>
          <p class="mb-2">You made <span class="font-bold">${mistakes}</span> mistake(s).</p>
          <p class="mb-4">Error rate: <span class="font-bold">${errorRate}%</span></p>
          <button class="btn btn-primary playful-btn w-full" id="backToDashboard">
            <span class="material-symbols-outlined mr-2">home</span> Back to Dashboard
          </button>
        </div>
      `;
      document.getElementById('backToDashboard').onclick = () => window.renderDashboardView();
      return;
    }
    const { char, romaji, hint } = chars[current];
    container.innerHTML = `
      <div class="flex flex-col items-center">
        <div class="hiragana-char mb-2">${char}</div>
        <div class="mb-4 w-full max-w-xs">
          <input id="answerInput" type="text" class="input input-bordered input-lg w-full text-center text-xl" placeholder="Type the romaji..." autofocus>
        </div>
        <div class="flex flex-col gap-2 mb-4 w-full max-w-xs">
          <button class="btn btn-primary playful-btn w-full" id="checkBtn">
            <span class="material-symbols-outlined mr-2">check</span> Check
          </button>
          <button class="btn btn-secondary playful-btn w-full" id="dontKnowBtn">
            <span class="material-symbols-outlined mr-2">help</span> I don't know
          </button>
        </div>
        <div id="hintBox" class="mb-2 text-info text-lg" style="display:${showHint ? 'block' : 'none'};">Hint: ${hint}</div>
        <div id="feedbackBox" class="mb-2 text-lg"></div>
        <div class="text-base-content/60 mt-4">${current + 1} / ${chars.length}</div>
      </div>
    `;
    document.getElementById('checkBtn').onclick = checkAnswer;
    document.getElementById('dontKnowBtn').onclick = showTheHint;
    document.getElementById('answerInput').onkeydown = e => { if (e.key === 'Enter') checkAnswer(); };
    if (showHint) document.getElementById('hintBox').style.display = 'block';
    setTimeout(() => document.getElementById('answerInput').focus(), 0);
  }

  function checkAnswer() {
    const input = document.getElementById('answerInput').value.trim().toLowerCase();
    const { char, romaji } = chars[current];
    if (input === romaji) {
      document.getElementById('feedbackBox').textContent = '✅ Correct!';
      setTimeout(() => { current++; showHint = false; render(); }, 700);
    } else {
      document.getElementById('feedbackBox').textContent = `❌ Wrong! Correct: ${romaji}`;
      mistakes++;
      sessionMistakes.push({ char, romaji });
      saveMistake(char, romaji);
      setTimeout(() => { current++; showHint = false; render(); }, 1200);
    }
  }

  function showTheHint() {
    showHint = true;
    document.getElementById('hintBox').style.display = 'block';
  }

  render();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function getMistakeChars() {
  const mistakes = getMistakes();
  return Object.keys(mistakes).map(key => {
    const [char, romaji] = key.split('|');
    // Find hint from hiraganaCharacters
    const found = hiraganaCharacters.find(h => h.char === char && h.romaji === romaji);
    return found || { char, romaji, hint: '' };
  });
} 