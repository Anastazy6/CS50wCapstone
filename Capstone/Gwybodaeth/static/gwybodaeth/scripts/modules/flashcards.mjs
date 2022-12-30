export const Flashcards = (function(){
  const testFunction = () => {
    console.log("Flashcards module loaded successfully!");
  }


  /**
   * A private submodule for the Flashcards module. Contains references to all the
   * HTML elements used to display flashcards data and perform actions such as
   * flipping the flashcard or changing the currently viewed flashcard.
   * 
   */
  const View = (function(){
    const container  = document.getElementById("flashcards-container"   );
    const type       = document.getElementById("flashcards-side-type"   );
    const id         = document.getElementById("flashcards-current-id"  );
    const totalCards = document.getElementById("flashcards-total-cards" );
    const options    = document.getElementById("flashcards-options"     );
    const main       = document.getElementById("flashcards-main"        );
    const category   = document.getElementById("flashcards-category"    );
    const previous   = document.getElementById("flashcards-button-left" );
    const next       = document.getElementById("flashcards-button-right");

    /**
     * Allows to set a flashcards view element's inner HTML to a chosen value. 
     * Eliminates the need to explicitly use .innerHTML method and ensures that
     * the attribute exists before setting its value.
     * @param {String} attr 
     * @param {String} value 
     */
    const set = function(attr, value) {
      if (attr in View) { View[`${attr}`].innerHTML = value };
    }

    return {
      container : container,
      type      : type,
      id        : id,
      totalCards: totalCards,
      options   : options,
      main      : main,
      category  : category,
      previous  : previous,
      next      : next,
      set       : set,
    }
  })();



  const FlashcardsFactory = (id, term, definition, category, options=null) => {
    const show = function() {
      _showTerm();
      View.set("id",       _currentCardIndex + 1);
      View.set("category", category);
    }

    const flip = () => {
      if (View.type.innerHTML === 'Term') {
        _showDefinition();
      } else{
        _showTerm(); 
      } 
    };

    const _showTerm = function() {
      View.set("type", "Term");
      View.set("main", term);
    }

    const _showDefinition = function() {
      View.set("type", "Definition");
      View.set("main", definition);
    }

    return {  id, 
              term,
              definition,
              category,
              options,
              show,
              flip
            };
  }



  // Public

  const loadFlashcards = () => { 
    fetch(`/load/${_getStudySetID()}`)
    .then(response => response.json())
    .then(result => {
      _runFlashcards(_createFlashcardsList(result['terms']));
    });
  }
  

  // Private
  let _currentCardIndex;
  let _flashcards;
  const _getCurrentCard = () => { return _flashcards[_currentCardIndex]; }



  const _getStudySetID = () => {
    return window.location.pathname.slice(1).split("/")[0];
  }



  const _createFlashcardsList = (data) => {
    let flashcardsList = [];

    Object.entries(data).forEach(([id, values]) => {
      flashcardsList.push(FlashcardsFactory(
          id,
          values['term'],
          values['def' ],
          values['cat' ],
          values['options'] || null
      ));
    })
    return flashcardsList;
  }



  const _runFlashcards = (flashcardsList) => {
    _initialize(flashcardsList);
    _addEventListeners();
  }



  const _initialize = (flashcardsList) => {
    _flashcards = flashcardsList;
    _setDefault(_flashcards.length);
    _getCurrentCard().show();
  }



  const _addEventListeners = () => {
    View.main    .onclick = _getCurrentCard().flip;
    View.previous.onclick = _showPreviousCard;
    View.next    .onclick = _showNextCard;
  }


/*
  const _flip = () => {
    console.log(_getCurrentCard());
    if (View.type.innerHTML === 'Term') {
      _getCurrentCard()._showDefinition();
    } else{
      _getCurrentCard()._showTerm(); 
    } 
  };
*/


  const _showPreviousCard = () => {
    if (_currentCardIndex > 0) {
      _currentCardIndex--;
      _getCurrentCard().show();
    }
  }



  const _showNextCard = () => {
    if (_currentCardIndex < (_flashcards.length - 1)) {
      _currentCardIndex++;
      _getCurrentCard().show();
    } 
  }



  const _setDefault = (count) => {
    _currentCardIndex   = 0;
    View.set('id',         `${parseInt(_currentCardIndex) + 1}`); // 1
    View.set("totalCards", count);
  }

  
  // Return

  return {
    testFunction  : testFunction,
    loadFlashcards: loadFlashcards

  };

})();