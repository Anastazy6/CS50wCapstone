import { Write    } from "../../Write/write.mjs";
import { Feedback } from "../../Write/Views/Feedback.mjs";

export const Writing = (function() {
  const container = document.getElementById("learn-writing-container");




  const hide = () => {
    container.classList.add('hidden');
  }

  const show = () => {
    container.classList.remove('hidden');
  }

  const showWrite = () => {
    Write   .show();
    Feedback.hide();
  }

  const showFeedback = () => {
    Feedback.show();
    Write   .hide();
  }


  return {
    Write   : Write,
    Feedback: Feedback,

    hide        : hide,
    show        : show,
    showWrite   : showWrite,
    showFeedback: showFeedback

  }
})()