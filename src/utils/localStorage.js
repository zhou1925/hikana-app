const PROGRESS_KEY = 'hiragana_practice_progress';
const SRS_KEY = 'hiragana_practice_srs';

export function saveProgress(character, similarity) {
  let progress = getProgress();
  progress[character] = progress[character] || [];
  progress[character].push(similarity);
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  updateSRS(character, similarity);
}

export function getProgress() {
  const progressString = localStorage.getItem(PROGRESS_KEY);
  return progressString ? JSON.parse(progressString) : {};
}

export function getAverageProgress(character) {
  const progress = getProgress();
  if (!progress[character] || progress[character].length === 0) {
    return 0;
  }
  const sum = progress[character].reduce((a, b) => a + b, 0);
  return sum / progress[character].length;
}

export function getAllProgress() {
  const progress = getProgress();
  return Object.keys(progress).map(char => ({
    character: char,
    average: getAverageProgress(char)
  }));
}

function updateSRS(character, similarity) {
  let srs = getSRS();
  if (!srs[character]) {
    srs[character] = { level: 0, nextReview: Date.now() };
  }
  
  if (similarity > 0.6) {
    srs[character].level = Math.min(srs[character].level + 1, 5);
  } else {
    srs[character].level = Math.max(srs[character].level - 1, 0);
  }
  
  const intervals = [1, 3, 7, 14, 30, 90]; // Intervals
  const nextReview = Date.now() + intervals[srs[character].level] * 24 * 60 * 60 * 1000;
  srs[character].nextReview = nextReview;
  
  localStorage.setItem(SRS_KEY, JSON.stringify(srs));
}

export function getSRS() {
  const srsString = localStorage.getItem(SRS_KEY);
  return srsString ? JSON.parse(srsString) : {};
}

export function getNextSRSCharacter() {
  const srs = getSRS();
  const now = Date.now();
  const dueCharacters = Object.entries(srs)
    .filter(([_, data]) => data.nextReview <= now)
    .sort((a, b) => a[1].nextReview - b[1].nextReview);
  
  return dueCharacters.length > 0 ? dueCharacters[0][0] : null;
}

export function cleanProgress() {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(SRS_KEY);
}