import { Memory         } from "./Memory/memory.mjs"
import { StudyItem      } from "./Models/study_item.mjs"
import { View           } from "./Views/view.mjs"
import { WriteUtilities } from "../Write/write_utilities.mjs"

export const Learn = (function() {

  const _resolutionMethods = () => {
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
    Memory.shufflePickables();
    _initializeWritingView();
    _updateView();
  }

  const _initializeWritingView = () => {

    let writeMethods = {
      write: {
        submit: _submitAnswerWrapper,
        pass  : _passWrapper
      },
      feedback: {
        retry  : _retryWrite,
        resolve: (target) => {WriteUtilities.resolve(_resolutionMethods(), target)}
      }
    } 
    View.Writing.initialize(writeMethods);
  }



  const _updateView = () => {
    _updateProgress();
    _showProperView();
  }

  const _showProperView = () => {
    let currentView = Memory.viewToBeShown();

    switch (currentView) {
      case 'choice':
        _showMultileChoice();
        break;
      case 'write':
        _showWrite();
        break;
      default:
        _showSummary();
    }
  }


  const _showMultileChoice = () => {
    let data = {
      correct: Memory.currentItem(),
      traps  : Memory.getShuffledTraps()
    }
    let methods = {
      processCorrect: Memory.processCorrectChoice,
      processWrong  : Memory.processWrongChoice,
      showNext      : _updateView
    }

    _showView(View.Choice);
    View.Choice.showCurrent(data, methods);
  }

  const _showWrite = () => {
    console.log("Writing should be shown")
    _showView(View.Writing.Write);
    View.Writing.Write.showCurrent(Memory.currentItem());
  }

  const _showSummary = () => {
    console.log("Summary should be shown")
    _showMultileChoice(); // Temporary!

  }
  

  const _showView = (currentView) => {
    let views = [
      View.Choice,
      View.Writing.Write,
      View.Writing.Feedback,
      View.Summary
    ];
    console.assert(views.includes(currentView), "Warning: Incorrect view name passed.");
    
    views.forEach(view => view.hide());
    currentView.show();
  }

  const _updateProgress = () => {
    View.Progress.updateStats(Memory.getStats());
  }



  const _retryWrite = () => {
    Memory.shuffleWritables();
    _updateView();
  }


  const _submitAnswerWrapper = () => {
    let currentItem  = Memory.currentItem();
    let input        = View.Writing.Write.getUserInput();
    let feedbackView = View.Writing.Feedback;

    if (!input) { return false; } // Prevent accidentally sending empty input.
    
    _showView(feedbackView);
    WriteUtilities.submitAnswer(currentItem, input, feedbackView);
    
    return false; // Prevent page reload on form submit.
  }

  const _passWrapper = () => {
    let currentItem  = Memory.currentItem();
    let feedbackView = View.Writing.Feedback;

    _showView(feedbackView);
    WriteUtilities.pass(currentItem, feedbackView);
    return false;
  }

  return {
    loadItems: loadItems
  }
})()