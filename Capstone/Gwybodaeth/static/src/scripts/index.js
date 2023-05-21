import routes from './routes.js';
import { Util } from './vanillaJS/modules/Utilities/util.js';

var location = window.location.pathname;
var path = location.substring(0, location.lastIndexOf("/"));
var directoryName = path.substring(path.lastIndexOf("/")+1);

console.log(directoryName);

document.addEventListener("DOMContentLoaded", function () {
  main();
})

const main = () => {
  if (Util.isStudySetActive())  Util.highlightCurrentLearningOption(); 

  const modulePath = Util.getModulePath(routes);
  if   (modulePath)  loadModule(modulePath);
}

const loadModule = (modulePath) => {

  console.log(window.location.pathname);
  console.log(modulePath);


  import(modulePath)
  .then(module => module.default())
  //.catch(error => console.log(error))
}