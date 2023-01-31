export const Summary = (function() {
  const container = document.getElementById('learn-summary-container');


  const hide = () => {
    container.classList.add('hidden');
  }

  const show = () => {
    container.classList.remove('hidden');
  }


  return {
    hide: hide,
    show: show  
  }
})()