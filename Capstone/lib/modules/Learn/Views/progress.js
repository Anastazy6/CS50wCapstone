export const Progress = function () {
  // Left
  const remainingChoices = document.getElementById('learn-remaining-choices');
  const remainingWrites = document.getElementById('learn-remaining-writes');
  // Progress bar
  const barCorrect = document.getElementById('progress-bar-correct');
  const barIncorrect = document.getElementById('progress-bar-incorrect');
  // Below progress bar
  const totalcorrect = document.getElementById('total-correct');
  const correctPercentage = document.getElementById('correct-percentage');
  const totalWrong = document.getElementById('total-wrong');
  // Rigth
  const failedChoices = document.getElementById('learn-failed-choices');
  const failedWrites = document.getElementById('learn-failed-writes');
  const updateStats = stats => {
    let allCorrect = stats.correctChoices + stats.correctWrites;
    let allWrong = stats.failedChoices + stats.failedWrites;
    let correctness = 100 * allCorrect / (allCorrect + allWrong) || 0;
    remainingChoices.innerHTML = stats.remainingChoices;
    remainingWrites.innerHTML = stats.remainingWrites;
    failedChoices.innerHTML = stats.failedChoices;
    failedWrites.innerHTML = stats.failedWrites;
    totalcorrect.innerHTML = allCorrect;
    totalWrong.innerHTML = allWrong;
    correctPercentage.innerHTML = Math.round(correctness * 100) / 100;
    _updateProgressBars(correctness);
  };
  const _updateProgressBars = correctness => {
    _updateWidths(correctness);
    _updateArias(correctness);
  };
  const _updateWidths = correctness => {
    barCorrect.style.width = `${correctness}%`;
    barIncorrect.style.width = `${100 - correctness}%`;
  };
  const _updateArias = correctness => {
    barCorrect.setAttribute("aria-valuenow", correctness);
    barIncorrect.setAttribute("aria-valuenow", 100 - correctness);
  };
  return {
    updateStats: updateStats
  };
}();