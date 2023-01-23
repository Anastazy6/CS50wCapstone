export const Choice = (function() {
  const question = document.getElementById("lmc-term"    );
  const category = document.getElementById("lmc-category");
  const answerA  = document.getElementById("lmc-answer-A");
  const answerB  = document.getElementById("lmc-answer-B");
  const answerC  = document.getElementById("lmc-answer-C");
  const answerD  = document.getElementById("lmc-answer-D");

  const answers  = [answerA, answerB, answerC, answerD];

  const showCurrent = (correct, traps) => {
    question.innerHTML = correct.definitions;
    category.innerHTML = correct.category;

    
    _setAnswers(correct, traps)
  }

  const _setAnswers = (correct, traps) => {
    let fields = _shuffleAnswers();

    _setCorrect(fields.correct, correct);
    _setTraps  (fields.traps,   traps  );
  }

  const _setCorrect = (field, answer) => {
    field.innerHTML = answer.terms;
    field.onclick   = _correctAnswerClicked;
  }

  const _setTraps = (fields, traps) => {
    fields.forEach(field => {
      field.innerHTML = traps[0].terms;
      field.onclick   = _trapClicked;
      traps.shift();
    })
  }

  const _shuffleAnswers = () => {
    let sortedAnswers = answers.sort(() => { return Math.random() - 0.5; })

    return {
      correct: sortedAnswers[0],
      traps  : sortedAnswers.slice(1)
    }
  }

  const _correctAnswerClicked = () => {
    console.log("Sigh, you made it...");
  }

  const _trapClicked = () => {
    console.log("Haha, u lost!");
  }


  return {
    showCurrent: showCurrent
  }
})()