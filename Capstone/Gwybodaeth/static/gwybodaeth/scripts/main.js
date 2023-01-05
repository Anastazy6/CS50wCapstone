/* TODO: (either @ core or advanced level): Lazy module importing.
 *   Current iteration works just fine, but importing all the modules at once isn't
 *   the best design as it slows content loading.
 *   Calling module functions like StudySet.createStudySet or Flashcards.loadFlashcards(...)
 *   if and only if an HTML element which is going to use them exist works just fine too, but
 *   I guess it's not the best idea as well. At the moment (24.12.2022) I have no better idea tho...
 */

import {Load}         from "./modules/load.mjs";
import {StudySet}     from "./modules/study_set.mjs"
import {Flashcards}   from "./modules/flashcards.mjs";
import {Write}        from "./modules/write.mjs";


document.addEventListener("DOMContentLoaded", function() {
  Load      .testFunction();
  StudySet  .testFunction();
  Flashcards.testFunction();
  Write     .testFunction();

  const addStudyItemButton = document.getElementById("study-set-add-item"  );
  const createStudySetForm = document.getElementById("create-set"          );
  const flashcardsView     = document.getElementById("flashcards-container");
  const studySetView       = document.getElementById("study-items"         );
  const writeView          = document.getElementById("write-container"     );

  if (!!addStudyItemButton) {addStudyItemButton.onclick  = StudySet.addStudyItem;  }
  if (!!createStudySetForm) {createStudySetForm.onsubmit = StudySet.createStudySet;}
  if (!!flashcardsView)     {Load.terms(Flashcards.loadFlashcards);}
  if (!!studySetView)       {Load.terms(StudySet  .prepareData   );}
  if (!!writeView)          {Load.terms(Write     .loadItems     );}
})