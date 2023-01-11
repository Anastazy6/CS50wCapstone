/* TODO: (either @ core or advanced level): Lazy module importing.
 *   Current iteration works just fine, but importing all the modules at once isn't
 *   the best design as it slows content loading.
 *   Calling module functions like StudySet.createStudySet or Flashcards.loadFlashcards(...)
 *   if and only if an HTML element which is going to use them exist works just fine too, but
 *   I guess it's not the best idea as well. At the moment (24.12.2022) I have no better idea tho...
 */

import {Load}         from "./modules/load.mjs";
import {Create}       from "./modules/create.mjs";
import {StudySet}     from "./modules/study_set.mjs"
import {Flashcards}   from "./modules/flashcards.mjs";
import {Write}        from "./modules/Write/write.mjs";


document.addEventListener("DOMContentLoaded", function() {

  const addStudyItemButton = document.getElementById("study-set-add-item"  );
  const createStudySetForm = document.getElementById("create-set"          );
  const flashcardsView     = document.getElementById("flashcards-container");
  const studySetView       = document.getElementById("study-items"         );
  const writeView          = document.getElementById("write-container"     );

  if (!!addStudyItemButton) {addStudyItemButton.onclick  = Create.addStudyItem;  }
  if (!!createStudySetForm) {createStudySetForm.onsubmit = Create.createStudySet;}
  if (!!flashcardsView)     {Load.justTerms(Flashcards.loadFlashcards);}
  if (!!studySetView)       {Load.justTerms(StudySet  .loadStudySet  );}
  if (!!writeView)          {Load.justTerms(Write     .loadItems     );}
})