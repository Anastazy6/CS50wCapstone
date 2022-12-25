export const Flashcards = (function(){
  const testFunction = () => {
    console.log("Flashcards module loaded successfully!");
  }

  const View = (function(){
    const type     = document.getElementById("flashcards-side-type"   );
    const id       = document.getElementById("flashcards-card-id"     );
    const options  = document.getElementById("flashcards-options"     );
    const main     = document.getElementById("flashcards-main"        );
    const category = document.getElementById("flashcards-category"    );
    const previous = document.getElementById("flashcards-button-left" );
    const next     = document.getElementById("flashcards-button-right");

    return {
      type    : type,
      id      : id,
      options : options,
      main    : main,
      category: category,
      previous: previous,
      next    : next
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

  const _runFlashcards = ( data) => {
    _setDefault(data[0]);
  }

  const _setDefault = (firstTerm) => {
    View.type    .innerHTML = "Term";
    View.id      .innerHTML = firstTerm.id;
    View.main    .innerHTML = firstTerm.term;
    View.category.innerHTML = firstTerm.category || "Uncategorized";
    // view.options = TODO (core or advanced);

  }

  // Return

  return {
    testFunction  : testFunction,
    loadFlashcards: loadFlashcards

  };

})();