import { Util } from "../../Utilities/util.mjs";

/**
 * Study Item model for the Create module. This model contains input fields for the DOM.
 */
export const StudyItemCreator = function () {
  let studyItemGuts;
  const setGuts = guts => {
    studyItemGuts = guts;
  };
  const createStudyItem = () => {
    const studyItem = _createNewStudyItemWrapper();
    studyItem.append(_createIndexBullet());
    studyItem.append(_createNewStudyItem());
    return studyItem;
  };
  const _createNewStudyItemWrapper = () => {
    const wrapper = document.createElement('div');
    wrapper.classList.add("create-item-wrapper-single");
    return wrapper;
  };
  const _createIndexBullet = () => {
    const indexBullet = document.createElement('div');
    indexBullet.classList.add('create-item-index-bullet', 'bg-lleuad', 'text-lleuad-lawn');
    indexBullet.innerHTML = Util.generateIndex();
    return indexBullet;
  };
  const _createNewStudyItem = () => {
    const newStudyItem = document.createElement('div');
    newStudyItem.classList.add('create-item-container');
    if (!!studyItemGuts) {
      newStudyItem.innerHTML = studyItemGuts;
    } else {
      fetch('static/gwybodaeth/scripts/modules/Create/Models/study_item_guts.html').then(response => response.text()).then(result => {
        studyItemGuts = result;
        newStudyItem.innerHTML = studyItemGuts;
      });
    }
    return newStudyItem;
  };
  return {
    createStudyItem: createStudyItem,
    setGuts: setGuts
  };
}();