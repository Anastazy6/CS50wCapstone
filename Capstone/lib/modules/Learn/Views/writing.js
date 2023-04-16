import { Write } from "../../Write/Views/Write.mjs";
import { Feedback } from "../../Write/Views/Feedback.mjs";
export const Writing = function () {
  const container = document.getElementById("learn-writing-container");
  const initialize = methods => {
    Write.addEventListeners(methods.write);
    Feedback.addEventListeners(methods.feedback);
  };
  const hide = () => {
    container.classList.add('hidden');
  };
  const show = () => {
    container.classList.remove('hidden');
  };
  const showWrite = () => {
    Write.show();
    Feedback.hide();
  };
  const showFeedback = () => {
    Feedback.show();
    Write.hide();
  };
  return {
    Write: Write,
    Feedback: Feedback,
    initialize: initialize,
    hide: hide,
    show: show,
    showWrite: showWrite,
    showFeedback: showFeedback
  };
}();