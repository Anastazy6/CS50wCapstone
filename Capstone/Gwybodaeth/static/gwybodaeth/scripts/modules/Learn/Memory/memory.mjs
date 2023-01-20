export const Memory = (function() {
  let _pickable  = []; // START : contains study items for which the user must provide a single correct answer out of 4 choices.
  let _writable  = []; // MIDDE : Contains study items for which the user must write the correct answer themselves.
  let _complete  = []; // FINISH: Contains study items which the user has successfully leart.


  const loadItem = (StudyItem) => {
    _pickable.push(StudyItem);
  }

  const test = () => {
    console.log(_pickable);
  }

  return {
    loadItem: loadItem,
    test    : test
  }
})()