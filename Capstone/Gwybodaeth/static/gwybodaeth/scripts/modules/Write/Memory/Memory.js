/**
 *  Contains data necessary for the app to work and remembers whether a term hasn't been
 *    shown to the user or the answer given was correct/incorrect.
 */
export const Memory = function () {
  const _remaining = [];
  const _correct = [];
  const _incorrect = [];
  const _rounds = [];
  let _currentRound = {
    id: 1,
    data: []
  };

  // *************************************************************************
  //                       Simple public methods
  // *************************************************************************

  // Add public one-liners here, as long as their intention can be guessed from
  //   their name.

  const countRemaining = () => _remaining.length;
  const countCorrect = () => _correct.length;
  const countIncorrect = () => _incorrect.length;
  const getLastRound = () => [_rounds.at(-1)];
  const getAllRounds = () => _rounds;

  // *************************************************************************
  //                            Public methods
  // *************************************************************************

  // Add public methods (that require more than one line or need an explaination
  //   why they do stuff they do) here.

  /**
   * Loads into memory a new StudyItem object, created from the fetched data. 
   * @param {StudyItem} item 
   */
  const loadItem = item => {
    _remaining.push(item);
  };

  /**
   * 
   * @returns the first element from the _remaining list, which will be used to
   *   ask the user a question and await their answer for it.
   */
  const currentItem = () => {
    return !!_remaining[0] ? _remaining[0] : false;
  };

  /**
   *  Marks the currentItem as being answered correctly, moving it from
   *    the _remaining list to the _correct list. 
   *  Does not add the currentItem
   *    to the _currentRound as there's no need to explicitely remeber the user's
   *    answer - it's just the term. 
   */
  const processCorrectWrite = () => {
    _correct.push(_remaining.shift());
  };

  /**
   *  Marks the currentItem as being answered incorrectly, moving it from
   *    the _remaining list to the _incorrect list.
   *  Adds the currentItem AND the user's answer to the current round, in order
   *    to display the mistake in the summary.
   */
  const processWrongWrite = data => {
    const lastItem = _remaining.shift();
    _incorrect.push(lastItem);
    _currentRound.data.push({
      item: lastItem,
      answer: data['input']
    });
    console.log("Current round:");
    console.log(_currentRound);
  };

  /**
   *  Shuffles the _remaining list randomly in order to provide the user with
   *    more challenge and inability to associate answers with their positions
   *    in the order of questions.
   */
  const shuffle = () => {
    _remaining.sort(() => Math.random() - 0.5);
  };

  /**
   *  Sorts the study items by their ID.
   *    Note that the ID is assigned on study set creation!
   */
  const sort = () => {
    _remaining.sort((first, second) => {
      return parseInt(first.id) - parseInt(second.id);
    });
  };

  /**
   *  TODO: docstring
   * 
   */
  const finishRound = () => {
    let nextId = _currentRound.id + 1;
    _rounds.push(_currentRound);
    _currentRound = {
      id: nextId,
      data: []
    };
  };
  const retryFailures = () => {
    while (_incorrect.length > 0) {
      _remaining.push(_incorrect.pop());
    }
    shuffle();
  };

  // *************************************************************************
  //                             Private methods
  // *************************************************************************

  return {
    countRemaining: countRemaining,
    countCorrect: countCorrect,
    countIncorrect: countIncorrect,
    currentItem: currentItem,
    finishRound: finishRound,
    getAllRounds: getAllRounds,
    getLastRound: getLastRound,
    loadItem: loadItem,
    processCorrectWrite: processCorrectWrite,
    processWrongWrite: processWrongWrite,
    retryFailures: retryFailures,
    shuffle: shuffle,
    sort: sort
  };
}();