const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const answerStage = document.getElementById('answerStage');
const hintText = document.getElementById('hintText');
const questionCard = document.getElementById('questionCard');
const celebration = document.getElementById('celebration');

const maxDodges = 10;
let dodgeCount = 0;
let canClickYes = false;
let lastPosition = null;

function moveYesButton() {
    const birthdayMelody = [
  ['G4', 0.35], ['G4', 0.35], ['A4', 0.7], ['G4', 0.7], ['C5', 0.7], ['B4', 1.2],
  ['G4', 0.35], ['G4', 0.35], ['A4', 0.7], ['G4', 0.7], ['D5', 0.7], ['C5', 1.2],
  ['G4', 0.35], ['G4', 0.35], ['G5', 0.7], ['E5', 0.7], ['C5', 0.7], ['B4', 0.7], ['A4', 1.2],
  ['F5', 0.35], ['F5', 0.35], ['E5', 0.7], ['C5', 0.7], ['D5', 0.7], ['C5', 1.4],
];

const noteFrequencies = {
  G4: 392,
  A4: 440,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
};

let audioContext;

function playBirthdaySong() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    musicStatus.textContent = 'Your browser could not play the song, but imagine the sweetest Happy Birthday tune 🎶';
    return;
  }

  audioContext = audioContext || new AudioContext();
  const startTime = audioContext.currentTime + 0.08;
  let songTime = startTime;

  birthdayMelody.forEach(([note, duration]) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(noteFrequencies[note], songTime);
    gain.gain.setValueAtTime(0.0001, songTime);
    gain.gain.exponentialRampToValueAtTime(0.2, songTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, songTime + duration - 0.04);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(songTime);
    oscillator.stop(songTime + duration);

    songTime += duration;
  });

  musicStatus.textContent = 'Playing Happy Birthday for you 🎶';
}
  if (canClickYes) return;


  dodgeCount += 1;
  const stageRect = answerStage.getBoundingClientRect();
  const buttonRect = yesButton.getBoundingClientRect();
  const maxLeft = Math.max(stageRect.width - buttonRect.width, 0);
  const maxTop = Math.max(stageRect.height - buttonRect.height, 0);

  const minimumTravel = Math.min(180, Math.max(stageRect.width, stageRect.height) * 0.35);
  let nextLeft = 0;
  let nextTop = 0;

  for (let attempt = 0; attempt < 20; attempt += 1) {
    nextLeft = Math.floor(Math.random() * maxLeft);
    nextTop = Math.floor(Math.random() * maxTop);

    if (!lastPosition) break;

    const travelDistance = Math.hypot(nextLeft - lastPosition.left, nextTop - lastPosition.top);
    if (travelDistance >= minimumTravel) break;
  }

  yesButton.style.left = `${nextLeft}px`;
  yesButton.style.top = `${nextTop}px`;
  lastPosition = { left: nextLeft, top: nextTop };
  hintText.textContent = `Almost! Catch it ${Math.max(maxDodges - dodgeCount, 0)} more time${maxDodges - dodgeCount === 1 ? '' : 's'} 💕`;

  if (dodgeCount >= maxDodges) {
    canClickYes = true;
    yesButton.classList.add('caught');
    yesButton.style.left = 'calc(50% - 68px)';
    yesButton.style.top = '44px';
    hintText.textContent = 'Okay okay, you can click Yes now! 🎂';
  }
}

function showCelebration() {
  if (!canClickYes) {
    moveYesButton();
    return;
    function showCelebration() {
  if (!canClickYes) {
    moveYesButton();
    return;
  }

  document.body.classList.add('birthday-unlocked');
  questionCard.classList.add('hidden');
  celebration.classList.remove('hidden');
  playBirthdaySong();
  }

  document.body.classList.add('birthday-unlocked');
  questionCard.classList.add('hidden');
  celebration.classList.remove('hidden');
}

yesButton.addEventListener('pointerenter', moveYesButton);
yesButton.addEventListener('focus', moveYesButton);
yesButton.addEventListener('click', showCelebration);

noButton.addEventListener('click', () => {
  hintText.textContent = 'Hmm... the confetti says you should try Yes instead 🎉';
});
