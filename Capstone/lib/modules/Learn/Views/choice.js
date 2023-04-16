export const Choice = function () {
  const container = document.getElementById("learn-multiple-choice-container");
  const question = document.getElementById("lmc-term");
  const category = document.getElementById("lmc-category");
  const feedback = document.getElementById("lmc-feedback");
  const answerA = document.getElementById("lmc-answer-A");
  const answerB = document.getElementById("lmc-answer-B");
  const answerC = document.getElementById("lmc-answer-C");
  const answerD = document.getElementById("lmc-answer-D");
  const btnContinue = document.getElementById("lmc-continue-button");
  let correctAnswer;
  let trapAnswers;
  const hide = () => {
    container.classList.add('hidden');
  };
  const show = () => {
    container.classList.remove('hidden');
  };

  /**
   * Displays an ABCD choice test for the current study items. Requires 2 objects
   * passed as parametres:
   * - Object data:
   * - - StudyItem correct     : a single StudyItem representing the current correct answer
   * - - Array<StudyItem> traps: an array consisting of 3 (or more) StudyItems representing
   *       wrong answers which the user has to avoid
   * - Object methods:
   * - - function processCorrect: operations to perform on the memory after clicking on the correct answer
   * - - function processWrong  : operations to perform on the memory after clicking on any of the wrong (trap) answers
   * - - function showNext      : operations to perform on the memory in order to show the next study item 
   *        (or either switch to the write mode or show summary)
   * 
   * Displaying an ABCD choice test unit is a task that is split into:
   * - displaying the current item's definition and category;
   * - picking randomly which of the 4 answer fields will hold the correct answer
   * - filling the answer fields with data: the chosen field for the correct answer
   *     gets the correct answer, while the rest become traps
   * - adding listeners to the buttons (with style related stuff being defined within
   *     this module while access to Memory is granted through the methods parameter), while
   *     enabling and disabling them as it fits;
   * - clearing any feedback from the previous study unit
   * @param {Object} data 
   * @param {Object} methods 
   */
  const showCurrent = (data, methods) => {
    _displayData(data.correct);
    _randomizeAnswers();
    _setAnswers(data.correct, data.traps, methods);
    _initializeButtons(methods.showNext);
    _clearFeedback();
  };

  // ---------------------------------------------------------------------------
  //                           Private - helpers
  // ---------------------------------------------------------------------------

  const _allAnswers = () => {
    return [correctAnswer, ...trapAnswers];
  };

  // ---------------------------------------------------------------------------
  //                           Private - creation
  // ---------------------------------------------------------------------------

  const _clearFeedback = () => {
    feedback.innerHTML = '';
    _allAnswers().forEach(answer => {
      answer.classList.remove("lmc-answer-clicked-correct", "lmc-answer-clicked-wrong");
    });
  };
  const _displayData = data => {
    question.innerHTML = data.definitions.join(', ');
    category.innerHTML = data.category;
  };
  const _enableAnswers = () => {
    _allAnswers().forEach(answer => answer.disabled = false);
  };

  /**
   *  Adds onclick method which shows the next study unit to the Continue Button,
   *    while disabling it so that the user cannot continue without answering.
   *  Ensures that the answer buttons are enabled.
   */
  const _initializeButtons = showNext => {
    btnContinue.onclick = showNext;
    btnContinue.disabled = true;
    _enableAnswers();
  };
  const _randomizeAnswers = () => {
    let answers = [answerA, answerB, answerC, answerD];
    let shuffled = answers.sort(() => {
      return Math.random() - 0.5;
    });
    correctAnswer = shuffled[0];
    trapAnswers = shuffled.slice(1);
  };
  const _setAnswers = (correct, traps, methods) => {
    _setCorrect(correct, methods.processCorrect);
    _setTraps(traps, methods.processWrong);
  };
  const _setCorrect = (answer, processCorrect) => {
    correctAnswer.innerHTML = answer.terms.join(', ');
    correctAnswer.onclick = () => {
      _correctAnswerClicked(processCorrect);
    };
  };
  const _setTraps = (traps, processWrong) => {
    trapAnswers.forEach(trapAnswer => {
      trapAnswer.innerHTML = traps[0].terms.join(', ');
      trapAnswer.onclick = () => {
        _trapClicked(trapAnswer, processWrong);
      };
      traps.shift();
    });
  };

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
  };
  const _disableAnswers = () => {
    console.log("disabling answers");
    _allAnswers().forEach(answer => answer.disabled = true);
  };
  const _correctAnswerClicked = processCorrect => {
    _anyAnswerClicked();
    _showPositiveFeedback();
    processCorrect();
  };
  const _trapClicked = (trap, processWrong) => {
    _anyAnswerClicked();
    _showNegativeFeedback();
    _highlightWrong(trap);
    processWrong();
  };

  // ---------------------------------------------------------------------------
  //                          Private - feedback
  // ---------------------------------------------------------------------------

  const _showPositiveFeedback = () => {
    feedback.innerHTML = "Sigh, you made it...";
    feedback.classList.add("text-success");
    feedback.classList.remove("text-danger");
  };
  const _showNegativeFeedback = () => {
    feedback.innerHTML = "Haha, you lost!";
    feedback.classList.add("text-danger");
    feedback.classList.remove("text-success");
  };
  const _highlightCorrect = () => {
    correctAnswer.classList.add("lmc-answer-clicked-correct");
  };
  const _highlightWrong = trap => {
    trap.classList.add("lmc-answer-clicked-wrong");
  };
  return {
    hide: hide,
    show: show,
    showCurrent: showCurrent
  };
}();