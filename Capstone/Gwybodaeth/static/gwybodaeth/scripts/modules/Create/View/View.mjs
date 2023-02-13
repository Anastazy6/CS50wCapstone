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
  }


  return {
    CSRFToken        : CSRFToken,
    getStudySetInfo  : getStudySetInfo,
    initialize       : initialize,
    reload           : reload,
    showNewItem      : showNewItem,
  }
})()