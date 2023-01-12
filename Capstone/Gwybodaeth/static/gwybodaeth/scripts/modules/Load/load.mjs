/**
 *   Contains functions used for loading study set data, which will be then
 *     processed by other modules. 
 */
export const Load = function() {
  /**
   * Loads a study set and passes just its terms to a given handler.
   * @param {*} handler 
   */
  const justTerms = (handler) => { 
    fetch(`/load/${_getStudySetID()}`)
    .then(response => response.json())
    .then(result => {
      handler(result['terms']);
    });
  }

  /**
   * Loads a study set and passes all its data to a given handler.
   * @param {*} handler 
   */
  const full = (handler) => { 
    fetch(`/load/${_getStudySetID()}`)
    .then(response => response.json())
    .then(result => {
      handler(result);
    });
  }

  const _getStudySetID = () => {
    return window.location.pathname.slice(1).split("/")[0];
  }

  return {
    justTerms: justTerms,
    full     : full
  };
}();