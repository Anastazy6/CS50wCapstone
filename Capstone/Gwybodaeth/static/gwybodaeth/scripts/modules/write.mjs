export const Write = function() {
  const testFunction = () => {
    console.log("Write module loaded successfully!");
  }
  



  /**
   *  Contains references to the visible HTML elements and methods of displaying/updating them.
   */
  const View = function() {
    //--------------------------------------------------------------------------
    //                     View: HTML elements references
    //--------------------------------------------------------------------------
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

    //--------------------------------------------------------------------------
    //                     View: public methods
    //--------------------------------------------------------------------------
    
    const initialize = (itemsCount) => {
      _setTotalCounters(itemsCount);
      _addEventListeners();
      update();
    }

    const update = () => {
      _showCurrent();
      _setCounters();
      _clearInput();
    }

    const getUserInput = () => {
      if (answer.value === '') { return false; } // Invalidate empty input

      return answer.value.split(/[,;/]/);
    }

    //--------------------------------------------------------------------------
    //                     View: private methods
    //--------------------------------------------------------------------------

    const _showCurrent = () => {
      let currentItem = Memory.currentItem();

      if (!currentItem) { return alert("End reached.");}

      question.innerHTML = currentItem.definitions.join(', ');
      category.innerHTML = currentItem.category;
    }

    const _clearInput = () => {
      answer.value = '';
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
      getUserInput: getUserInput,
      initialize  : initialize,
      update      : update
    }
  }();





  /**
   *  Contains data necessary for the app to work and remembers whether a term hasn't been
   *    shown to the user or the answer given was correct/incorrect.
   */
  const Memory = function() {
    const _remaining = [];
    const _correct   = [];
    const _incorrect = [];

    /**
     * Loads into memory a new StudyItem object, created from the fetched data. 
     * @param {StudyItem} item 
     */
    const loadItem = (item) => {
      _remaining.push(item);
    }

    /**
     * 
     * @returns the first element from the _remaining list, which will be used to ask the user a question
     *   and await their answer for it.
     */
    const currentItem = () => {
      return (!!_remaining[0]) ? _remaining[0] : false;
    }

    /**
     *  Marks the currentItem as being answered correctly, moving it from
     *   the _remaining list to the _correct list.
     */
    const markAsCorrect = () => {
      _correct.push(_remaining.shift());
    }
    
    /**
     *  Marks the currentItem as being answered incorrectly, moving it from
     *   the _remaining list to the _incorrect list.
     */
    const markAsIncorrect = () => {
      _incorrect.push(_remaining.shift());
    }

    /**
     *  Shuffles the _remaining list randomly in order to provide the user with more challenge
     *    and inability to associate answers with their positions in the order of questions.
     */
    const shuffle = () => {
      _remaining.sort(() => { return Math.random() - 0.5; });
    }

    /**
     *  Sorts the study items by their ID, which is assigned on study set creation.
     */
    const sort = () => {
      _remaining.sort((first, second) => {return parseInt(first.id) - parseInt(second.id)});
    }

    const countRemaining = () => {return _remaining.length;}

    const countCorrect   = () => {return _correct  .length;}

    const countIncorrect = () => {return _incorrect.length;}

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




  /**
   *  Creates a single study item which will be then pushed into Memory.remaining for
   *    storage and use. Only used to process raw fetched data from the server into
   *    something that is more suitable for further use.
   */
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
  }

  const _submitAnswer = () => {
    let input   = View.getUserInput();
    if (!input) { return false; } // Prevent accidentally sending empty input.

    let answers = Memory.currentItem().terms;

    if (_verifyAnswers(answers, input)) {
      Memory.markAsCorrect();
    } else {
      Memory.markAsIncorrect();
    }

    View.update();
    return false; // Prevent page reload on form submit.
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

  /**
   * Gives up on answering a particular question, marking it as incorrect.
   *   Then the user will be asked the next question.
   */
  const _pass = () => { // TODO: this method requires repetition of View.update() and return false, which 
                        //         are already invoked in _submitAnswer(). Find a better solution.
    console.log("User passed.") 
    Memory .markAsIncorrect();
    View.update();
    return false;
  }

  return {
    testFunction: testFunction,
    loadItems   : loadItems
  };
}();