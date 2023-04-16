/* TODO: (either @ core or advanced level): Lazy module importing.
 *   14.04.2023 I think this is the way to do it (or at the very least it's better
 *   than it used to be). I've decided to keep Load and Util being imported statically,
 *   as they're used in several parts of the app, but the others are mutually exclusive
 *   by design so there's no need to import them all at once. I actually HAD to implement
 *   lazy importing because the "firstElementChild" part invoked in Learn.View.Summary
 *   somehow interfered with the other modules (such element couldn't be found whenever
 *   the user tried to access different part of the app instead of Learn), completely disabling them.
 * 
 *   I'm leaving this in TODO state as there might be some improvements to make: naming, DRYing the code,
 *   and better routing system.
 */

import { Load } from "./modules/Load/load.js";
import { Util } from "./modules/Utilities/util.js";
document.addEventListener("DOMContentLoaded", function () {
  const route = Util.getRoute();
  if (route[0] === 'set') Util.highlightCurrentLearningOption();
  if (route[0] === 'create-set') {
    import("./modules/Create/create.js").then(createModule => {
      createModule.Create.run();
    });
  }
  if (route[2] === 'flashcards') {
    import("./modules/Flashcards/flashcards.js").then(flashcardsModule => {
      Load.justTerms(flashcardsModule.Flashcards.loadFlashcards);
    });
  }
  if (route[2] === 'learn') {
    import("./modules/Learn/learn.js").then(learnModule => {
      Load.justTerms(learnModule.Learn.loadItems);
    });
  }
  if (route[2] === 'write') {
    import("./modules/Write/write.js").then(writeModule => {
      Load.justTerms(writeModule.Write.loadItems);
    });
  }
});