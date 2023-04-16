export const Memory = function () {
  let _pickable = []; // START : contains study items for which the user must provide a single correct answer out of 4 choices.
  let _writable = []; // MIDDLE: Contains study items for which the user must write the correct answer themselves.
  let _complete = []; // FINISH: Contains study items which the user has successfully leart.

  let _correctChoices = 0;
  let _failedChoices = 0;
  let _correctWrites = 0;
  let _failedWrites = 0;
  let writingTime = false;
  const loadItem = StudyItem => {
    _pickable.push(StudyItem);
  };
  const currentItem = () => {
    _checkIfItsTimeToWrite();
    return writingTime ? _writable[0] : _pickable[0];
  };

  /**
   * Used to generate wrong answers for the multiple choice view.
   * @returns All the terms except the current pickable one
   */
  const getWrongAnswers = () => {
    return _pickable.slice(1).concat(_writable).concat(_complete);
  };
  const getStats = () => {
    return {
      correctChoices: _correctChoices,
      failedChoices: _failedChoices,
      remainingChoices: _pickable.length,
      correctWrites: _correctWrites,
      failedWrites: _failedWrites,
      remainingWrites: _writable.length
    };
  };
  const getShuffledTraps = (limit = 3) => {
    if (limit < 3) {
      limit = 3;
      console.log("Warning: trying to get less than 3 trap answers which is not enough\
                    for the app to work. Setting the limit to 3.");
    }
    return getWrongAnswers().sort(() => Math.random() - 0.5).slice(0, limit);
  };
  const viewToBeShown = () => {
    _checkIfItsTimeToWrite();
    if (_writable.length === 0 && _pickable.length === 0) {
      return 'summary';
    }
    if (writingTime) {
      return 'write';
    }
    return 'choice';
  };
  const processCorrectChoice = () => {
    _correctChoices += 1;
    _writable.push(_pickable.shift()); // Move the first item from the _pickable to the end of the _writable.
  };

  const processWrongChoice = () => {
    _failedChoices += 1;
    _pickable = _insert(_pickable, _rollRandomIndex(_pickable.length), _pickable.shift());
  };
  const processCorrectWrite = () => {
    _correctWrites += 1;
    _complete.push(_writable.shift());
  };
  const processWrongWrite = _data => {
    _failedWrites += 1;
    shuffleWritables();
  };
  const shufflePickables = () => {
    _shuffle(_pickable);
  };
  const shuffleWritables = () => {
    _shuffle(_writable);
  };

  // ---------------------------------------------------------------------------
  //                                Private
  // ---------------------------------------------------------------------------

  const _checkIfItsTimeToWrite = () => {
    if (writingTime) {
      if (_writable.length === 0 && _pickable.length > 0) {
        writingTime = false;
      }
    } else {
      if (_pickable.length === 0 && _writable.length > 0) {
        writingTime = true;
      } else if (_writable.length >= 7) {
        writingTime = true;
      }
    }
  };
  const _insert = (array, index, value) => {
    let firstHalf = array.slice(0, index);
    let secondHalf = array.slice(index);
    firstHalf[firstHalf.length] = value;
    return firstHalf.concat(secondHalf);
  };
  const _rollRandomIndex = max => {
    max = Math.min(max, 7 - _writable.length) - 1;
    return Math.floor(Math.random() * max) + 1;
  };
  const _shuffle = array => {
    array = array.sort(() => Math.random() - 0.5);
  };
  return {
    currentItem: currentItem,
    getWrongAnswers: getWrongAnswers,
    getShuffledTraps: getShuffledTraps,
    getStats: getStats,
    loadItem: loadItem,
    processCorrectChoice: processCorrectChoice,
    processWrongChoice: processWrongChoice,
    processCorrectWrite: processCorrectWrite,
    processWrongWrite: processWrongWrite,
    shufflePickables: shufflePickables,
    shuffleWritables: shuffleWritables,
    viewToBeShown: viewToBeShown
  };
}();