const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const answerStage = document.getElementById('answerStage');
const hintText = document.getElementById('hintText');
const questionCard = document.getElementById('questionCard');
const celebration = document.getElementById('celebration');

const maxDodges = 4;
let dodgeCount = 0;
let canClickYes = false;

function moveYesButton() {
  if (canClickYes) return;

  dodgeCount += 1;
  const stageRect = answerStage.getBoundingClientRect();
  const buttonRect = yesButton.getBoundingClientRect();
  const maxLeft = Math.max(stageRect.width - buttonRect.width, 0);
  const maxTop = Math.max(stageRect.height - buttonRect.height, 0);

  const nextLeft = Math.floor(Math.random() * maxLeft);
  const nextTop = Math.floor(Math.random() * maxTop);

  yesButton.style.left = `${nextLeft}px`;
  yesButton.style.top = `${nextTop}px`;
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
  }

  questionCard.classList.add('hidden');
  celebration.classList.remove('hidden');
}

yesButton.addEventListener('pointerenter', moveYesButton);
yesButton.addEventListener('focus', moveYesButton);
yesButton.addEventListener('click', showCelebration);

noButton.addEventListener('click', () => {
  hintText.textContent = 'Hmm... the confetti says you should try Yes instead 🎉';
});
