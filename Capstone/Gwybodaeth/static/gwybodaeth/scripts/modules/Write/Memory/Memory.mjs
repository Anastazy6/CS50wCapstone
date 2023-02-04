  /**
   *  Contains data necessary for the app to work and remembers whether a term hasn't been
   *    shown to the user or the answer given was correct/incorrect.
   */
  export const Memory = function() {
    const _remaining = [];
    const _correct   = [];
    const _incorrect = [];

    const countRemaining = () => {return _remaining.length;}
    const countCorrect   = () => {return _correct  .length;}
    const countIncorrect = () => {return _incorrect.length;}

    /**
     * Loads into memory a new StudyItem object, created from the fetched data. 
     * @param {StudyItem} item 
     */
    const loadItem = (item) => {
      _remaining.push(item);
    }

    /**
     * 
     * @returns the first element from the _remaining list, which will be used to ask the user a question
     *   and await their answer for it.
     */
    const currentItem = () => {
      return (!!_remaining[0]) ? _remaining[0] : false;
    }

    /**
     *  Marks the currentItem as being answered correctly, moving it from
     *   the _remaining list to the _correct list.
     */
    const processCorrectWrite = () => {
      _correct.push(_remaining.shift());
    }
    
    /**
     *  Marks the currentItem as being answered incorrectly, moving it from
     *   the _remaining list to the _incorrect list.
     */
    const processWrongWrite = () => {
      _incorrect.push(_remaining.shift());
    }

    /**
     *  Shuffles the _remaining list randomly in order to provide the user with more challenge
     *    and inability to associate answers with their positions in the order of questions.
     */
    const shuffle = () => {
      _remaining.sort(() => { return Math.random() - 0.5; });
    }

    /**
     *  Sorts the study items by their ID, which is assigned on study set creation.
     */
    const sort = () => {
      _remaining.sort((first, second) => {return parseInt(first.id) - parseInt(second.id)});
    }

    return {
      countRemaining     : countRemaining,
      countCorrect       : countCorrect,
      countIncorrect     : countIncorrect,
      currentItem        : currentItem,
      loadItem           : loadItem,
      processCorrectWrite: processCorrectWrite,
      processWrongWrite  : processWrongWrite,
      shuffle            : shuffle,
      sort               : sort
    }
  }();