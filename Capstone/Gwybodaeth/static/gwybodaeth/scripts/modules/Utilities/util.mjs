export const Util = (function() {
  
  const autoGrow = (element) => {
    element.style.height = '5px';
    element.style.height = `${element.scrollHeight}px`;
  }


  const highlightCurrentLearningOption = () => {
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
    autoGrow                      : autoGrow,
    highlightCurrentLearningOption: highlightCurrentLearningOption
  }

})()