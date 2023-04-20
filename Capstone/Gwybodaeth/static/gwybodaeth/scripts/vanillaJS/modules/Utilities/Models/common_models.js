/**
 *  Creates a single study item which will be then pushed into Memory.remaining for
 *    storage and use. Only used to process raw fetched data from the server into
 *    something that is more suitable for further use.
 */
export class StudyItem {
  constructor(id, terms, definitions, category, note, options = null) {
    this.id = id;
    this.terms = this.#splitAnswers(terms);
    this.definitions = this.#splitAnswers(definitions);
    this.category = category;
    this.note = note || 'No note';
    this.options = options;
  }
  #splitAnswers = data => {
    let answers = [];
    data.split(/[,;/]/).forEach(answer => {
      answers.push(answer.trim());
    });
    return answers;
  };
}