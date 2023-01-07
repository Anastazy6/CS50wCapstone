export const Write = function() {
  const testFunction = () => {
    console.log("Write module loaded successfully!");
  }
  


  const View = function() {
    const question         = document.getElementById("write-question"          );
    const pass             = document.getElementById("write-pass"              );
    const answer           = document.getElementById("write-answer-area"       );
    const submit           = document.getElementById("write-answer-button"     );
    const category         = document.getElementById("write-category"          );
    const label            = document.getElementById("write-textarea-label"    );
    const specials         = document.getElementById("write-special-letters"   );
    const progress         = document.getElementById("write-progress-container");

    const correctCounter   = document.getElementById("correct-counter"         );
    const incorrectCounter = document.getElementById("incorrect-counter"       );
    const remainingCounter = document.getElementById("remaining-counter"       );
    const totalCounter     = document.querySelectorAll(".total-items"          );

    const initialize = (itemsCount) => {
      _setCounters();
      _setTotalCounters(itemsCount);
      _addEventListeners();
    }

    const update = () => {
      _setCounters();
    }

    const _addEventListeners = () => {
      submit.onclick = _submitAnswer;
      pass  .onclick = _pass;
    }

    const _setTotalCounters = (itemsCount) => {
      totalCounter.forEach(counter => {
        counter.innerHTML = itemsCount;
      })
    }

    const _setCounters = () => {
      correctCounter  .innerHTML = Memory.countCorrect  ();
      incorrectCounter.innerHTML = Memory.countIncorrect();
      remainingCounter.innerHTML = Memory.countRemaining();
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
      initialize: initialize,
      update    : update
    }
  }();



  const Memory = function() {
    const remaining = [];
    const correct   = [];
    const incorrect = [];

    const loadItem = (item) => {
      remaining.push(item);
    }

    const currentItem = () => {
      return remaining[0];
    }

    const markAsCorrect = () => {
      correct.push(remaining.shift());
    }

    const markAsIncorrect = () => {
      incorrect.push(remaining.shift());
    }

    const shuffle = () => {
      remaining.sort(() => { return Math.random() - 0.5; });
    }

    const sort = () => {
      remaining.sort((first, second) => {return parseInt(first.id) - parseInt(second.id)});
    }

    const countRemaining = () => {return remaining.length;}

    const countCorrect   = () => {return correct  .length;}

    const countIncorrect = () => {return incorrect.length;}

    return {
      countRemaining : countRemaining,
      countCorrect   : countCorrect,
      countIncorrect : countIncorrect,
      currentItem    : currentItem,
      loadItem       : loadItem,
      markAsCorrect  : markAsCorrect,
      markAsIncorrect: markAsIncorrect,
      shuffle        : shuffle,
      sort           : sort
    }
  }();



  class StudyItem {
    constructor(id, terms, definitions, category, options=null) {
      this.id          = id;
      this.terms       = this.#splitAnswers(terms);     
      this.definitions = this.#splitAnswers(definitions);
      this.category    = category;
      this.options     = options;
    }

    #splitAnswers = (data) => {
      let answers = [];
      data.split(/[,;/]/).forEach(answer => {
        answers.push(answer.trim());
      })
      return answers;
    }
  }



  const loadItems = (data) => {
    Object.entries(data).forEach(([id, values]) => {
      Memory.loadItem(new StudyItem(
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
    View  .initialize(Memory.countRemaining());
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

    if (_verifyAnswers(answers, input)) {
      Memory.markAsCorrect();
    } else {
      Memory.markAsIncorrect();
    }

    View.update();
    _showCurrent();
    return false;
  }

  const _verifyAnswers = (questions, answers) => {
    return _clean(answers).some(answer => _clean(questions).includes(answer));
  }

  /**
   * Takes an array of strings and makes it easier to compare with another cleaned array of strings by
   *   trimming its both ends (so the extra spaces won't interfere with the comparison process),
   *   lowercases every element (so if both arrays are cleaned, then the comparison becomes case insensitive)
   *   and removes characters which are to be ignored during the comparison (ATM it's just the full stop).
   * @param {Array<String>} choices 
   * @returns Array<string> with its elements trimmed, lowercased and without these characters: ['.']
   */
  const _clean = (choices) => {
    return choices.map(choice => choice.trim().toLowerCase().replace(/\./g, ''));
  }

  const _pass = () => {
    console.log("IDK, next question please!");
  }

  return {
    testFunction: testFunction,
    loadItems   : loadItems
  };
}();