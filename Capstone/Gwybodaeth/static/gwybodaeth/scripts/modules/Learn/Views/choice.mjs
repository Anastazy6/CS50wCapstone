export const Choice = (function() {
  const question = document.getElementById("lmc-term"    );
  const category = document.getElementById("lmc-category");
  const answerA  = document.getElementById("lmc-answer-A");
  const answerB  = document.getElementById("lmc-answer-B");
  const answerC  = document.getElementById("lmc-answer-C");
  const answerD  = document.getElementById("lmc-answer-D");


  const showCurrent = (current, traps) => {
    question.innerHTML = current.definitions;
    category.innerHTML = current.category;
  }

  return {
    showCurrent: showCurrent
  }
})()