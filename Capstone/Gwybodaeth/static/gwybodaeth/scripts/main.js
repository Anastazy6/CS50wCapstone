import {StudySet} from "./modules/study_set.mjs"


$(document).ready(function(){
  StudySet.testFunction();

  const createStudySetForm = document.getElementById("create-set");
  if (!!createStudySetForm) {
    createStudySetForm.onsubmit = StudySet.createStudySet;
  }

  StudySet.loadStudyTerms();
})