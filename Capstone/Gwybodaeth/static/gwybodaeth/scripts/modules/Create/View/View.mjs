/**
 * View for Create module
 */
export const View = (function() {
  const CSRFToken            = document.querySelector("[name=csrfmiddlewaretoken]");

  const createSetTitle       = document.getElementById('create-set-title'      );
  const createSetDescription = document.getElementById('create-set-description');
  
  const createSetTermsLang   = document.getElementById('terms-lang');
  const createSetDefsLang    = document.getElementById('defs-lang' );

  const createItemsWrapper   = document.getElementById('create-items-wrapper');

  const addItemButton        = document.getElementById('create-set-add-item');
  const submitButton         = document.getElementById('create-set-submit'  );
  

  const INITAL_STUDY_ITEMS_NUMBER = 5;

  const focusLastItem = () => {
    createItemsWrapper.lastChild.lastChild.firstChild.focus();
  }

  const getStudySetInfo = () => {
    return {
      title      : createSetTitle      .value,
      description: createSetDescription.value,
      termsLang  : createSetTermsLang  .value,
      defsLang   : createSetDefsLang   .value
    }
  }

  const initialize = (methods) => {
    _addEventListeners(methods);
    _createInitialcreateItems(INITAL_STUDY_ITEMS_NUMBER, methods.addStudyItem);
  }


  const reload = (createItems) => {
    createItemsWrapper.innerHTML = ''; // Clear wrapper

    let fragment = new DocumentFragment();

    createItems.forEach(createItem => {
      fragment.append(createItem);
    })

    createItemsWrapper.append(fragment);
  }

  const showNewItem = (newItem) => {
    createItemsWrapper.append(newItem);
  }


  //----------------------------------------------------------------------------
  //                                 Private
  //----------------------------------------------------------------------------


  const _addEventListeners = (methods) => {
    addItemButton.onclick = methods.addStudyItem;
    submitButton .onclick = methods.submit;

    _addFocusFromTabHandler(methods);
  }



  const _createInitialcreateItems = (count, createItemCreator) => {
    for (let i = 0; i < count; i++) {createItemCreator()}
  }



  const _addFocusFromTabHandler = (methods) => {
    window.addEventListener('keyup', event => {
      if (event.key === 'Tab' && document.activeElement === addItemButton) {
        methods.autoAddStudyItem();
      }
    })
  }



  return {
    CSRFToken        : CSRFToken,
    focusLastItem    : focusLastItem,
    getStudySetInfo  : getStudySetInfo,
    initialize       : initialize,
    reload           : reload,
    showNewItem      : showNewItem,
  }
})()