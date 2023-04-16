import { Write } from "./Write.js";
import { Feedback } from "./Feedback.js";
import { Progress } from "./Progress.js";
import { Summary } from "./summary.js";

/**
   *  Contains references to the visible HTML elements and methods of displaying/updating them.
   */
export const View = function () {
  //--------------------------------------------------------------------------
  //                     View: public methods
  //--------------------------------------------------------------------------

  const initialize = (itemCount, methods) => {
    Progress.initialize(itemCount);
    _addEventListeners(methods);
  };
  const update = data => {
    _showCurrent(data.currentItem);
    Progress.update(data.counters);
  };

  //--------------------------------------------------------------------------
  //                     View: private methods
  //--------------------------------------------------------------------------

  const _showCurrent = currentItem => {
    Feedback.hide();
    Write.showCurrent(currentItem);
  };
  const _addEventListeners = methods => {
    [Write, Feedback, Summary].forEach(module => {
      module.addEventListeners(methods);
    });
  };
  return {
    Write: Write,
    Feedback: Feedback,
    Summary: Summary,
    Progress: Progress,
    initialize: initialize,
    update: update
  };
}();