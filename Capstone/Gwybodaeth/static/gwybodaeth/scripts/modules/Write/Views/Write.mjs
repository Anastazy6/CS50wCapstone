export const Write = (function() {
  //--------------------------------------------------------------------------
  //                     Write: HTML elements references
  //--------------------------------------------------------------------------

  // Main view
  const mainView    = document.getElementById("write-container");

  const question         = document.getElementById("write-question"          );
  const pass             = document.getElementById("write-pass"              );
  const answer           = document.getElementById("write-answer-area"       );
  const submit           = document.getElementById("write-answer-button"     );
  const category         = document.getElementById("write-category"          );
  
  // Will only become useful when answering with both terms or definitions will be implemented
  const label            = document.getElementById("write-textarea-label"    );
  // Will only become useful when support for diacritics will be added
  const specials         = document.getElementById("write-special-letters"   );




  const clearInput = () => {
    answer.value = '';
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
    clearInput();
    answer.focus();
  }

  const showCurrent = (currentItem) => {
    show();

    question.innerHTML = currentItem.definitions.join(', ');
    category.innerHTML = currentItem.category;
  }



  const addEventListeners = (methods) => {
    submit.onclick = methods.submit;
    pass  .onclick = methods.pass;
    _addKeyboardSupport();
  }


  const _addKeyboardSupport = () => {
    answer.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        submit.click();
      }
    })
  }




  return {
    addEventListeners: addEventListeners,
    clearInput       : clearInput,
    getUserInput     : getUserInput,
    hide             : hide,
    show             : show,
    showCurrent      : showCurrent

  }
})()