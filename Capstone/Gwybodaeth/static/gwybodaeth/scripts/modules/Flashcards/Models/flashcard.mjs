export class Flashcard {
  constructor(id, term, definition, category, options=null) {
    this.id         = id;
    this.term       = term;
    this.definition = definition;
    this.category   = category;
    this.options    = options;
  }

  getDefinition() {
    this.definition;
  }

  getTerm() {
    this.term;
  }
}