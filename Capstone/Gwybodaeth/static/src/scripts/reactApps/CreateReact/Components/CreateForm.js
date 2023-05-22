import { Util } from "../../../vanillaJS/modules/Utilities/util.js"; // For getCookie for CSRF token

import createReducer from "../Reducers/createReducer.js";

import FormHead      from "./FormHead.js";
import StudyItem     from "./StudyItem.js";

export default function CreateForm() {
  return (
    <form id    ="create-set" 
          action=""
          method="POST">

    
      <div  id       ="create-set-info-wrapper"
            className="bg-moon-glass">

        <FormHead />
      </div>

      <div id="create-items-wrapper">
        <StudyItem />
        <StudyItem />
        <StudyItem />
        <StudyItem />
        <StudyItem />
        <StudyItem />
      </div>


    <div id="create-form-buttons-container">
      
      <button id        ="create-set-add-item"
              className ="btn
                          btn-outline-lleuad-lawn
                          create-set-button"
              type      ="button">
        Add item
      </button>

      <input  id        ="create-set-submit"
              className ="btn
                          btn-outline-lleuad-lawn
                          create-set-button"
              type      ="submit" 
              value     ="Create study set"/>

    </div>

  </form>
  )
}