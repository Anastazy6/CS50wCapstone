var StudySet = (function(){
// Public functions
  function testFunction() {
    console.log("Test successfull");
  }

  function createStudySet() {
    console.log("Data sent")
    fetch('/create-set', {
      method: 'POST',
      headers: {
        "X-CSRFToken" : document.querySelector("[name=csrfmiddlewaretoken]").value,
        "Content-Type": "application/json"
      },
      // This is barely a skeleton for the data the AJAX call is intended to send.
      body: JSON.stringify({
        "id"          : "TODO or to delete",
        "title"       : "titleInput.value",
        "description" : "descriptionInput.value",
        "terms-lang"  : "terms lang",
        "defs-lang"   : "defs-lang",
        "data"        : "For each study item get its term, definition and category"
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

      const term       = studyItem.querySelector("[name=term]")      .innerHTML;
      const definition = studyItem.querySelector("[name=definition]").innerHTML;
      const category   = studyItem.querySelector("[name=category")   .value;

      data[`${id}`] = { "term"      : `${term}`,
                        "definition": `${definition}`,
                        "category"  : `${category}` };

    })
    console.log(data);
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