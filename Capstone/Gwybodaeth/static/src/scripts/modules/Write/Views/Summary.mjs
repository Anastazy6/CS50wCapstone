/**
 * View shown when the user finishes a study set.
 */
export const Summary = (function() {
  const container   = document.getElementById("write-summary-container");

  const correct     = document.getElementById("summary-correct"        );
  const incorrect   = document.getElementById("summary-incorrect"      );
  const percentage  = document.getElementById("summary-percentage"     );

  const btnContinue = document.getElementById("summary-continue-button");

  const roundsView  = document.getElementById("summary-rounds-wrapper" );

  // Labels for failure items in the summary
  const protolabels = [ 
      ['input' , 'You wrote'     ],
      ['answer', 'Correct answer'] 
  ];

  const show = () => container.classList.remove('hidden');
  const hide = () => container.classList.add   ('hidden');


  const addEventListeners = (methods) => {
    btnContinue.onclick = methods.startNextRound;
  }


  const setValues = (data) => {
    correct   .innerHTML = data.correct;
    incorrect .innerHTML = data.incorrect;
    percentage.innerHTML = data.percentage;
  }



  const showRounds = (roundsData) => {
    roundsView.innerHTML = ''; // clear view
    
    roundsData.forEach(round => {
      showRoundData(round);
    })
  }



  const showRoundData = (round) => {
    const fragment = document.createElement('div');

    fragment.classList.add('summary-round-container');
    
    _addHeaderTo  (fragment, round.id);

    if (_hasFailues(round)) {         // TODO: (this looks ugly) => refactor when there's nothing better to do.
      _addLabelsTo  (fragment);
      _addFailuresTo(fragment, round);
    } else {
      _addSuccessTo(fragment);
    }

    roundsView.append(fragment);
  }


  // ***************************************************************************
  //     Private methods which are only meant to add a layer of abstraction
  // ***************************************************************************


  const _addHeaderTo = (fragment, id) => {
    fragment.append(_createRoundHeader(id));
  }


  const _addLabelsTo = (fragment) => {
    protolabels.forEach(label => {
      fragment.append(_createLabel(label[0], label[1]))
    })
  }


  const _addFailuresTo = (fragment, round) => {
    const container = document.createElement('div');
    container.classList.add('summary-items-container');

    round.data.forEach(failure => {
      container.append(_createFailureItem(failure));
    })

    fragment.append(container);
  }


  const _addSuccessTo = (fragment) => {
    const success = document.createElement('div');

    // Place the success message where the label for user input is.
    success.classList.add('failure-user-input'); 
    success.innerHTML = "You have written everything correctly!"

    fragment.append(success);
  }


  // ***************************************************************************
  //                Private methods (which actually do something)
  // ***************************************************************************


  const _createFailureItem = (failure) => {
    const container = document.createElement('div');
    
    container.classList.add('summary-failure-item');
    container.append(_addUserInput   (failure));
    container.append(_addCorrectValue(failure));

    return container;
  }



  const _addUserInput = (failure) => {
    const userInput = document.createElement('div');

    userInput.classList.add('failure-user-input');
    userInput.innerHTML = failure['answer']

    return userInput;
  }



  const _addCorrectValue = (failure) => {
    const correctValue = document.createElement('div');

    correctValue.classList.add("failure-correct-value");
    correctValue.innerHTML = failure['item']['terms'].join(', ');

    return correctValue;
  }



  const _createRoundHeader = (roundID) => {
    const header = document.createElement('h2');

    header.classList.add('summary-round-header');
    header.innerHTML = `Round ${roundID}`;
    
    return header;
  }



  const _createLabel = (name, value) => {
    const label = document.createElement('div');
    
    label.classList.add(`summary-${name}-label`);
    label.innerHTML = value;

    return label;
  }


  const _hasFailues = (round) => (round.data.length === 0) ? false : true;
  



  return {
    addEventListeners: addEventListeners,
    hide             : hide,
    setValues        : setValues,
    show             : show,
    showRounds       : showRounds
  }
})()