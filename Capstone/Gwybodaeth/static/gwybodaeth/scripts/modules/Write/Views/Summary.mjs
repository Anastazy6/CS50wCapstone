/**
 * View shown when the user finishes a study set.
 */
export const Summary = (function() {
  const container  = document.getElementById("write-summary-container" );
  const correct    = document.getElementById("summary-correct"         );
  const incorrect  = document.getElementById("summary-incorrect"       );
  const percentage = document.getElementById("summary-percentage"      );
  const rounds     = document.getElementById("summary-rounds-container");
  
  const show = () => container.classList.remove('hidden');
  const hide = () => container.classList.add   ('hidden');


  const setValues = (data) => {
    correct   .innerHTML = data.correct;
    incorrect .innerHTML = data.incorrect;
    percentage.innerHTML = data.percentage;
  }


  const showRoundData = (round) => {
    const fragment = document.createDocumentFragment('div');

    round.forEach(failure => {
      fragment.append(_createFailureItem(failure));
    })

    rounds.innerHTML = fragment;
  }


  const _createFailureItem = (failure) => {
    const container = document.createElement('div');
    
    container.classList.add('summary-failure-item');

    container.append(_addUserInput   (failure));
    container.append(_addCorrectValue(failure));
  }


  const _addUserInput = (failure) => {
    const userInput = document.createElement('div');

    userInput.classList.add('failure-user-input');
    userInput.innerHTML = failure['user-input']
  }





  return {
    hide         : hide,
    setValues    : setValues,
    show         : show,
    showRoundData: showRoundData
  }
})()