/**
 *  Source: https://stackoverflow.com/a/12274886
 *  Allows to set multiple attributes to an element at once.
 *  
 */
Element.prototype.setAttributes = function(attributes) {
  for (let index in attributes) {
    if ((index === 'styles' || index === 'style') && typeof attributes[index] === 'object') {
      for (let property in attributes[index]) {
        this.style[property] = attributes[index][property];
      }
    } else if (index === 'html') {
      this.innerHTML = attributes[index];
    } else {
      this.setAttribute(index, attributes[index]);
    }
  }
}

export const StudySet = (function(){
// Public functions
  const testFunction = () => {
    console.log("StudySet module loaded successfully!");
  }



  const addStudyItem = () => {
    const studyItemsWrapper = document.getElementById("study-items-wrapper")
    const newStudyItem      = document.createElement('div');
    
    newStudyItem.classList.add( "form-line",
                                "study-item");
    _addStudyItemFormInputsTo(newStudyItem);

    studyItemsWrapper.append(newStudyItem);
    id++;
  }

  const _addStudyItemFormInputsTo = (newStudyItem) => {
    ['term', 'definition'].forEach(name => {
      console.log(`Adding ${name} textarea...`);
      newStudyItem.append(_createStudyItemTextarea(name));
    })
    console.log("Adding category text input...");
    newStudyItem.append(_createStudyItemTextInput("category"));
    
  }

  const _createStudySetInputContainer = () => {
    const container = document.createElement('div');
    container.classList.add("form-cell");

    return container;
  }

  const _createStudyItemTextarea = (name) => {
    const container = _createStudySetInputContainer();
    const textarea  = document.createElement("textarea");
    
    container.append(textarea);
    textarea .setAttributes(
      { "name"       : name,
        "cols"       : 25,
        "rows"       : 1,
        "required"   : true,
        "placeholder": `Enter ${name}`}
    );
    
    return container;
  }

  const _createStudyItemTextInput = (name) => {
    const container = _createStudySetInputContainer();
    const input     = document.createElement("input");

    container.append(input);
    input    .classList.add(`${name}-input`)
    input    .setAttributes(
      { "name"       : name,
        "type"       : "text",
        "placeholder": name.charAt(0).toUpperCase() + name.slice(1)}
    );

    return container;
  }



  const createStudySet = () => {
    fetch('/create-set', {
      method: 'POST',
      headers: {
        "X-CSRFToken" : document.querySelector("[name=csrfmiddlewaretoken]").value,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "title"       : document.getElementById("create-set-title"      ).value,
        "description" : document.getElementById("create-set-description").value,
        "terms-lang"  : document.querySelector ("[name=terms-lang]"     ).value,
        "defs-lang"   : document.querySelector ("[name=defs-lang]"      ).value,
        "terms"       : _getNewStudySetData()
      })
    })
    .then(response => response.json())
    .then(result   => {
      console.log(result);
    })
    return false;
  }



  const loadStudyTerms = () => {
    const studySetView = document.getElementById("study-items");

    if (!!studySetView) {
      fetch(`/load/${_getStudySetID()}`)
      .then(response => response.json())
      .then(result => {
        _fillStudySetViewWithTerms(studySetView, result['terms']);
      })
    }
  }



  // Private functions

  /**
   * Creates and returns an HTML element with a single study item's term, definition, category and options.
   * @param {Array}  termData    - An array containing all the data needed to create a single study item.
   * @param {number} termData[0] - The first element of the termData array is the ID if a study item, starting with 1
   * @param {Object} termData[1] - An object/dictionary with 3 keys: "term", "def" (definition), "cat" (category).
   */
  const _createStudyTerm = (termData) => {
    const studyItem = _createStudyTermContainer(termData[0]);

    Object.entries(termData[1]).forEach(([key, value]) => {
      studyItem.append(_createStudyTermFields(key, value));
    })
    studyItem.append(_createStudyTermOptions());

    return studyItem;
  }



  const _createStudyTermContainer = (termID) => {
    const studyItemContainer = document.createElement('div');
    studyItemContainer.setAttribute("id", `study-item-${termID}`);
    studyItemContainer.classList.add( "grid-container-6",
                                      "study-item");
    
    return studyItemContainer;
  }



  const _createStudyTermFields = (key, value) => {
    const studyField = document.createElement("div");
    studyField.classList.add(`study-${key}`);
    studyField.classList.add(
        (key === 'cat') ?
            "study-set-cell-1" :
            "study-set-cell-2");
    studyField.innerHTML = value;
    
    return studyField;
  }



  const _createStudyTermOptions = () => {
    // TODO: create buttons for editing and marking a term as difficult.
    const studyOptions = document.createElement('div');
    studyOptions.classList.add( "study-set-cell-1",
                                "study-options");
    studyOptions.innerHTML = "TODO";
    
    return studyOptions;
  }



  const _fillStudySetViewWithTerms = (studySetView, terms) => {
    Object.entries(terms).forEach(term => {
      studySetView.append(_createStudyTerm(term));
    })
  }



  const _getNewStudySetData = () => {
    let   data       = {};
    const studyItems = document.getElementsByClassName("study-item");

    let id = 1
    Array.from(studyItems).forEach(studyItem => {
      const term       = studyItem.querySelector("[name=term]"      ).value;
      const definition = studyItem.querySelector("[name=definition]").value;
      const category   = studyItem.querySelector("[name=category"   ).value;

      data[`${id}`] = { "term": `${term}`,
                        "def" : `${definition}`,
                        "cat" : `${category}` };
      id++;
    })
    return data;
  }



  const _getStudySetID = () => {
    return window.location.pathname.slice(1);
  }



  //
  return {
    testFunction  : testFunction,
    addStudyItem  : addStudyItem,
    createStudySet: createStudySet,
    loadStudyTerms: loadStudyTerms,
  };
})();

const addStudyItemButton = document.getElementById("study-set-add-item");

if (!!addStudyItemButton) {
  addStudyItemButton.onclick = StudySet.addStudyItem;
}