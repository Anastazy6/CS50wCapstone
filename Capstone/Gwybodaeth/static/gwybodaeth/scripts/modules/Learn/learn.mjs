import { Memory         } from "./Memory/memory.mjs"
import { StudyItem      } from "./Models/study_item.mjs"
import { View           } from "./Views/view.mjs"
import { WriteUtilities } from "../Write/write_utilities.mjs"

export const Learn = (function() {

  const _methodsForWrite =  {
    write: {
      submit: console.log("Submit clicked"),
      pass  : console.log("Pass clicked")
    },
    feedback: {
      retry  : console.log("Retry clicked"),
      resolve: console.log("Resolving...")
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
    View.Write.initialize(_methodsForWrite);
    _updateView();
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


  return {
    loadItems: loadItems
  }
})()