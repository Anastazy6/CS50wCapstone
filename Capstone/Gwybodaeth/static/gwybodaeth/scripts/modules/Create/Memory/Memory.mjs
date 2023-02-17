/**
 * Memory for Create module
 */
export const Memory = (function() {

  const _studyItems = [];

  const addStudyItem = (studyItem) => {
    _studyItems.push(studyItem);
    return this;
  }

  const deleteAt = (index) => {
    let deleted = _studyItems[index];
    _studyItems.splice(index, 1);
    
    return deleted;
  }

  const getAll = () => {
    return _studyItems;
  }

  const getLast = () => {
    return _studyItems.at(-1);
  }

  /**
   * Moves an element from one index to another within the _studyItems Array.
   * @param {int index} from 
   * @param {int index} to 
   */
  const reposition = (from, to) => {
    _studyItems.splice(to, 0, deleteAt(from));
  }

  // #TODO: check if forEach and innerHTML work with getElementsByClassName
  const updateIndexBullets = () => {
    let index = 1;
    document.getElementsByClassName('study-item-index-bullet').forEach(indexBullet => {
      indexBullet.innerHTML = index;
      index++;
    })
  }


  return {
    addStudyItem      : addStudyItem,
    deleteAt          : deleteAt,
    getAll            : getAll,
    getLast           : getLast,
    reposition        : reposition,
    updateIndexBullets: updateIndexBullets
  }
})()