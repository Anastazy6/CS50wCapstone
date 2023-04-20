export const Memory = function () {
  const _flashcards = [];
  let currentIndex = 0;
  const getLength = () => {
    return _flashcards.length;
  };
  const loadFlashcard = flashcard => {
    _flashcards.push(flashcard);
  };
  const currentCard = () => {
    return {
      card: _flashcards[currentIndex],
      index: currentIndex
    };
  };
  const getFirst = () => {
    currentIndex = 0;
    return currentCard();
  };
  const shuffle = () => {
    _flashcards.sort(() => Math.random() - 0.5);
  };
  const sort = () => {
    _flashcards.sort((first, second) => {
      return parseInt(first.id) - parseInt(second.id);
    });
  };

  /**
   * Increments current card ID by 1 (as long as the current card is not the last one)
   * and THEN returns currentCard(). Effectively returns the next card in the _flashcards
   * list or the last one, if it is the current card.
   * @returns current card (after incrementing current card ID if possible)
   */
  const getNext = () => {
    if (currentIndex < _flashcards.length - 1) {
      currentIndex++;
    }
    return currentCard();
  };
  const getPrevious = () => {
    if (currentIndex > 0) {
      currentIndex--;
    }
    return currentCard();
  };
  return {
    currentCard: currentCard,
    getFirst: getFirst,
    getLength: getLength,
    getNext: getNext,
    getPrevious: getPrevious,
    loadFlashcard: loadFlashcard,
    shuffle: shuffle,
    sort: sort
  };
}();