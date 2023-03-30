import { Memory           } from "./Memory/Memory.mjs";
import { View             } from "./View/View.mjs";
import { StudyItemCreator } from "./Models/study_item_creator.mjs";
import { Util             } from "../Utilities/util.mjs";

export const Create = (function() {
  
  // ---------------------
  //        Public
  // ---------------------

  const createStudySet = () => {
    fetch('/create-set', {
      method: 'POST',
      headers: {
        "X-CSRFToken" : View.CSRFToken.value,
        "Content-Type": "application/json"
      },
      body: _generatePostBody()
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      Util.redirect(result['set-url']);
    })
    return false;
  }


  const _generatePostBody = () => {
    let data = View.getStudySetInfo();

    let body = JSON.stringify({
        "title"       : data.title,
        "description" : data.description,
        "terms-lang"  : data.termsLang,
        "defs-lang"   : data.defsLang,
        "terms"       : _getNewStudySetData()
    })

    console.log(body);
    
    return body;
  }


  const _intermodularMethods = () => {
    return {
      addStudyItem    : _addStudyItem,
      autoAddStudyItem: _autoAddStudyItem,
      submit          : createStudySet,
    }
  }

  const run = () => {
    View.initialize(_intermodularMethods());
  }

  const _addStudyItem = () => {
    Memory.addStudyItem(StudyItemCreator.createStudyItem());
    View  .showNewItem (Memory.getLast());
  }

  // ---------------------
  //        Private
  // ---------------------

  const _getNewStudySetData = () => {
    let   id         = 1
    let   data       = {};
    const studyItems = Memory.getAll();
    
    Array.from(studyItems).forEach(studyItem => {
      const term       = studyItem.querySelector("[name=term]"      ).value;
      const definition = studyItem.querySelector("[name=definition]").value;
      const category   = studyItem.querySelector("[name=category]"  ).value;
      const notes      = studyItem.querySelector("[name=notes]"     ).value;

      data[`${id}`] = { "term": `${term}`,
                        "def" : `${definition}`,
                        "cat" : `${category}`,
                        "note": `${notes}`};
      id++;
    })
    return data;
  }


  const _autoAddStudyItem = () => {
    _addStudyItem();
    View.focusLastItem();
  }

  


  return {
    run           : run,
    createStudySet: createStudySet
  }

})();