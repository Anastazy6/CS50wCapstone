/**
 * Study Item model for the Create module. This model contains input fields for the DOM.
 */
export const StudyItemCreator = (function() {
  let studyItemGuts;

  const setGuts = (guts) => {
    studyItemGuts = guts;
  }

  const createStudyItem = () => {
    const studyItem = _createNewStudyItemWrapper();
    
    studyItem.append(_createIndexBullet());
    studyItem.append(_createNewStudyItem());    
    
    return studyItem;
  }

  const _createNewStudyItemWrapper = () => {
    console.log("Creating new single item wrapper")
    const wrapper = document.createElement('div');
    wrapper.classList.add("study-item-wrapper-single");


    return wrapper;
  }

  
  const _createIndexBullet = () => {
    console.log("Creating index bullet")
    const indexBullet = document.createElement('div');

    indexBullet.classList.add('study-item-index-bullet',
                              'bg-lleuad',
                              'text-lleuad-lawn');
    indexBullet.innerHTML = _generateIndex();
    return indexBullet;
  }


  const _generateIndex = (function() {
    let index = 5;
    return function() {index += 1; return index;}
  })()


  const _createNewStudyItem = () => {
    console.log("Adding study item guts")
    console.log(studyItemGuts);
    const newStudyItem = document.createElement('div');

    newStudyItem.classList.add('study-item-container');

    newStudyItem.innerHTML = studyItemGuts;
    return newStudyItem;
  }
  

  const _addFormInputsTo = (newStudyItem) => {
    let inputFields = [
        'term',
        'definition',
        'category',
        'notes'
    ]

    let required = [
        'term',
        'definition'
    ]
    
    inputFields.forEach(name => {
      newStudyItem.append(_createTextarea(name, required));
    })
  }

  const _createTextarea = (name, required) => {
    const textarea  = document.createElement("textarea");
    
    textarea .setAttributes(
      { "name"       : name,
        "cols"       : 25,
        "rows"       : 1,
        "placeholder": `Enter ${name}`}
    );

    if (required.includes(name)) { textarea.setAttribute('required', '')}

    textarea.classList.add(
        `${name}-input`,
        'study-item-input'
    )
    
    return textarea;
  }

  return {
    createStudyItem: createStudyItem,
    setGuts        : setGuts
  }
})()