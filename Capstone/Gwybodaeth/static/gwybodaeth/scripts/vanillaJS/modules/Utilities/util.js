export const Util = function () {
  const highlightCurrentLearningOption = () => {
    let currentOption = _getLearningOption() || 'set';
    const optionButton = document.getElementById(`learning-options-${currentOption}`);
    if (optionButton) {
      optionButton.classList.add("active-learning-option");
    }
  };
  const generateIndex = function () {
    let index = 0;
    return function () {
      index += 1;
      return index;
    };
  }();

  /**
   * Source: https://stackoverflow.com/a/50735730
   * @param {*} name 
   * @returns Cookie value
   */
  const getCookie = name => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };
  const getPath = () => window.location.pathname;
  const getRoute = (path = getPath()) => path.slice(1).split("/");
  const getStudySetID = () => getRoute()[1];
  const _getLearningOption = () => getRoute()[2];
  const isStudySetActive = () => getRoute()[0] === 'set';
  const getModulePath = routes => {
    const path = Util.getPath();
    const currentRoute = routes.filter(r => r.route.test(path));
    switch (currentRoute.length) {
      case 0:
        // No module path if the current route is not associated with any of the VanillaJS modules.
        // This may happen if the route uses React, Angular.js or Django template rendering
        return false;
      case 1:
        return currentRoute[0].module;
      default:
        throw `Routing error: current route matches more than one from the predefined ones.`;
    }
  };

  /**
   *  Redirects to another page WITHIN this web service. The url argument is relative
   *    to the site's root location.
   * 
   * @param {String} url 
   * @returns void
   */
  const redirect = url => {
    const origin = window.location.origin;
    window.location.replace(`${origin}${url}`);
  };
  return {
    generateIndex: generateIndex,
    getCookie: getCookie,
    getPath: getPath,
    getRoute: getRoute,
    getStudySetID: getStudySetID,
    getModulePath: getModulePath,
    isStudySetActive: isStudySetActive,
    highlightCurrentLearningOption: highlightCurrentLearningOption,
    redirect: redirect
  };
}();