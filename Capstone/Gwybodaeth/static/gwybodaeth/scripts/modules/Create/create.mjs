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

import { Memory           } from "./Memory/Memory.mjs";
import { View             } from "./View/View.mjs";
import { StudyItemCreator } from "./Models/study_item_creator.mjs";


export const Create = (function() {
  
  // ---------------------
  //        Public
  // ---------------------

  

  const createStudySet = () => {
    let studySetInfo = View.getStudySetInfo();

    fetch('/create-set', {
      method: 'POST',
      headers: {
        "X-CSRFToken" : View.CSRFToken.value,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "title"       : studySetInfo.title,
        "description" : studySetInfo.description,
        "terms-lang"  : studySetInfo.termsLang,
        "defs-lang"   : studySetInfo.defsLang,
        "terms"       : _getNewStudySetData()
      })
    })
    .then(response => response.json())
    .then(result   => {
      console.log(result);
    })
    return false;
  }

  const debug = () => {
    console.log("DEBUG clicked");
    console.log(Memory.getAll());

  }

  const _intermodularMethods = () => {
    return {
      addStudyItem: _addStudyItem,
      submit      : createStudySet,
      debug       : debug
    }
  }

  const run = () => {
    _loadStudyItemGuts();
    View.initialize(_intermodularMethods());
    

  }

  const _addStudyItem = () => {
    Memory.addStudyItem(StudyItemCreator.createStudyItem());
    View.showNewItem(Memory.getLast());
  }

  // ---------------------
  //        Private
  // ---------------------

  const _getNewStudySetData = () => {
    let   id         = 1
    let   data       = {};
    const studyItems = Memory.getAll();
    console.log(studyItems);
    
    Array.from(studyItems).forEach(studyItem => {
      const term       = studyItem.querySelector("[name=term]"      ).value;
      const definition = studyItem.querySelector("[name=definition]").value;
      const category   = studyItem.querySelector("[name=category]"  ).value;
      const notes      = studyItem.querySelector("[name=notes]"     ).value

      data[`${id}`] = { "term": `${term}`,
                        "def" : `${definition}`,
                        "cat" : `${category}`,
                        "note": `${notes}`};
      id++;
    })
    return data;
  }

  const _loadStudyItemGuts = () => {
    fetch('static/gwybodaeth/scripts/modules/Create/Models/study_item_guts.html')
    .then(response => response.text())
    .then(result => {
      StudyItemCreator.setGuts(result);
    });
  }

  


  return {
  //  addStudyItem  : addStudyItem,
    run           : run,
    createStudySet: createStudySet
  }

})();