/**
 *   Contains functions used for loading study set data, which will be then
 *     processed by other modules. 
 */
export const Load = function() {
  const testFunction = () => {
    console.log("Load module loaded successfully!");
  }

  /**
   *  
   * @param {*} handler 
   */
  const terms = (handler) => { 
    fetch(`/load/${_getStudySetID()}`)
    .then(response => response.json())
    .then(result => {
      handler(result['terms']);
    });
  }

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
    testFunction: testFunction,
    terms       : terms,
    full        : full
  };
}();