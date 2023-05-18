const studySetPattern = subroute => {
  let pattern = `^/set/\\d+/${subroute}$`;
  
  return new RegExp(pattern);
};

const simplePattern = pattern => new RegExp(`^/${pattern}$`);

//TODO (optional): consider refactoring into Django-like routing system.

const routes = [
  {
    route : simplePattern('create-set'),
    module: "./vanillaJS/modules/Create/create.js"
  }, {
    route : studySetPattern('flashcards'),
    module: "./vanillaJS/modules/Flashcards/flashcards.js"
  }, {
    route : studySetPattern('learn'),
    module: "./vanillaJS/modules/Learn/learn.js"
  }, {
    route : studySetPattern('write'),
    module: "./vanillaJS/modules/Write/write.js"
  }, {
    route : simplePattern('test'),
    module: './reactApps/test.js'
  }, {
    route : simplePattern('create-set-react'),
    module: './reactApps/CreateReact/App.js'
  }
];


export default routes;