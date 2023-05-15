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

import  { Util }  from  "./modules/Utilities/util.mjs";

import routes from "./routes.js";

const Main = (function(){

  const run = () => {
    if (Util.isStudySetActive())  Util.highlightCurrentLearningOption(); 

    const path         = Util.getPath();
    const currentRoute = routes.filter(r => r.route.test(path));


    if (currentRoute.length === 1) {
      console.log(currentRoute[0].module);
      import(currentRoute[0].module)
      .then(module => {
        module.default.launcher();
      })
    } else if (currentRoute.length > 1) {
      throw `Routing error: current route matches more than one from the predefined ones.`
    }
  }


  return {
    run: run
  }
})()

export default Main;