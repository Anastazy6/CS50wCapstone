export const Choice = (function() {
  const question    = document.getElementById("lmc-term"           );
  const category    = document.getElementById("lmc-category"       );
  const feedback    = document.getElementById("lmc-feedback"       );
  const answerA     = document.getElementById("lmc-answer-A"       );
  const answerB     = document.getElementById("lmc-answer-B"       );
  const answerC     = document.getElementById("lmc-answer-C"       );
  const answerD     = document.getElementById("lmc-answer-D"       );
  const btnContinue = document.getElementById("lmc-continue-button");

  let correctAnswer;
  let trapAnswers;

  let handleCorrect;
  let handleWrong;
  let getCurrentChoice;

  /**
   * Adds methods with access to Memory.
   */
  const connectToMemory = (methods) => {
    console.log(methods)
    handleCorrect    = methods.handleCorrect;
    handleWrong      = methods.handleWrong;
    getCurrentChoice = methods.getCurrentChoice;
  }


  const showCurrent = () => {
    console.log(getCurrentChoice);
    let current = getCurrentChoice();

    question.innerHTML = current.correct.definitions;
    category.innerHTML = current.correct.category;

    _randomizeAnswers();
    _setAnswers(current.correct, current.traps);
  }


  const _reset = () => {
    btnContinue.onclick = null;
    correctAnswer.classList.remove("lmc-answer-clicked-correct");
    trapAnswers.forEach(trap => {
      trap.classList.remove("lmc-answer-clicked-wrong");
    })
  }

  const _setAnswers = (correct, traps) => {
    _setCorrect(correct);
    _setTraps  (traps);
  }

  const _setCorrect = (answer) => {
    correctAnswer.innerHTML = answer.terms;
    correctAnswer.onclick = _correctAnswerClicked;
  }

  const _setTraps = (traps) => {
    trapAnswers.forEach(trapAnswer => {
      trapAnswer.innerHTML = traps[0].terms;
      trapAnswer.onclick = () => {_trapClicked(trapAnswer)};
      traps.shift();
    })
  }

  const _randomizeAnswers = () => {
    let answers  = [answerA, answerB, answerC, answerD];
    let shuffled = answers.sort(() => { return Math.random() - 0.5; })

    correctAnswer = shuffled[0];
    trapAnswers   = shuffled.slice(1);
  }

  const _addEventListeners = () => {

  }

  const _correctAnswerClicked = () => {
    _anyAnswerClicked();
    _showPositiveFeedback();

    handleCorrect();
  }

  const _trapClicked = function(trap) {
    _anyAnswerClicked();
    _showNegativeFeedback();
    _highlightWrong(trap);

    handleWrong();
  }


  /**
   * Wraps all the submethods that are run when either the correct answer or any trap
   * is clicked so that the shared submethods can be modified in one place.
   */
  const _anyAnswerClicked = () => {
    _highlightCorrect();
    _disableAnswers();
    btnContinue.onclick = showCurrent;
  }

  const _showPositiveFeedback = () => {
    feedback.innerHTML = "Sigh, you made it...";
    feedback.classList.add("text-success");
    feedback.classList.remove("text-danger");
  }

  const _showNegativeFeedback = () => {
    feedback.innerHTML = "Haha, you lost!";
    feedback.classList.add("text-danger");
    feedback.classList.remove("text-success");
  }

  const _hideFeedback = () => {
    feedback.innerHTML = '';
  }

  const _showNext = () => {
    _hideFeedback();
    _reset();
    showCurrent();
  }

  const _highlightCorrect = () => {
    correctAnswer.classList.add("lmc-answer-clicked-correct");
  }

  const _highlightWrong = function(trap) {
    trap.classList.add   ("lmc-answer-clicked-wrong"  );
  }

  const _disableAnswers = () => {
    correctAnswer.onclick = null;
    
    trapAnswers.forEach(trapAnswer => {
      console.log(`Removing event listener for trap: `)
      console.log(trapAnswer)
      trapAnswer.onclick = null;
    })
  }

  return {
    showCurrent    : showCurrent,
    connectToMemory: connectToMemory,
  }
})()