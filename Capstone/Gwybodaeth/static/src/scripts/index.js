import routes from './routes.js';
import { Util } from './vanillaJS/modules/Utilities/util.js';


document.addEventListener("DOMContentLoaded", function () {
  main();
})

const main = () => {
  if (Util.isStudySetActive())  Util.highlightCurrentLearningOption(); 

  const modulePath = Util.getModulePath(routes);
  if   (modulePath)  loadModule(modulePath);
}

const loadModule = (modulePath) => {
  import(modulePath)
  .then(module => module.default())
  .catch(error => console.log(error))
}