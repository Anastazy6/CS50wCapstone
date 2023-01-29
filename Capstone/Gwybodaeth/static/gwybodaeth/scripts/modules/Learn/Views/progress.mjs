import { Memory } from "../Memory/memory.mjs";

export const Progress = (function() {
  const remainingChoices = document.getElementById('learn-remaining-choices'); 
  const remainingWrites  = document.getElementById('learn-remaining-writes' ); 
  const failedChoices    = document.getElementById('learn-failed-choices'   ); 
  const failedWrites     = document.getElementById('learn-failed-writes'    ); 


  const updateStats = () => {
    let stats = Memory.getStats();

    remainingChoices.innerHTML = stats.remainingChoices;
    remainingWrites .innerHTML = stats.remainingWrites;

    failedChoices   .innerHTML = stats.failedChoices;
    failedWrites    .innerHTML = stats.failedWrites;

    
  }

  return {
    updateStats: updateStats
  }
})()