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

// Private functions



return {
  testFunction  : testFunction,
  createStudySet: createStudySet,
};
})();


// Przenieść do osobnego pliku
$(document).ready(function(){
  StudySet.testFunction();

  const createStudySetForm = document.getElementById("create-set");
  if (!!createStudySetForm) {
    createStudySetForm.onsubmit = StudySet.createStudySet;
  }

})