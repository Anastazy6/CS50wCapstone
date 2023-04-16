/**
 * Contains references and methods used to show and modify progress bars and counters
 */
export const Progress = (function() {
  let totalItems;
  
  //--------------------------------------------------------------------------
  //                     Progress: HTML elements references
  //--------------------------------------------------------------------------
  
  // Progress counters
  const correctCounter   = document.getElementById("correct-counter"         );
  const incorrectCounter = document.getElementById("incorrect-counter"       );
  const remainingCounter = document.getElementById("remaining-counter"       );
  const totalCounters    = document.querySelectorAll(".total-items"          );

  // Filled bars
  const correctFull      = document.getElementById("progress-bar-correct"    );
  const incorrectFull    = document.getElementById("progress-bar-incorrect"  );
  const remainingFull    = document.getElementById("progress-bar-remaining"  );

  // Empty (darker) bars
  const correctEmpty     = document.getElementById("progress-empty-correct"  );
  const incorrectEmpty   = document.getElementById("progress-empty-incorrect");
  const remainingEmpty   = document.getElementById("progress-empty-remaining");

  //--------------------------------------------------------------------------
  //                     Progress: public methods
  //--------------------------------------------------------------------------

  const initialize = (numberOfItems) => {
    let counters = {
      correct  : 0,
      incorrect: 0,
      remaining: numberOfItems
    };
    
    _setTotalItems(numberOfItems);
    _setTotalCounters();
    update(counters);
  }

  const update = (counters) => {
    _setCounters(counters);
    _setProgress(counters);
  }


  //--------------------------------------------------------------------------
  //                 Progress: private methods for counters
  //--------------------------------------------------------------------------


  const _setCounters = (counters) => {
    correctCounter  .innerHTML = counters.correct;
    incorrectCounter.innerHTML = counters.incorrect;
    remainingCounter.innerHTML = counters.remaining;
  }


  const _setTotalItems = (numberOfItems) => {
    totalItems = numberOfItems;
  }


  const _setTotalCounters = () => {
    totalCounters.forEach(totalCounter => {
      totalCounter.innerHTML = totalItems;
    })
  }

  //--------------------------------------------------------------------------
  //                 Progress: private methods for progress bars
  //--------------------------------------------------------------------------

  const _setProgress = (counters) => {
    let values = _calculateProgressBars(counters)
    
    _setFullBars (values);
    _setEmptyBars(values);
  }


  const _calculateProgressBars = (counters) => {
    return {
      correct  : (counters.correct   / totalItems) * 100,
      incorrect: (counters.incorrect / totalItems) * 100,
      remaining: (counters.remaining / totalItems) * 100
    }
  }


  const _setFullBars = (values) => {
    _setProgressArias (values);
    _setProgressWidths(values);
  }

  const _setEmptyBars = (values) => {
    _setEmptyArias (values);
    _setEmptyWidths(values);
  }



  const _setProgressArias = (values) => {
    let pairs = [
      [correctFull  , values.correct  ],
      [incorrectFull, values.incorrect],
      [remainingFull, values.remaining]
    ]
    
    pairs.forEach(pair => {
      pair[0].setAttribute("aria-valuenow", pair[1]);
    })
  } 

  const _setProgressWidths = (values) => {
    let pairs = [
      [correctFull  , values.correct  ],
      [incorrectFull, values.incorrect],
      [remainingFull, values.remaining]
    ]

    pairs.forEach(pair => {
      pair[0].style.width = `${pair[1]}%`;
    })
  }


  const _setEmptyArias = (values) => {
    let pairs = [
      [correctEmpty  , values.correct  ],
      [incorrectEmpty, values.incorrect],
      [remainingEmpty, values.remaining]
    ]

    pairs.forEach(pair => {
      pair[0].setAttribute("aria-valuenow", 100 - pair[1]);
    })
  }

  
  const _setEmptyWidths = (values) => {
    let pairs = [
      [correctEmpty  , values.correct  ],
      [incorrectEmpty, values.incorrect],
      [remainingEmpty, values.remaining]
    ]

    pairs.forEach(pair => {
      pair[0].style.width = `${100 - pair[1]}%`;
    })
  }


  return {
    initialize: initialize,
    update    : update
  }
})()