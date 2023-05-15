import Main from './vanillaJS/main.js';
import ReactManager from './reactApps/reactRoot.js';
document.addEventListener("DOMContentLoaded", function () {
  Main.run();
  ReactManager.main();
});