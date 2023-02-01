export const Memory = (function() {
  let _pickable  = []; // START : contains study items for which the user must provide a single correct answer out of 4 choices.
  let _writable  = []; // MIDDE : Contains study items for which the user must write the correct answer themselves.
  let _complete  = []; // FINISH: Contains study items which the user has successfully leart.
  
  let _correctChoices = 0;
  let _failedChoices  = 0;
  let _correctWrites  = 0;
  let _failedWrites   = 0;

  let _itsTimeToWrite = false;

  const loadItem = (StudyItem) => {
    _pickable.push(StudyItem);
  }

  /**
   * Used to generate wrong answers for the multiple choice view.
   * @returns All the terms except the current pickable one
   */
  const getWrongAnswers = () => {
    return _pickable.slice(1).concat(_writable).concat(_complete);
  }

  const getCurrentPickable = () => {
    return _pickable[0];
  }

  const getWritable = () => {
    return _writable[0];
  }

  const getStats = () => {
    return {
      correctChoices  : _correctChoices,
      failedChoices   : _failedChoices,
      remainingChoices: _pickable.length,

      correctWrites   : _correctWrites,
      failedWrites    : _failedWrites,
      remainingWrites : _writable.length
    }
  }


  const getShuffledTraps = (limit = 3) => {
    return getWrongAnswers().sort(() => Math.random() - 0.5 ).slice(0, limit);
  }

  const isItTimeToWrite = () => {
    if (_writable.length <= 7 && _pickable.length > 0) {
      return false;
    }
    return true;
  }

  const processCorrectChoice = () => {
    _correctChoices += 1;
    _writable.push(_pickable.shift()); // Move the first item from the _pickable to the end of the _writable.
  }

  const processWrongChoice = () => {
    _failedChoices += 1;
    _pickable = _insert(_pickable, _rollRandomIndex(_pickable.length), _pickable.shift());
  }

  const shufflePickables = () => {
    _pickable = _pickable.sort(() => Math.random() - 0.5);
  }


  // ---------------------------------------------------------------------------
  //                                Private
  // ---------------------------------------------------------------------------

  const _rollRandomIndex = (max) => {
    max = Math.min(max, 7 - _writable.length) - 1; 

    return Math.floor(Math.random() * max) + 1;
  }



  const _insert = (array, index, value) => {
    let firstHalf  = array.slice(0, index);
    let secondHalf = array.slice(index);

    firstHalf[firstHalf.length] = value;

    return firstHalf.concat(secondHalf);
  }



  return {
    getWrongAnswers       : getWrongAnswers,
    getShuffledTraps      : getShuffledTraps,
    getCurrentPickable    : getCurrentPickable,
    getWritable           : getWritable,
    getStats              : getStats,
    isItTimeToWrite       : isItTimeToWrite,
    loadItem              : loadItem,
    processCorrectChoice  : processCorrectChoice,
    processWrongChoice    : processWrongChoice,
    shufflePickables      : shufflePickables
  }
})()