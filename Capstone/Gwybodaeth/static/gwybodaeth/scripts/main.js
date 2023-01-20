/* TODO: (either @ core or advanced level): Lazy module importing.
 *   Current iteration works just fine, but importing all the modules at once isn't
 *   the best design as it slows content loading.
 *   Calling module functions like StudySet.createStudySet or Flashcards.loadFlashcards(...)
 *   if and only if an HTML element which is going to use them exist works just fine too, but
 *   I guess it's not the best idea as well. At the moment (24.12.2022) I have no better idea tho...
 */


import  { Create     }  from  "./modules/Create/create.mjs";
import  { Flashcards }  from  "./modules/Flashcards/flashcards.mjs";
import  { Learn      }  from  "./modules/Learn/learn.mjs";
import  { Load       }  from  "./modules/Load/load.mjs";
import  { StudySet   }  from  "./modules/StudySet/study_set.mjs"
import  { Write      }  from  "./modules/Write/write.mjs";


document.addEventListener("DOMContentLoaded", function() {

  const addStudyItemButton = document.getElementById("study-set-add-item"  );
  const createStudySetForm = document.getElementById("create-set"          );
  const flashcardsView     = document.getElementById("flashcards-container");
  const learnView          = document.getElementById("learn-wrapper"       );
  const studySetView       = document.getElementById("study-items"         );
  const writeView          = document.getElementById("write-wrapper"       );

  if (!!addStudyItemButton) {addStudyItemButton.onclick  = Create.addStudyItem;  }
  if (!!createStudySetForm) {createStudySetForm.onsubmit = Create.createStudySet;}
  if (!!flashcardsView)     {Load.justTerms(Flashcards.loadFlashcards);}
  if (!!learnView     )     {Load.justTerms(Learn     .loadItems     );}
  if (!!studySetView  )     {Load.justTerms(StudySet  .loadStudySet  );}
  if (!!writeView     )     {Load.justTerms(Write     .loadItems     );}
})