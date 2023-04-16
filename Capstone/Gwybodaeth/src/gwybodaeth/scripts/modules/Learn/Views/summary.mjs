export const Summary = (function() {
  const container = document.getElementById('learn-summary-container');

  
  // Gets learn summary value span for each of them
  const totalChoices  = document.getElementById("ls-choices"  ).firstElementChild; 
  const failedChoices = document.getElementById("lsc-failures").firstElementChild;
  const choicesRatio  = document.getElementById("lsc-ratio"   ).firstElementChild;
  const totalWrites   = document.getElementById("ls-writes"   ).firstElementChild;
  const failedWrites  = document.getElementById("lsw-failures").firstElementChild;
  const writesRatio   = document.getElementById("lsw-ratio"   ).firstElementChild;



  const hide = () => {
    container.classList.add('hidden');
  }

  const show = () => {
    container.classList.remove('hidden');
  }

  const showStats = (stats) => {
    totalChoices .innerHTML = stats.correctChoices + stats.failedChoices;
    failedChoices.innerHTML = stats.failedChoices;
    choicesRatio .innerHTML = _calculateRatio(stats.correctChoices, stats.failedChoices);

    totalWrites .innerHTML = stats.correctWrites + stats.failedWrites;
    failedWrites.innerHTML = stats.failedWrites;
    writesRatio .innerHTML = _calculateRatio(stats.correctWrites, stats.failedWrites);
  }


  
  const _calculateRatio = (correct, incorrect) => {
    return Math.round((incorrect / correct) * 100) / 100;
  }


  return {
    hide     : hide,
    show     : show  ,
    showStats: showStats
  }
})()