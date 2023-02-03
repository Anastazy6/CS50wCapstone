export const WriteUtilities = (function() {


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
    


  return {
    submitAnswer : submitAnswer,
    verifyAnswers: verifyAnswers,
  }
})()