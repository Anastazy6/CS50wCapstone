import { Util } from "../../vanillaJS/modules/Utilities/util.js"; // For getCookie for CSRF token

import createReducer from "../Reducers/createReducer.js";
import FormHead from "./Components/FormHead.js";
import StudyItem from "./Components/StudyItem.js";
export default function CreateForm() {
  return /*#__PURE__*/React.createElement("form", {
    id: "create-set",
    action: "",
    method: "POST"
  }, /*#__PURE__*/React.createElement("div", {
    id: "create-set-info-wrapper",
    className: "bg-moon-glass"
  }, /*#__PURE__*/React.createElement(FormHead, null)), /*#__PURE__*/React.createElement("div", {
    id: "create-items-wrapper"
  }, /*#__PURE__*/React.createElement(StudyItem, null), /*#__PURE__*/React.createElement(StudyItem, null), /*#__PURE__*/React.createElement(StudyItem, null), /*#__PURE__*/React.createElement(StudyItem, null), /*#__PURE__*/React.createElement(StudyItem, null), /*#__PURE__*/React.createElement(StudyItem, null)), /*#__PURE__*/React.createElement("div", {
    id: "create-form-buttons-container"
  }, /*#__PURE__*/React.createElement("button", {
    id: "create-set-add-item",
    className: "btn\r btn-outline-lleuad-lawn\r create-set-button",
    type: "button"
  }, "Add item"), /*#__PURE__*/React.createElement("input", {
    id: "create-set-submit",
    className: "btn\r btn-outline-lleuad-lawn\r create-set-button",
    type: "submit",
    value: "Create study set"
  })));
}