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
    const type       = document.getElementById("flashcards-side-type"   );
    const id         = document.getElementById("flashcards-current-id"  );
    const totalCards = document.getElementById("flashcards-total-cards" );
    const options    = document.getElementById("flashcards-options"     );
    const main       = document.getElementById("flashcards-main"        );
    const category   = document.getElementById("flashcards-category"    );
    const previous   = document.getElementById("flashcards-button-left" );
    const next       = document.getElementById("flashcards-button-right");

    let currentCard;
    let number0fCards;

    const setDefault = function(firstCard, numberOfCards) {
      currentCard = firstCard;
      _set("type",       "Term");
      _set("id" ,        '1');
      _set("totalCards", numberOfCards);
      _set("main",       currentCard.term);
      _set("category",   currentCard.category || "Uncategorized");
      // view.options = TODO (core or advanced);
  
    }

    const flip = function() {
      (type.innerHTML === 'Term') ? _showDefinition() : _showTerm(); 
    };

    const _showTerm = function() {
      _set("type", "Term");
      _set("main", currentCard.term);
    }

    const _showDefinition = function() {
      _set("type", "Definition");
      _set("main", currentCard.definition);
    }


    const _set = function(attr, value) {
      if (attr in View) { View[`${attr}`].innerHTML = value };
    }

    main.onclick = flip;

    return {
      type      : type,
      id        : id,
      totalCards: totalCards,
      options   : options,
      main      : main,
      category  : category,
      previous  : previous,
      next      : next,
      setDefault: setDefault
    }
  })();

  // Public

  const loadFlashcards = () => { 
    fetch(`/load/${_getStudySetID()}`)
    .then(response => response.json())
    .then(result => {
      _runFlashcards(_createFlashcardsList(result['terms']));
    });
  }
  

  // Private

  const _getStudySetID = () => {
    return window.location.pathname.slice(1).split("/")[0];
  }

  const _createFlashcardsList = (data) => {
    let flashcardsList = [];

    Object.entries(data).forEach(([id, values]) => {
      flashcardsList.push(_flashcardsFactory(
          id,
          values['term'],
          values['def' ],
          values['cat' ],
          values['options'] || null
      ));
    })
    return flashcardsList;
  }

  const _flashcardsFactory = (id, term, definition, category, options=null) => {
    return {id, term, definition, category, options};
  }

  const _runFlashcards = (data) => {
    View.setDefault(data[0], data.length);
  }



  // Return

  return {
    testFunction  : testFunction,
    loadFlashcards: loadFlashcards

  };

})();