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

export const Create = (function() {
  
  // ---------------------
  //        Public
  // ---------------------

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

  const addStudyItem = () => {
    const studyItemsWrapper = document.getElementById("study-items-wrapper")
    studyItemsWrapper.append(_createNewStudyItemWrapper());
  }

  // ---------------------
  //        Private
  // ---------------------

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


  const _createNewStudyItemWrapper = () => {
    const wrapper = document.createElement('div');
    wrapper.classList.add("study-item-wrapper-single");

    wrapper.append(_createIndexBullet());
    wrapper.append(_createNewStudyItem());

    return wrapper;
  }

  
  const _createIndexBullet = () => {
    const indexBullet = document.createElement('div');

    indexBullet.classList.add('study-item-index-bullet',
                              'bg-lleuad',
                              'text-lleuad-lawn');
    indexBullet.innerHTML = _generateIndex();
    return indexBullet;
  }


  const _generateIndex = (function() {
    let index = 5;
    return function() {index += 1; return index;}
  })()


  const _createNewStudyItem = () => {
    const newStudyItem = document.createElement('div');

    newStudyItem.classList.add('study-item-container');

    _addFormInputsTo(newStudyItem);
    return newStudyItem;
  }
  

  const _addFormInputsTo = (newStudyItem) => {
    let inputFields = [
        'term',
        'definition',
        'category',
        'notes'
    ]

    let required = [
        'term',
        'definition'
    ]
    
    inputFields.forEach(name => {
      newStudyItem.append(_createTextarea(name, required));
    })
  }

  const _createTextarea = (name, required) => {
    const textarea  = document.createElement("textarea");
    
    textarea .setAttributes(
      { "name"       : name,
        "cols"       : 25,
        "rows"       : 1,
        "required"   : required.includes(name) ? true : false,
        "placeholder": `Enter ${name}`}
    );

    textarea.classList.add(
        `${name}-input`,
        'study-item-input'
    )
    
    return textarea;
  }


  return {
    addStudyItem  : addStudyItem,
    createStudySet: createStudySet
  }

})();