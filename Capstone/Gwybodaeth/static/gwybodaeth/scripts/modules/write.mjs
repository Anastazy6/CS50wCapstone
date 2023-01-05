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

    return {
      question: question,
      pass    : pass,
      answer  : answer,
      submit  : submit,
      category: category,
      label   : label,
      specials: specials,
      progress: progress
    }
  }();



  const Memory = function() {
    let items = [];

    const shuffle = () => {
      items.sort(() => { return Math.random() - 0.5; });
    }

    const sort = () => {
      items.sort((first, second) => {return parseInt(first.id) - parseInt(second.id)});
    }

    return {
      items  : items,
      shuffle: shuffle,
      sort   : sort
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
    console.log(Memory.items);
    _run();
  }

  const _run = () => {
    Memory.shuffle();
    console.log(Memory.items);
   // Memory.sort();
   // console.log(Memory.items);
  }

  return {
    testFunction: testFunction,
    loadItems   : loadItems
  };
}();