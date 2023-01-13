import { Feedback } from "./Feedback.mjs";
import { Progress } from "./Progress.mjs";
import { Summary  } from "./summary.mjs";

/**
   *  Contains references to the visible HTML elements and methods of displaying/updating them.
   */
export const View = function() {
  //--------------------------------------------------------------------------
  //                     View: HTML elements references
  //--------------------------------------------------------------------------

  // Main view
  const mainView    = document.getElementById("write-container");

  const question         = document.getElementById("write-question"          );
  const pass             = document.getElementById("write-pass"              );
  const answer           = document.getElementById("write-answer-area"       );
  const submit           = document.getElementById("write-answer-button"     );
  const category         = document.getElementById("write-category"          );
  const label            = document.getElementById("write-textarea-label"    );
  const specials         = document.getElementById("write-special-letters"   );


  //--------------------------------------------------------------------------
  //                     View: public methods
  //--------------------------------------------------------------------------
  
  const initialize = (itemCount, methods) => {
    Progress.initialize(itemCount)
    _addEventListeners(methods);
  }

  const update = (data) => {
    _showCurrent(data.currentItem);
    Progress.update(data.counters);
    _clearInput();
  }

  const getUserInput = () => {
    if (answer.value === '') { return false; } // Invalidate empty input

    return answer.value.split(/[,;/]/);
  }

  const hide = () => {
    mainView.classList.add('hidden');
  }

  const show = () => {
    mainView.classList.remove('hidden');
  }



  //--------------------------------------------------------------------------
  //                     View: private methods
  //--------------------------------------------------------------------------

  const _showCurrent = (currentItem) => {

    Feedback.hide();
    show();
    question.innerHTML = currentItem.definitions.join(', ');
    category.innerHTML = currentItem.category;
  }

  const _clearInput = () => {
    answer.value = '';
  }


  const _addEventListeners = (methods) => {
    submit.onclick = methods.submit;
    pass  .onclick = methods.pass;

    Feedback.addEventListeners(methods);
  }


  return {
    Feedback    : Feedback,
    Summary     : Summary,
    getUserInput: getUserInput,
    initialize  : initialize,
    update      : update,
    hide        : hide,
    show        : show
  }
}();