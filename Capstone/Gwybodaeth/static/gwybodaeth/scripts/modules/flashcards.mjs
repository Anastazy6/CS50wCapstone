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
    const shuffle    = document.getElementById("shuffle-button"         );
    const resort     = document.getElementById("resort-button"          );

    /**
     * Allows to set a flashcards view element's inner HTML to a chosen value. 
     * Eliminates the need to explicitly use .innerHTML method and ensures that
     * the attribute exists before setting its value.
     * @param {String} attr 
     * @param {String} value 
     */
    const _set = function(attr, value) {
      let immutable = [previous, next, shuffle, resort];

      if (attr in View && !(attr in immutable)) {
        View[`${attr}`].innerHTML = value;
      } else {
        console.log( `Cannot assign value "${value}" to attribute "${attr}"\
                      because it either doesn't exist or shouldn't be changed.`);
      }
    }

    /**
     * Allows to set values for multiple View elements with one function call.
     * Takes an object as an argument. The object consists of key-value pairs, where
     * the key is the name of a particular view element and the value is what it is going 
     * to be the element's inner HTML.
     * @param {Object} params 
     */
    const setValues = function(params) {
      Object.entries(params).forEach(([element, value]) => {
        _set(element, value);
      })
    }

    return {
      type      : type,
      id        : id,
      totalCards: totalCards,
      options   : options,
      main      : main,
      category  : category,
      previous  : previous,
      next      : next,
      shuffle   : shuffle,
      resort    : resort,
      setValues : setValues
    }
  })();



  class Flashcard {
    static flashcards   = [];
    static currentIndex = 0;
    static currentCard  = () => { return this.flashcards[this.currentIndex]; }

    static createList = (data) => {
      Object.entries(data).forEach(([id, values]) => {
        this.flashcards.push(new Flashcard(
            id,
            values['term'],
            values['def' ],
            values['cat' ],
            values['options']
        ));
      })
      return this;
    }

    static flip() {
      let currentCard = Flashcard.currentCard();
      if (View.type.innerHTML === 'Term') {
        currentCard.#showDefinition();
      } else{
        currentCard.#showTerm(); 
      } 
    }

    /**
     * Shuffles the flashcards list and shows the first card from the shuffled list.
     */
    static shuffle() {
      Flashcard.flashcards.sort(() => { return Math.random() - 0.5; });
      Flashcard.showFirst();
    }

    static resort() {
      Flashcard.flashcards.sort((first, second) => { return parseInt(first.id) - parseInt(second.id)} );
      Flashcard.showFirst();
    }

    static showFirst() {
      Flashcard.currentIndex = 0;
      Flashcard.currentCard().show();
    }

    static showNext() {
      if (Flashcard.currentIndex < (Flashcard.flashcards.length - 1)) {
        Flashcard.currentIndex++;
        Flashcard.currentCard().show();
      }
    }

    static showPrevious = () => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.currentCard().show();
      }
    }
    

    constructor(id, term, definition, category, options=null) {
      this.id         = id;
      this.term       = term;
      this.definition = definition;
      this.category   = category;
      this.options    = options;
    }
    

    show() {
      this.#showTerm();
      this.#showUnflippables();
    }

    #showTerm () {
      View.setValues({
        "type": "Term",
        "main": this.term
      })
    }

    #showDefinition() {
      View.setValues({
        "type": "Definition",
        "main": this.definition
      })
    }

    #showUnflippables() {
      View.setValues({
        "id"      : Flashcard.currentIndex + 1,
        "category": this.category
      })
    }
  }


  // Public

  const loadFlashcards = () => { 
    fetch(`/load/${_getStudySetID()}`)
    .then(response => response.json())
    .then(result => {
      _prepareData(result['terms']);
    });
  }

  // Private


  const _getStudySetID = () => {
    return window.location.pathname.slice(1).split("/")[0];
  }


  const _prepareData = (data) => {
    Flashcard.createList(data);
    _initialize();
    Flashcard.currentCard().show();
  }


  const _initialize = () => {
    _addEventListeners();
    _setDefault(Flashcard.flashcards.length);
  }


  const _addEventListeners = () => {
    _setFlippableElements();
    View.previous.onclick = Flashcard.showPrevious;
    View.next    .onclick = Flashcard.showNext;
    View.shuffle .onclick = Flashcard.shuffle;
    View.resort  .onclick = Flashcard.resort;
  }
  const _setFlippableElements = () => {
    const flippable = [View.main, View.category];
    flippable.forEach(view => {
      view.onclick = Flashcard.flip;
    })
  }

  const _setDefault = (count) => {
    View.setValues({
      'id'        : 1, 
      'totalCards': count
    })
  }

  // Return

  return {
    testFunction  : testFunction,
    loadFlashcards: loadFlashcards
  };
})();