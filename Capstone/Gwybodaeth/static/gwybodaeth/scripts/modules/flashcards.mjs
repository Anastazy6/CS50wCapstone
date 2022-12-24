export const Flashcards = (function(){
  const testFunction = () => {
    console.log("Flashcards module loaded successfully!");
  }

  // Public

  const loadFlashcards = (flashcardsView) => {
    console.log("Study set id is: " + _getStudySetID());
    
    fetch(`/load/${_getStudySetID()}`)
    .then(response => response.json())
    .then(result => {
      console.log(result['terms']);
    })
  }

  // Private
  const _getStudySetID = () => {
    return window.location.pathname.slice(1).split("/")[0];
  }

  // Return

  return {
    testFunction  : testFunction,
    loadFlashcards: loadFlashcards

  };

})();