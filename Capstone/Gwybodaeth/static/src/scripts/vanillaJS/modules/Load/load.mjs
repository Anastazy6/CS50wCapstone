import { Util } from "../Utilities/util.js";

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
    fetch(`/load/${Util.getStudySetID()}`)
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
    fetch(`/load/${Util.getStudySetID()}`)
    .then(response => response.json())
    .then(result => {
      handler(result);
    });
  }

  return {
    justTerms    : justTerms,
    full         : full
  };
}();