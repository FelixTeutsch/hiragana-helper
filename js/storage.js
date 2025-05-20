// Local storage helpers for mistakes and stats
const MISTAKES_KEY = 'hiragana_mistakes';
const STATS_KEY = 'hiragana_stats';

export function getMistakes() {
  return JSON.parse(localStorage.getItem(MISTAKES_KEY) || '{}');
}

export function saveMistake(char, romaji) {
  const mistakes = getMistakes();
  const key = `${char}|${romaji}`;
  mistakes[key] = (mistakes[key] || 0) + 1;
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
}

export function getStats() {
  return JSON.parse(localStorage.getItem(STATS_KEY) || '[]');
}

export function saveStats(sessionStats) {
  const stats = getStats();
  stats.push(sessionStats);
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function incrementMistakeCount(char, romaji) {
  saveMistake(char, romaji);
} 