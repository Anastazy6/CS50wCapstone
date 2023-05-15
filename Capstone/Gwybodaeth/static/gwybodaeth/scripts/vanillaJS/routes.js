const studySetPattern = subroute => {
  let pattern = `/set/\\d+/${subroute}`;
  return new RegExp(pattern);
};
const routes = [{
  route: /\/create-set/,
  module: "./modules/Create/create.js"
  //   name    : Create,
}, {
  route: studySetPattern('flashcards'),
  module: "./modules/Flashcards/flashcards.js"
  //   name    : Flashcards,
}, {
  route: studySetPattern('learn'),
  module: "./modules/Learn/learn.js"
  //   name    : Learn,
}, {
  route: studySetPattern('write'),
  module: "./modules/Write/write.js"
  //   name    : Write,
}];

export default routes;