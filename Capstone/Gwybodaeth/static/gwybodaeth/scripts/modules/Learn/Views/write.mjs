export const Write = (function() {
  const container = document.getElementById("learn-writing-container");




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