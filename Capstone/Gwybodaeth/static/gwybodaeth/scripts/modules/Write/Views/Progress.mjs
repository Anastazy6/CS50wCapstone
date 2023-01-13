/**
 * Contains references and methods used to show and modify progress bars and counters
 */
export const Progress = (function() {
  let totalItems;
  
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



  const _setFullBars = (values) => {
    _setProgressArias (values);
    _setProgressWidths(values);
  }

  const _setEmptyBars = (values) => {
    _setEmptyArias (values);
    _setEmptyWidths(values);
  }



  const _setProgressArias = (values) => {
    correctFull  .setAttribute("aria-valuenow", values.correct  );
    incorrectFull.setAttribute("aria-valuenow", values.incorrect);
    remainingFull.setAttribute("aria-valuenow", values.remaining);
  } 

  const _setProgressWidths = (values) => {
    correctFull  .style.width = `${values.correct}%`;
    incorrectFull.style.width = `${values.incorrect}%`;
    remainingFull.style.width = `${values.remaining}%`;
  }


  const _setEmptyArias = (values) => {
    correctEmpty  .setAttribute("aria-valuenow", 100 - values.correct  );
    incorrectEmpty.setAttribute("aria-valuenow", 100 - values.incorrect);
    remainingEmpty.setAttribute("aria-valuenow", 100 - values.remaining);
  }

  const _setEmptyWidths = (values) => {
    correctEmpty  .style.width = `${100 - values.correct}%`;
    incorrectEmpty.style.width = `${100 - values.incorrect}%`;
    remainingEmpty.style.width = `${100 - values.remaining}%`;
  }


  return {
    initialize: initialize,
    update    : update
  }
})()