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

  /*  const setDefault = function(firstCard, numberOfCards) {
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
      set("type", "Term");
      set("main", currentCard.term);
    }

    const _showDefinition = function() {
      set("type", "Definition");
      set("main", currentCard.definition);
    }


    const set = function(attr, value) {
      if (attr in View) { View[`${attr}`].innerHTML = value };
    }

    // TODO: This solution doesn't work as intended. Clicking on main should flip the card too.
    container.onclick = function(event) {
      if (this === event.target) { flip() };
    }
  */
    return {
      type      : type,
      id        : id,
      totalCards: totalCards,
      options   : options,
      main      : main,
      category  : category,
      previous  : previous,
      next      : next,
      set       : set,
   //   setDefault: setDefault
    }
  })();

  const FlashcardsFactory = (id, term, definition, category, options=null) => {
    const show = function(type="Term") {
      View.set("type",      this.type);
      View.set("main",     (this.type === "Term") ? this.term : this.definition );
      View.set("category",  this.category);
    }

    const flip = function() {
      (View.type.innerHTML === 'Term') ? _showDefinition() : _showTerm(); 
    };

    const _showTerm = function() {
      View.set("type", "Term");
      View.set("main", currentCard.term);
    }

    const _showDefinition = function() {
      set("type", "Definition");
      set("main", currentCard.definition);
    }

    return {id, term, definition, category, options,
            show, flip};
  }

  // Public

  let currentCard;


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



  const _runFlashcards = (flashcards) => {
    _setDefault(flashcards.length);
    flashcards[currentCard].show();
    
  }

  const _setDefault = (count) => {
    currentCard   = 0;
    View.set('id',         `${parseInt(currentCard) + 1}`);
    View.set("totalCards", count);
  }



  // Return

  return {
    testFunction  : testFunction,
    loadFlashcards: loadFlashcards

  };

})();