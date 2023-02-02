import { Memory    } from "./Memory/memory.mjs"
import { StudyItem } from "./Models/study_item.mjs"
import { View      } from "./Views/view.mjs"

export const Learn = (function() {

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
    _updateView();
  }


  const _updateView = () => {
    let method = Memory.isItTimeToWrite() ? 'write' : 'choice';

    if (method === 'write') {
      console.log("Writing is not yet implemented");
    } else {
      console.log("Proceeding as expected");
    }

    _updateProgress();
    _showMultileChoice();
  }


  const _showMultileChoice = () => {
    let data = {
      correct: Memory.getCurrentPickable(),
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
  

  const _showView = (currentView) => {
    let views = [
      View.Choice,
      View.Write,
      View.Summary
    ];
    
    views.forEach(view => view.hide());

    currentView.show();
  }

  const _updateProgress = () => {
    View.Progress.updateStats(Memory.getStats());
  }


  return {
    loadItems: loadItems
  }
})()