export const Util = (function() {
  

  const highlightCurrentLearningOption = () => {
    let currentOption = _getCurrentLearningOption() || 'set';  

    const optionButton = document.getElementById(`learning-options-${currentOption}`);
    if (optionButton) { 
      optionButton.classList.add("active-learning-option");
    }
  }


  const generateIndex = (function() {
    let index = 0;
    return function() {index += 1; return index;}
  })()

  const getStudySetID = () => {
    return window.location.pathname.slice(1).split("/")[1];
  }


  const _getCurrentLearningOption = () => {
    return window.location.pathname.slice(1).split("/")[2];
  }

  return {
    generateIndex                 : generateIndex,
    getStudySetID                 : getStudySetID,
    highlightCurrentLearningOption: highlightCurrentLearningOption
  }

})()