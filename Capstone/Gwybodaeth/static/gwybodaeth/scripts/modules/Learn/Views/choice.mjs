export const Choice = (function() {
  const container   = document.getElementById("learn-multiple-choice-container");

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


  const hide = () => {
    container.classList.add('hidden');
  }
  

  const show = () => {
    container.classList.remove('hidden');
  }


  const showCurrent = (current, methods) => {
    _displayData(current.correct);
    _randomizeAnswers();
    _setAnswers(current.correct, current.traps, methods);
    _initializeButtons(methods.showNext);
    _clearFeedback();
  }


  // ---------------------------------------------------------------------------
  //                           Private - helpers
  // ---------------------------------------------------------------------------


  const _allAnswers = () => {
    return [correctAnswer, ...trapAnswers];
  }


  // ---------------------------------------------------------------------------
  //                           Private - creation
  // ---------------------------------------------------------------------------


  const _clearFeedback = () => {
    feedback.innerHTML = '';

    _allAnswers().forEach(answer => {
      answer.parentNode.classList.remove( "lmc-answer-clicked-correct",
                                          "lmc-answer-clicked-wrong");
    })
  }


  const _displayData = (data) => {
    question.innerHTML = data.definitions.join(', ');
    category.innerHTML = data.category;
  }


  const _enableAnswers = () => {
    console.log("enabling answers");
    _allAnswers().forEach(answer => answer.disabled = false);
  }


  const _initializeButtons = (showNext) => {
    btnContinue.onclick = showNext;
    
    btnContinue  .disabled = true;
    _enableAnswers();
  }


  const _randomizeAnswers = () => {
    let answers  = [answerA, answerB, answerC, answerD];
    let shuffled = answers.sort(() => { return Math.random() - 0.5; })

    correctAnswer = shuffled[0];
    trapAnswers   = shuffled.slice(1);
  }


  const _setAnswers = (correct, traps, methods) => {
    _setCorrect(correct, methods.processCorrect);
    _setTraps  (traps,   methods.processWrong);
  }


  const _setCorrect = (answer, processCorrect) => {
    correctAnswer.innerHTML = answer.terms.join(', ');
    correctAnswer.onclick = () => {_correctAnswerClicked(processCorrect)};
  }


  const _setTraps = (traps, processWrong) => {
    trapAnswers.forEach(trapAnswer => {
      trapAnswer.innerHTML = traps[0].terms.join(', ');
      trapAnswer.onclick = () => {_trapClicked(trapAnswer, processWrong)};
      traps.shift();
    })
  }


  // ---------------------------------------------------------------------------
  //                       Private - handling clicks
  // ---------------------------------------------------------------------------

  /**
   * Wraps all the submethods that are run when either the correct answer or any trap
   * is clicked so that the shared submethods can be modified in one place.
   */
  const _anyAnswerClicked = () => {
    _highlightCorrect();
    _disableAnswers();
    btnContinue.disabled = false;
  }

  
  const _disableAnswers = () => {
    console.log("disabling answers");
    _allAnswers().forEach(answer => answer.disabled = true);
  }

  
  const _correctAnswerClicked = (processCorrect) => {
    _anyAnswerClicked();
    _showPositiveFeedback();

    processCorrect();
  }


  const _trapClicked = (trap, processWrong) => {
    _anyAnswerClicked();
    _showNegativeFeedback();
    _highlightWrong(trap);

    processWrong();
  }


  
  // ---------------------------------------------------------------------------
  //                          Private - feedback
  // ---------------------------------------------------------------------------



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


  const _highlightCorrect = () => {
    correctAnswer.parentNode.classList.add("lmc-answer-clicked-correct");
  }

  const _highlightWrong = (trap) => {
    trap.parentNode.classList.add("lmc-answer-clicked-wrong");
  }




  return {
    hide       : hide,
    show       : show,
    showCurrent: showCurrent,
  }
})()