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

/**
 * Capitalizes a string. The first letter will be upcased whild the rest will be downcased.
 */
String.prototype.capitalize = function() {
  return this[0].toUpperCase() + this.slice(1).toLowerCase();
}

export const StudySet = (function(){
// Public functions
  const testFunction = () => {
    console.log("StudySet module loaded successfully!");
  }

  const View = function() {
    const studySet =  document.getElementById("study-items");

    return {
      studySet: studySet
    }
  }()


  const addStudyItem = () => {
    const studyItemsWrapper = document.getElementById("study-items-wrapper")
    studyItemsWrapper.append(_createNewStudyItem());
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



  const prepareData = (terms) => {
    Object.entries(terms).forEach(term => {
      View.studySet.append(_createStudyTerm(term));
    })
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
    // TODO (core): create buttons for editing and marking a term as difficult.
    const studyOptions = document.createElement('div');
    studyOptions.classList.add( "study-set-cell-1",
                                "study-options");
    studyOptions.innerHTML = "TODO";
    
    return studyOptions;
  }


  const _getNewStudySetData = () => {
    let   id         = 1
    let   data       = {};
    const studyItems = document.getElementsByClassName("study-item");
    
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

  const _createNewStudyItem = () => {
    const newStudyItem      = document.createElement('div');
    newStudyItem.classList.add( "form-line",
                                "study-item");
    _addFormInputsTo(newStudyItem);
    return newStudyItem;
  }


  const _addFormInputsTo = (newStudyItem) => {
    ['term', 'definition'].forEach(name => {
      newStudyItem.append(_createTextarea(name));
    })
    newStudyItem.append(_createTextInput("category"));
  }


  const _createInputContainer = () => {
    const container = document.createElement('div');
    container.classList.add("form-cell");

    return container;
  }

  const _createTextarea = (name) => {
    const container = _createInputContainer();
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

  const _createTextInput = (name) => {
    const container = _createInputContainer();
    const input     = document.createElement("input");

    container.append(input);
    input    .classList.add(`${name}-input`)
    input    .setAttributes(
      { "name"       : name,
        "type"       : "text",
        "placeholder": name.capitalize()}
    );

    return container;
  }


  //
  return {
    testFunction  : testFunction,
    addStudyItem  : addStudyItem,
    createStudySet: createStudySet,
    prepareData   : prepareData,
  };
})();