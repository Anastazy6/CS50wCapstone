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
    View.Choice.showCurrent(Memory.getCurrentPickable(), Memory.getShuffledTraps())
  }


  const _processCorrectChoice = () => {
    Memory.processCorrectChoice();
  }

  const _processWrongChoice = () => {
    Memory.processWrongChoice();
  }

  const _multipleChoiceMethods = {
    processCorrectChoice: _processCorrectChoice,
    processWrongChoice  : _processWrongChoice
  }

  return {
    loadItems: loadItems
  }
})()