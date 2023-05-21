const studySetPattern = subroute => {
  let pattern = `^/set/\\d+/${subroute}$`;
  
  return new RegExp(pattern);
};

const simplePattern = pattern => new RegExp(`^/${pattern}$`);


const JSModulesRoot = "./vanillaJS/modules";
const ReactRoot     = "./reactApps";

const jsModule = (path) => `${JSModulesRoot}/${path}`;
const reactApp = (path) => `${ReactRoot}/${path}`


//TODO (optional): consider refactoring into Django-like routing system.

const routes = [
  {
    route : simplePattern("create-set"),
    module: jsModule("Create/create.js")
  }, {
    route : studySetPattern("flashcards"),
    module: jsModule("Flashcards/flashcards.js")
  }, {
    route : studySetPattern("learn"),
    module: jsModule("Learn/learn.js")
  }, {
    route : studySetPattern("write"),
    module: jsModule("Write/write.js")
  }, {
    route : simplePattern("test"),
    module: reactApp("test.js")
  }, {
    route : simplePattern("create-set-react"),
    module: reactApp("CreateReact/App.js")
  }
];

export default routes;