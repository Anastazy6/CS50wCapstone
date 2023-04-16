export class Flashcard {
  constructor(id, term, definition, category, note, options = null) {
    this.id = id;
    this.term = term;
    this.definition = definition;
    this.category = category;
    this.note = note || 'No note';
    this.options = options;
  }
  getDefinition() {
    this.definition;
  }
  getTerm() {
    this.term;
  }
}