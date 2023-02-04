import { Memory         } from "./Memory/Memory.mjs";
import { View           } from "./Views/View.mjs";
import { StudyItem      } from "./Models/StudyItem.mjs";
import { WriteUtilities } from "./write_utilities.mjs";

export const Write = function() {
  
  const _resolutionMethods = () =>{
    return {
      processCorrect: Memory.processCorrectWrite,
      processWrong  : Memory.processWrongWrite,
      updateView    : _updateView
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
    _startView();
  }

  const _startView = () => {
    let itemCount  = Memory.countRemaining();
    let methods = {
      submit : _submitAnswerWrapper,
      pass   : _passWrapper,
      retry  : _retryItem,
      resolve: (target) => {WriteUtilities.resolve(_resolutionMethods(), target)}
    }

    View.initialize(itemCount, methods);
    _updateView();
  } 

  
  

  const _submitAnswerWrapper = () => {
    let currentItem  = Memory.currentItem();
    let input        = View.Write.getUserInput();
    let feedbackView = View.Feedback;

    if (!input) { return false; } // Prevent accidentally sending empty input.
    View.Write.hide();

    WriteUtilities.submitAnswer(currentItem, input, feedbackView);
    
    return false; // Prevent page reload on form submit.
  }

  const _passWrapper = () => {
    let currentItem  = Memory.currentItem();
    let feedbackView = View.Feedback;

    View.Write.hide();
    WriteUtilities.pass(currentItem, feedbackView);
    return false;
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
    View.Write   .hide();
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