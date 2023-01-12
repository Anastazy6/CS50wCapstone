/**
 * View shown when the user finishes a study set.
 */
export const Summary = (function() {
  const container  = document.getElementById("write-summary-container");
  const correct    = document.getElementById("summary-correct"        );
  const incorrect  = document.getElementById("summary-incorrect"      );
  const percentage = document.getElementById("summary-percentage"     );
  
  const show = (data) => {
    container.classList.remove('hidden');

    _setValues(data);
  }

  const hide = () => {
    container.classList.add('hidden');
  }

  const _setValues = (data) => {
    correct   .innerHTML = data.correct;
    incorrect .innerHTML = data.incorrect;
    percentage.innerHTML = data.percentage;
  }

  return {
    show: show,
    hide: hide
  }
})()