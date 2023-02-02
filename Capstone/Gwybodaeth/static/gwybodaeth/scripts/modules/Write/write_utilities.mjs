export const WriteUtilities = (function() {

  /**
   * Takes an array of strings and makes it easier to compare with another cleaned array of strings by
   *   trimming its both ends (so the extra spaces won't interfere with the comparison process),
   *   lowercases every element (so if both arrays are cleaned, then the comparison becomes case insensitive)
   *   and removes characters which are to be ignored during the comparison (ATM it's just the full stop).
   * @param {Array<String>} choices 
   * @returns Array<string> with its elements trimmed, lowercased and without these characters: ['.']
   */
    const clean = (choices) => {
      return choices.map(choice => choice.trim().toLowerCase().replace(/\./g, ''));
    }


    const verifyAnswers = (questions, answers) => {
      return clean(answers).some(answer => clean(questions).includes(answer));
    }


  return {
    clean        : clean,
    verifyAnswers: verifyAnswers,
  }
})()