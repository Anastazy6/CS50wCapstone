import { Memory    } from "./Memory/Memory.mjs";
import { View      } from "./Views/View.mjs";
import { StudyItem } from "./Models/StudyItem.mjs";

export const Write = function() {
  
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
    _startView();
  }

  const _startView = () => {
    let itemCount  = Memory.countRemaining();
    let methods = {
      submit : _submitAnswer,
      pass   : _pass,
      retry  : _retryItem,
      resolve: _resolve
    }

    View .initialize(itemCount, methods);
    _updateView();
  } 

  
  const _submitAnswer = () => {
    let input   = View.getUserInput();
    if (!input) { return false; } // Prevent accidentally sending empty input.

    let currentItem   = Memory.currentItem();
    let answerCorrect = _verifyAnswers(currentItem.terms, input);

    _showFeedback(answerCorrect, currentItem, View.getUserInput());

    return false; // Prevent page reload on form submit.
  }


  const _verifyAnswers = (questions, answers) => {
    return _clean(answers).some(answer => _clean(questions).includes(answer));
  }

  const _showFeedback = (isCorrect, currentItem, userInput) => {
    View.hide();

    if (isCorrect) {
      View.Feedback.showPositive(currentItem, userInput);
    } else {
      View.Feedback.showNegative(currentItem, userInput);
    }
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
  const _pass = () => {
    let answerCorrect = false;
    let currentItem   = Memory.currentItem();
    let userInput     = "<span class='text-warning'>None</span>";
    
    _showFeedback(answerCorrect, currentItem, userInput);
    return false; // Prevent page reload on submit.
  }

  // TODO (optional): refactor so that it uses booleans instead of strings. Using dataset for booleans
  //   has proven to be quite tricky, so I'm leaving this band-aid solution for now.
  const _resolve = function() {
    let resolution = this.dataset.resolution;

    if (resolution === 'positive') {
      _resolvePositively();
    } else if (resolution === 'negative') {
      _resolveNegatively();
    } else {
      console.log("Couldn't resolve..."); 
    }
  }


  const _resolvePositively = () => {
    Memory.markAsCorrect();
    _updateView();
  }

  const _resolveNegatively = () => {
    Memory.markAsIncorrect();
    _updateView();
  }

  const _retryItem = () => {
    Memory.shuffle();
    _updateView();
  }


  const _updateView = () => {
    let currentItem = Memory.currentItem();
    if (!currentItem) { return _showSummary() };

    let data = {
      currentItem: currentItem,
      counters   : _getCountersData() 
    }
    return View.update(data);
  }

  const _getCountersData = () => {
    return  {
      correct  : Memory.countCorrect(),
      incorrect: Memory.countIncorrect(),
      remaining: Memory.countRemaining(),
    } 
  }

  const _showSummary = () => {
    View.Progress.update(_getCountersData());
    View.hide();
    View.Feedback.hide();
    View.Summary .show(_getSummaryData());
  }

  const _getSummaryData = () => {
    let correct    = Memory.countCorrect();
    let incorrect  = Memory.countIncorrect();
    let percentage = parseFloat(100 * correct / (correct + incorrect)).toFixed(2);

    return {
      correct   : Memory.countCorrect(),
      incorrect : Memory.countIncorrect(),
      percentage: percentage
    }
  }


  return {
    loadItems: loadItems
  };
}();