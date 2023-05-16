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
 *  
 *   15.05.2023 Another rework - added routing system
 */

import  { Util }  from  "./modules/Utilities/util.mjs";

import routes from "./routes.js";

const Main = (function(){

  const run = () => {
    if (Util.isStudySetActive())  Util.highlightCurrentLearningOption(); 

    const modulePath = _getModulePath();
    if (modulePath) _loadModule(modulePath);
  }


  const _getModulePath = () => {
    const path         = Util.getPath();
    const currentRoute = routes.filter(r => r.route.test(path));

    switch (currentRoute.length) {
      case 0:
        // No module path if the current route is not associated with any of the VanillaJS modules.
        // This may happen if the route uses React, Angular.js or Django template rendering
        return false;
      case 1:
        return currentRoute[0].module;
      default:
        throw `Routing error: current route matches more than one from the predefined ones.`
    }

  }
  
  
  const _loadModule = (modulePath) => {
    import(modulePath)
    .then(module => module.default.launcher());
  }



  return {
    run: run
  }
})()

export default Main;