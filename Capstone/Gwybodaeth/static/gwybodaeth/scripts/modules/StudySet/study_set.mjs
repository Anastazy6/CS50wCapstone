/*  Most likely deprecated due to experimental Angular being successful. Keeping this dead code
      for reference and easier review (could have removed it and use version control for review,
        but this way would be more convenient)

    export const StudySet = (function(){

      const studyItems = [];

      const View = function() {
        const studySet =  document.getElementById("study-items");

        return {
          studySet: studySet
        }
      }()


      // ---------------------
      //        Public
      // ---------------------


      const loadStudySet = (terms) => {

        Object.entries(terms).forEach(term => {
          studyItems.push(term);
          View.studySet.append(_createStudyTerm(term));
        })
      }


      // ---------------------
      //        Private
      // ---------------------


      /**
       * Creates and returns an HTML element with a single study item's term, definition, category and options.
       * @param {Array}  termData    - An array containing all the data needed to create a single study item.
       * @param {number} termData[0] - The first element of the termData array is the ID if a study item, starting with 1
       * @param {Object} termData[1] - An object/dictionary with 3 keys: "term", "def" (definition), "cat" (category).
       * /
      const _createStudyTerm = (termData) => {
        const studyItem = _createStudyTermContainer(termData[0]);

        Object.entries(termData[1]).forEach(([key, value]) => {
          if (key != 'note') {
            studyItem.append(_createStudyTermFields(key, value));
          }
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


      //
      return {
        loadStudySet  : loadStudySet,
        studyItems: studyItems
      };
    })();

*/