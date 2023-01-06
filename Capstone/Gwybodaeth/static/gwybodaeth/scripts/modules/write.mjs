export const Write = function() {
  const testFunction = () => {
    console.log("Write module loaded successfully!");
  }
  
  const View = function() {
    const question = document.getElementById("write-question"          );
    const pass     = document.getElementById("write-pass"              );
    const answer   = document.getElementById("write-answer-area"       );
    const submit   = document.getElementById("write-answer-button"     );
    const category = document.getElementById("write-category"          );
    const label    = document.getElementById("write-textarea-label"    );
    const specials = document.getElementById("write-special-letters"   );
    const progress = document.getElementById("write-progress-container");

    const initialize = () => {
      _addEventListeners();
    }

    const _addEventListeners = () => {
      submit.onclick = _submitAnswer;
      pass  .onclick = _pass;
    }

    return {
      question  : question,
      pass      : pass,
      answer    : answer,
      submit    : submit,
      category  : category,
      label     : label,
      specials  : specials,
      progress  : progress,
      initialize: initialize
    }
  }();



  const Memory = function() {
    const items     = [];
    let   currentID = 0;

    const currentItem = () => {
      return items[currentID];
    }

    const shuffle = () => {
      items.sort(() => { return Math.random() - 0.5; });
    }

    const sort = () => {
      items.sort((first, second) => {return parseInt(first.id) - parseInt(second.id)});
    }

    return {
      items      : items,
      currentItem: currentItem,
      shuffle    : shuffle,
      sort       : sort
    }
  }();



  class StudyItem {
    #splitAnswers = (data) => {
      let answers = [];
      data.split(/[,;/]/).forEach(answer => {
        answers.push(answer.trim());
      })
      return answers;
    }
    
    constructor(id, terms, definitions, category, options=null) {
      this.id          = id;
      this.terms       = this.#splitAnswers(terms);     
      this.definitions = this.#splitAnswers(definitions);
      this.category    = category;
      this.options     = options;
    }
  }

  const loadItems = (data) => {
    Object.entries(data).forEach(([id, values]) => {
      Memory.items.push(new StudyItem(
          id,
          values['term'],
          values['def' ],
          values['cat' ],
          values['options']
      ))
    })

    _run();
  }

  const _run = () => {
    Memory.shuffle();
    View  .initialize();
    _showCurrent();
  }

  const _showCurrent = () => {
    let currentItem = Memory.currentItem();

    View.question.innerHTML = currentItem.definitions.join(', ');
    View.category.innerHTML = currentItem.category;
  }

  const _submitAnswer = () => {
    let input = View.answer.value.split(/[,;/]/);
    let answers = Memory.currentItem().terms;
    console.log(`Answer sent: ${input}`);

    if (_verifyAnswers(answers, input)) {
      console.log("Answer correct");
    } else {
      console.log(`Answer incorrect. Correct answers: ${answers.join(', ')}`);
    }

    return false;
  }

  const _verifyAnswers = (questions, answers) => {
    console.log(`Questions: ${questions}`)
    answers.forEach(answer => {
      console.log(`Checking answer: ${answer}`);
      if (questions.includes(answer.trim())) { 
        console.log("Found it!");
        return true;
      } else {
        console.log("Nope");
      }
    })
    console.log("Nothing was correct...");
    return false;
  }

  const _pass = () => {
    console.log("IDK, next question please!");
  }

  return {
    testFunction: testFunction,
    loadItems   : loadItems
  };
}();