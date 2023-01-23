export const Memory = (function() {
  let _pickable  = []; // START : contains study items for which the user must provide a single correct answer out of 4 choices.
  let _writable  = []; // MIDDE : Contains study items for which the user must write the correct answer themselves.
  let _complete  = []; // FINISH: Contains study items which the user has successfully leart.


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

  const isItTimeToWrite = () => {
    if (_writable.length <= 7 && _pickable.length > 0) {
      return false;
    }
    return true;
  }

  const getShuffledTraps = () => {
    console.log(typeof getWrongAnswers());
    return getWrongAnswers().sort(() => Math.random() - 0.5 )
  }

  return {
    getWrongAnswers       : getWrongAnswers,
    getShuffledTraps      : getShuffledTraps,
    getCurrentPickable    : getCurrentPickable,
    getWritable           : getWritable,
    isItTimeToWrite       : isItTimeToWrite,
    loadItem              : loadItem,
    test                  : test
  }
})()