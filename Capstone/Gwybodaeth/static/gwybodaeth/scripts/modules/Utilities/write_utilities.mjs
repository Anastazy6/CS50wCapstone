export const WriteUtilities = (function() {


  /**
   * Gives up on answering a particular question, marking it as incorrect.
   *   Then the user will be asked the next question.
   */
    const pass = (currentItem, feedbackView) => {
      let data = {
        answerCorrect: false,
        currentItem  : currentItem,
        userInput    : "<span class='text-warning'>None</span>"
      }
      
      _showFeedback(feedbackView, data);
      return false; // Prevent page reload on submit.
    }


  const submitAnswer = (currentItem, input, feedbackView) => {
    let data = {
      currentItem  : currentItem,
      answerCorrect: verifyAnswers(currentItem.terms, input),
      userInput    : input
    }

    _showFeedback(feedbackView, data);
  }


  const verifyAnswers = (questions, answers) => {
    return _clean(answers).some(answer => _clean(questions).includes(answer));
  }

  
  /**
   * Takes an array of strings and makes it easier to compare with another cleaned array of strings by
   *   trimming its both ends (so the extra spaces won't interfere with the comparison process),
   *   lowercases every element (so if both arrays are cleaned, then the comparison becomes case insensitive)
   *   and removes characters which are to be ignored during the comparison (ATM it's just the full stop).
   * @param {Array<String>} choices 
   * @returns Array<string> with its elements trimmed, lowercased and without these characters: ['.']
   */
    const _clean = (choices) => {
      return choices.map(choice => choice.trim().toLowerCase().replace(/\./g, ''));
    }


    const _showFeedback = (view, data) => {
      view.hide();
  
      if (data.answerCorrect) {
        view.showPositive(data.currentItem, data.userInput);
      } else {
        view.showNegative(data.currentItem, data.userInput);
      }
    }
    

  // TODO (optional): refactor so that it uses booleans instead of strings. Using dataset for booleans
  //   has proven to be quite tricky, so I'm leaving this band-aid solution for now.
  const resolve = (methods, event) => {
    let resolution = event.target.dataset.resolution;

    if (resolution === 'positive') {
      _resolvePositively(methods);
    } else if (resolution === 'negative') {
      _resolveNegatively(methods);
    } else {
      console.log("Couldn't resolve..."); 
    }
  }


  const _resolvePositively = (methods) => {
    methods.processCorrect();
    methods.updateView();
  }


  const _resolveNegatively = (methods) => {
    methods.processWrong({
      input: methods.getUserInput()
    });
    methods.updateView();
  }


  return {
    pass         : pass,
    resolve      : resolve,
    submitAnswer : submitAnswer,
    verifyAnswers: verifyAnswers,
  }
})()