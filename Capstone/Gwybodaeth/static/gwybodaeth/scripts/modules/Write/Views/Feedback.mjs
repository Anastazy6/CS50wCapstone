  // ----------------------------------------------
  //    Submodule for namespacing Feedback view.
  // ----------------------------------------------

  export const Feedback = (function () {

    const container   = document.getElementById("write-feedback-container");
    const value       = document.getElementById("write-feedback-value"    );
    const question    = document.getElementById("write-feedback-question" );
    const input       = document.getElementById("write-feedback-input"    );
    const answers     = document.getElementById("write-feedback-answers"  );
    const btnContinue = document.getElementById("write-continue-button"   );
    const retry       = document.getElementById("write-retry-button"      );
    const override    = document.getElementById("write-override-button"   );


    // ----------------------------------
    //         Feedback: public
    // ----------------------------------

    const addEventListeners = (methods) => {
      retry      .onclick = methods.retry;
      btnContinue.onclick = methods.resolve;
      override   .onclick = methods.resolve;
    }

    const showNegative = (currentItem, userInput) => {
      _show();
      _setNegativeStyle();
      _setNegativeResolution();
      _showData(currentItem, userInput);

    }

    const showPositive = (currentItem, userInput) => {
      _show();
      _setPositiveStyle();
      _setPositiveResolution();
      _showData(currentItem, userInput);
    }

    const hide = () => {
      container.classList.add   ('hidden');
    }


    // ----------------------------------
    //         Feedback: private
    // ----------------------------------


    const _show = () => {  
      container.classList.remove('hidden'); 
    } 


    const _showData = (currentItem, userInput) => {
      question.innerHTML = currentItem.definitions.join(', ');
      answers .innerHTML = currentItem.terms      .join(', ');
      input   .innerHTML = userInput;
    }

    // --------------------------------------
    //        Styling incorrect answers
    // --------------------------------------

    const _setNegativeStyle = () => {
      _setNegativeValue();
      _setNegativeOverride();
      _setNegativeInput();
    }

    const _setNegativeValue = () => {
      value.innerHTML = "How pathetic!";
      value.classList.add   ('text-danger' );
      value.classList.remove('text-success');
    }

    const _setNegativeOverride = () => {
      override.innerHTML = "Override as correct";
      override.classList.add   ('btn-outline-success');
      override.classList.remove('btn-outline-danger' );
    }

    const _setNegativeInput = () => {
      input.classList.add   ('text-danger');
      input.classList.remove('text-success');
    }

    // --------------------------------------
    //         Styling correct answers
    // --------------------------------------

    const _setPositiveStyle = () => {
      _setPositiveValue();
      _setPositiveOverride();
      _setPositiveInput();
    }

    const _setPositiveValue = () => {
      value.innerHTML = "Meh, beginners' luck...";
      value.classList.add   ('text-success');
      value.classList.remove('text-danger' );
    }

    const _setPositiveOverride = () => {
      override.innerHTML = "Override as incorrect";
      override.classList.add   ('btn-outline-danger' );
      override.classList.remove('btn-outline-success');
    }

    const _setPositiveInput = () => {
      input.classList.add   ('text-success');
      input.classList.remove('text-danger' );
    }

    // ---------------------------------------------------
    //  Setting actions for continue and override buttons
    // ---------------------------------------------------

    const _setPositiveResolution = () => {
      btnContinue.dataset.resolution = 'positive';
      override   .dataset.resolution = 'negative';
    }

    const _setNegativeResolution = () => {
      btnContinue.dataset.resolution = 'negative';
      override   .dataset.resolution = 'positive';
    }


    return {
      addEventListeners: addEventListeners,
      hide             : hide,
      showNegative     : showNegative,
      showPositive     : showPositive,
      retry            : retry
    }
  })();