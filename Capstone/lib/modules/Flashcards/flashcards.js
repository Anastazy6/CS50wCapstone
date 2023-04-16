import { Memory } from "./Memory/memory.mjs";
import { View } from "./Views/view.mjs";
import { Flashcard } from "./Models/flashcard.mjs";
export const Flashcards = function () {
  // Public

  const loadFlashcards = data => {
    _prepareData(data);
    View.show(Memory.currentCard());
  };

  // Private

  const _createList = data => {
    Object.entries(data).forEach(([id, values]) => {
      Memory.loadFlashcard(new Flashcard(id, values['term'], values['def'], values['cat'], values['note'], values['options']));
    });
  };

  /**
   * Prepares stuff that is necessary to diplay flashcards: the flashcards list itself and the View.
   * Grants some View elements access to methods that span multiple modules, i.e. those, which modify
   * both the Memory and the View.
   * @param {JSON} data 
   */
  const _prepareData = data => {
    _createList(data);
    View.initialize(_intermodularMethods, Memory.getLength());
  };
  const _flip = () => {
    let currentCard = Memory.currentCard().card;
    if (View.getCurrentType() === 'Term') {
      View.showDefinition(currentCard);
    } else {
      View.showTerm(currentCard);
    }
  };
  const _showPrevious = () => {
    View.show(Memory.getPrevious());
  };
  const _showNext = () => {
    View.show(Memory.getNext());
  };
  const _shuffle = () => {
    Memory.shuffle();
    View.show(Memory.getFirst());
  };
  const _sort = () => {
    Memory.sort();
    View.show(Memory.getFirst());
  };

  // Wraps all the intermodular methods into a sigle object. Its elements can be directly assigned
  //  either to a 'click' event lister or an 'onclick' HTTPElement attribute.
  const _intermodularMethods = {
    flip: _flip,
    showPrevious: _showPrevious,
    showNext: _showNext,
    shuffle: _shuffle,
    sort: _sort
  };
  return {
    loadFlashcards: loadFlashcards
  };
}();