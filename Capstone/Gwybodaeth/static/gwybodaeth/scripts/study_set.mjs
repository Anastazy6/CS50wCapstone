const DEBUG = true;
console.log(DEBUG ? "Debug mode on." : "Debug mode off.");

var StudySet = (function(){
// Public functions
  function testFunction() {
    console.log("Test successfull");
  }

  function createStudySet() {
    console.log("Data sent")
    /*console.log({
      "title"       : document.getElementById("create-set-title")      .value,
      "description" : document.getElementById("create-set-description").innerHTML,
      "terms-lang"  : document.querySelector ("[name=terms-lang]")     .value,
      "defs-lang"   : document.querySelector ("[name=defs-lang]")      .value,
      "data"        : getNewStudySetData()
    }); */  
    fetch('/create-set', {
      method: 'POST',
      headers: {
        "X-CSRFToken" : document.querySelector("[name=csrfmiddlewaretoken]").value,
        "Content-Type": "application/json"
      },
      // This is barely a skeleton for the data the AJAX call is intended to send.
      body: JSON.stringify({
        "title"       : document.getElementById("create-set-title")      .value,
        "description" : document.getElementById("create-set-description").value,
        "terms-lang"  : document.querySelector ("[name=terms-lang]")     .value,
        "defs-lang"   : document.querySelector ("[name=defs-lang]")      .value,
        "data"        : getNewStudySetData()
      })
    })
    .then(response => response.json())
    .then(result   => {
      console.log(result)
    })
    return false;
  }

  function getNewStudySetData() {
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
    if (DEBUG) {console.log(data);}
    return data;
  }

// Private functions

return {
  testFunction      : testFunction,
  createStudySet    : createStudySet,
  getNewStudySetData: getNewStudySetData
};
})();


// Przenieść do osobnego pliku
$(document).ready(function(){
  StudySet.testFunction();

  const createStudySetForm = document.getElementById("create-set");
  if (!!createStudySetForm) {
    createStudySetForm.onsubmit = StudySet.createStudySet;
  }

  StudySet.getNewStudySetData();
})