import { Feedback } from "./Feedback.mjs";

/**
   *  Contains references to the visible HTML elements and methods of displaying/updating them.
   */
export const View = function() {
  //--------------------------------------------------------------------------
  //                     View: HTML elements references
  //--------------------------------------------------------------------------

  // Main view
  const question         = document.getElementById("write-question"          );
  const pass             = document.getElementById("write-pass"              );
  const answer           = document.getElementById("write-answer-area"       );
  const submit           = document.getElementById("write-answer-button"     );
  const category         = document.getElementById("write-category"          );
  const label            = document.getElementById("write-textarea-label"    );
  const specials         = document.getElementById("write-special-letters"   );
  const progress         = document.getElementById("write-progress-container");

  // Progress bars and counters
  const correctCounter   = document.getElementById("correct-counter"         );
  const incorrectCounter = document.getElementById("incorrect-counter"       );
  const remainingCounter = document.getElementById("remaining-counter"       );
  const totalCounter     = document.querySelectorAll(".total-items"          );


  //--------------------------------------------------------------------------
  //                     View: public methods
  //--------------------------------------------------------------------------
  
  const initialize = (itemCount, methods) => {
    _setTotalCounters(itemCount);
    _addEventListeners(methods);
  }

  const update = (data) => {
    _showCurrent(data.currentItem);
    _setCounters(data.counters);
    _clearInput();
  }

  const getUserInput = () => {
    if (answer.value === '') { return false; } // Invalidate empty input

    return answer.value.split(/[,;/]/);
  }



  //--------------------------------------------------------------------------
  //                     View: private methods
  //--------------------------------------------------------------------------

  const _showCurrent = (currentItem) => {
    if (!currentItem) { return alert("End reached. Further functionality is not yet implemented");}

    Feedback.hide();
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

  const _setTotalCounters = (itemsCount) => {
    totalCounter.forEach(counter => {
      counter.innerHTML = itemsCount;
    })
  }

  const _setCounters = (counters) => {
    correctCounter  .innerHTML = counters.correct;
    incorrectCounter.innerHTML = counters.incorrect;
    remainingCounter.innerHTML = counters.remaining;
  }


  return {
    Feedback    : Feedback,
    getUserInput: getUserInput,
    initialize  : initialize,
    update      : update
  }
}();