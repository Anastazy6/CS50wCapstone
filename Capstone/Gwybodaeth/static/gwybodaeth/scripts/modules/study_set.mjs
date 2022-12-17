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

const _createStudyTerm = (termData) => {
  console.log('In createStudyTerm, termData:');
  console.log(termData);
}

const _fillStudySetViewWithTerms = (terms) => {
  Object.entries(terms).forEach(term => {
    _createStudyTerm(term);
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