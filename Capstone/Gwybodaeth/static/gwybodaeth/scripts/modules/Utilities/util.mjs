export const Util = (function() {
  
  const highglighCurrentLearningOption = () => {
    let currentOption = _getCurrentLearningOption() || 'set';  

    const optionButton = document.getElementById(`learning-options-${currentOption}`);
    if (optionButton) { 
      optionButton.classList.add("active-learning-option");
    }
  }

  const _getCurrentLearningOption = () => {
    return window.location.pathname.slice(1).split("/")[2];
  }

  return {
    highglighCurrentLearningOption: highglighCurrentLearningOption
  }

})()