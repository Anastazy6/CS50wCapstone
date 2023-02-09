export const View = (function() {
  const type       = document.getElementById("flashcards-side-type"   );
  const id         = document.getElementById("flashcards-current-id"  );
  const totalCards = document.getElementById("flashcards-total-cards" );
  const options    = document.getElementById("flashcards-options"     );
  const main       = document.getElementById("flashcards-main"        );
  const category   = document.getElementById("flashcards-category"    );
  const previous   = document.getElementById("flashcards-button-left" );
  const next       = document.getElementById("flashcards-button-right");
  const shuffle    = document.getElementById("shuffle-button"         );
  const sort       = document.getElementById("sort-button"            );


  /**
   * Eh, maybe later...
   */
  const initialize = (methods, cardsCount) => {
    _addEventListeners(methods);
    _setDefault(cardsCount);
  }

  const getCurrentType = () => {
    return type.innerHTML;
  }

  const show = (flashcard) => {
    showTerm(flashcard.card);
    id      .innerHTML = flashcard.index + 1;
    category.innerHTML = flashcard.card.category;
  }


  const showTerm = (card) => {
    type.innerHTML = "Term";
    main.innerHTML = card.term;
  }

  const showDefinition = (card) => {
    type.innerHTML = "Definition";
    main.innerHTML = card.definition;
  }

/**
 * Sets the default values for the View.
 * Setting "totalCards" to the number of study items in the study set should suffice.
 */
  const _setDefault = (count) => {
    totalCards.innerHTML = count;
  }



  /**
   *  Adds all the event listeners for the module. Insert new event listeners here.
   */
  const _addEventListeners = (methods) => {
    _setFlippableElements(methods.flip);
    
    let buttonMethodPairs = [
      [ previous, methods.showPrevious],
      [ next    , methods.showNext    ],
      [ shuffle , methods.shuffle     ],
      [ sort    , methods.sort        ]
    ]

    // Keep verbose for self-documentation.
    buttonMethodPairs.forEach(pair => { 
      let button = pair[0];
      let method = pair[1];

      button.onclick = method;
    })
  }



  /**
   *   Adds (onclick = Flashcard.flip) to the view elements which are meant to 
   *     flip the current flashcard when clicked.
   */
  const _setFlippableElements = (flipMethod) => {
    const flippable = [main, category];
    
    flippable.forEach(view => {
      view.onclick = flipMethod;
    })
  }

  return {
    getCurrentType: getCurrentType, 
    initialize    : initialize,
    show          : show,
    showTerm      : showTerm,
    showDefinition: showDefinition
  }
})()