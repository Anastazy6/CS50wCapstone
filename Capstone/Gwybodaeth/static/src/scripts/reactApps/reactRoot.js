import { Util } from '../vanillaJS/modules/Utilities/util.mjs'
import routes   from './routes.js';


const ReactManager = (function() {

  const runReact = (app) => {
    const rootElement = document.createElement('div');
    const root        = ReactDOM.createRoot(rootElement);

    root.render(app);
  }

  const main = () => {
    const path         = Util.getPath();
    const currentRoute = routes.filter(r => r.route === path);
    
    if (currentRoute.length === 1) {
      import(currentRoute[0].module)
      .then(app => {
        runReact(app)
      })
    }
  }

  return {
    main: main
  }
})()

export default ReactManager;