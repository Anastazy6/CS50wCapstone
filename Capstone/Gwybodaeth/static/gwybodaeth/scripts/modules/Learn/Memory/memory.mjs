export const Memory = (function() {
  let _pickable  = []; // START : contains study items for which the user must provide a single correct answer out of 4 choices.
  let _writable  = []; // MIDDE : Contains study items for which the user must write the correct answer themselves.
  let _complete  = []; // FINISH: Contains study items which the user has successfully leart.
  
  let _correctChoices = 0;
  let _wrongChoices   = 0;
  let _correctWrites  = 0;
  let _wrongWrites    = 0;

  const loadItem = (StudyItem) => {
    _pickable.push(StudyItem);
  }

  const test = () => {
    _pickable.forEach(item => console.log(item));
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
      correctChoices: _correctChoices,
      wrongChoices  : _wrongChoices,
      correctWrites : _correctWrites,
      wrongWrites   : _wrongWrites
    }
  }

  const isItTimeToWrite = () => {
    if (_writable.length <= 7 && _pickable.length > 0) {
      return false;
    }
    return true;
  }

  const getShuffledTraps = () => {
    return getWrongAnswers().sort(() => Math.random() - 0.5 )
  }

  const processCorrectChoice = () => {
    _correctChoices += 1;
    _writable.push(_pickable(shift)); // Move the first item from the _pickable to the end of the _writable.
  }

  const processWrongChoice = () => {
    _wrongChoices += 1;
    _insert(_pickable, _rollRandomIndex(_pickable), _pickable.shift());y
  }

  const _rollRandomIndex = (array) => {
    let constraints = {
      min: 1,
      max: array.length - 1
    }

    let randomIndex = round(Math.random * 7);
    randomIndex = max(constraints.min, randomIndex) // Ensure the value is never less than 1
    randomIndex = min(constraints.max, randomIndex) // Then ensure it's not greater than the length of _pickable
    return randomIndex;
  }

  const _insert = (array, index, value) => {
    let firstHalf  = array.slice(0, index);
    let secondHalf = array.slice(index);

    return firstHalf.push(value).concat(secondHalf);
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
    test                  : test
  }
})()