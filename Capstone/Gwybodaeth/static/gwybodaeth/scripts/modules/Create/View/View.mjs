/**
 * View for Create module
 */
export const View = (function() {
  const CSRFToken           = document.querySelector("[name=csrfmiddlewaretoken]");

  const studySetTitle       = document.getElementById('create-set-title'      );
  const studySetDescription = document.getElementById('create-set-description');
  
  const studySetTermsLang   = document.getElementById('terms-lang');
  const studySetDefsLang    = document.getElementById('defs-lang' );

  const studyItemsWrapper   = document.getElementById('study-items-wrapper');

  const addItemButton       = document.getElementById('study-set-add-item');
  const submitButton        = document.getElementById('study-set-submit'  );
  
  // Remove this when not needed anymore
  const debugBTN = document.getElementById('debug');

  const INITAL_STUDY_ITEMS_NUMBER = 5;

  const getStudySetInfo = () => {
    return {
      title      : studySetTitle      .value,
      description: studySetDescription.value,
      termsLang  : studySetTermsLang  .value,
      defsLang   : studySetDefsLang   .value
    }
  }

  const initialize = (methods) => {
    _addEventListeners(methods);
    _createInitialStudyItems(INITAL_STUDY_ITEMS_NUMBER, methods.addStudyItem);
  }


  const reload = (StudyItems) => {
    studyItemsWrapper.innerHTML = ''; // Clear wrapper

    let fragment = new DocumentFragment();

    StudyItems.forEach(studyItem => {
      fragment.append(studyItem);
    })

    studyItemsWrapper.append(fragment);
  }

  const showNewItem = (newItem) => {
    studyItemsWrapper.append(newItem);
  }


  //----------------------------------------------------------------------------
  //                                 Private
  //----------------------------------------------------------------------------


  const _addEventListeners = (methods) => {
    addItemButton.onclick = methods.addStudyItem;
    submitButton .onclick = methods.submit;
    debugBTN     .onclick = methods.debug;
  }

  const _createInitialStudyItems = (count, studyItemCreator) => {
    for (let i = 0; i < count; i++) {studyItemCreator()}
  }


  return {
    CSRFToken        : CSRFToken,
    getStudySetInfo  : getStudySetInfo,
    initialize       : initialize,
    reload           : reload,
    showNewItem      : showNewItem,
  }
})()