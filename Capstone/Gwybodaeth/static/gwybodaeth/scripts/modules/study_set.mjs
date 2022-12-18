export const StudySet = (function(){
// Public functions
  const testFunction = () => {
    console.log("StudySet module loaded successfully!");
  }



  const createStudySet = () => {
    fetch('/create-set', {
      method: 'POST',
      headers: {
        "X-CSRFToken" : document.querySelector("[name=csrfmiddlewaretoken]").value,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "title"       : document.getElementById("create-set-title")      .value,
        "description" : document.getElementById("create-set-description").value,
        "terms-lang"  : document.querySelector ("[name=terms-lang]")     .value,
        "defs-lang"   : document.querySelector ("[name=defs-lang]")      .value,
        "terms"       : _getNewStudySetData()
      })
    })
    .then(response => response.json())
    .then(result   => {
      console.log(result)
    })
    return false;
  }



  const loadStudyTerms = () => {
    fetch(`/load/${_getStudySetID()}`)
    .then(response => response.json())
    .then(result => {
      _fillStudySetViewWithTerms(result['terms']);
    })
  }



// Private functions

/**
 * Creates and returns an HTML element with a single study item's term, definition, category and options.
 * @param {Array}  termData - An array containing all the data needed to create a single study item.
 * @param {number} termData[0] - The first element of the termData array is the ID if a study item, starting with 1
 * @param {Object} termData[1] - An object/dictionary with 3 keys: "term", "def" (definition), "cat" (category).
 */
const _createStudyTerm = (termData) => {
  console.log('In createStudyTerm, termData:');
  console.log(termData);
  console.log(termData[0]);
  console.log(termData[1]);

  const studyItem = _createStudyTermContainer(termData[0]);

  Object.entries(termData[1]).forEach(([key, value]) => {
    studyItem.append(_createStudyTermFields(key, value));
  })

  studyItem.append(_createStudyTermOptions());

  console.log(studyItem);
  return studyItem;
}



const _createStudyTermContainer = (termID) => {
  const studyItemContainer = document.createElement('div');
  studyItemContainer.setAttribute("id", `study-item-${termID}`);
  studyItemContainer.classList.add("grid-container-6", "study-item");
  
  return studyItemContainer;
}



const _createStudyTermFields = (key, value) => {
  console.log("Key is:" + key);
  const studyField = document.createElement("div");
  studyField.classList.add(`study-${key}`);
  studyField.classList.add((key === 'cat') ? "study-set-cell-1" : "study-set-cell-2");
  studyField.innerHTML = value;

  return studyField;
}



const _createStudyTermOptions = () => {
  // TODO: create buttons for editing and marking a term as difficult.
  const studyOptions = document.createElement('div');
  studyOptions.classList.add("study-set-cell-1", "study-options");
  studyOptions.innerHTML = "TODO";
  
  return studyOptions;
}



const _fillStudySetViewWithTerms = (terms) => {
  const studyItems = document.getElementById("study-items");

  Object.entries(terms).forEach(term => {
    _createStudyTerm(term);
    //studyItems.append(_createStudyTerm(term));
  })
}



const _getNewStudySetData = () => {
  let   data       = {};
  const studyItems = document.getElementsByClassName("study-item");

  Array.from(studyItems).forEach(studyItem => {
    const id         = studyItem.id.slice(5);
    const term       = studyItem.querySelector("[name=term]")      .value;
    const definition = studyItem.querySelector("[name=definition]").value;
    const category   = studyItem.querySelector("[name=category")   .value;

    data[`${id}`] = { "term": `${term}`,
                      "def" : `${definition}`,
                      "cat" : `${category}` };

  })
  return data;
}



const _getStudySetID = () => {
  return window.location.pathname.slice(1)
}



//
return {
  testFunction      : testFunction,
  createStudySet    : createStudySet,
  loadStudyTerms    : loadStudyTerms,
};
})();