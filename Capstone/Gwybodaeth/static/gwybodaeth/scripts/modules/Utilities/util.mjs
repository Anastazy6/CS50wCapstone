export const Util = (function() {
  

  const highlightCurrentLearningOption = () => {
    let currentOption = _getLearningOption() || 'set';  

    const optionButton = document.getElementById(`learning-options-${currentOption}`);
    if (optionButton) { 
      optionButton.classList.add("active-learning-option");
    }
  }


  const generateIndex = (function() {
    let index = 0;
    return function() {index += 1; return index;}
  })()


  const getRoute           = () => _getPath().slice(1).split("/");
  const getStudySetID      = () => getRoute()[1];
  const _getLearningOption = () => getRoute()[2];
  const _getPath           = () => window.location.pathname;

  return {
    generateIndex                 : generateIndex,
    getRoute                      : getRoute,
    getStudySetID                 : getStudySetID,
    highlightCurrentLearningOption: highlightCurrentLearningOption
  }

})()