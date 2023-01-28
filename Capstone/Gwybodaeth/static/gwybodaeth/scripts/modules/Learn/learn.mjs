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
    console.log("Study items loaded.")
    Memory .test();
    View.grantAccessToMemory(_intermodularMethods);
    View.Choice.showCurrent()
  }


  const _getCurrentChoice = () => {
    return {
      correct: Memory.getCurrentPickable(),
      traps  : Memory.getShuffledTraps()
    }
  }
  
  const _multipleChoiceMethods = {
    handleCorrect: Memory.processCorrectChoice,
    handleWrong  : Memory.processWrongChoice,
    getCurrent   : _getCurrentChoice
  }

  const _intermodularMethods = {
    Choice: _multipleChoiceMethods,
  }





  return {
    loadItems: loadItems
  }
})()