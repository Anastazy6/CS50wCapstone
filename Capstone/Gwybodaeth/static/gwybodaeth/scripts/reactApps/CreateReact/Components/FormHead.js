import LanguagePicker from "./LanguagePicker.js";
function htmlFormHead() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    id: "create-set-title",
    type: "text",
    name: "title",
    size: "81",
    maxLength: "127",
    placeholder: "Title",
    required: true
  }), /*#__PURE__*/React.createElement("textarea", {
    id: "create-set-description",
    name: "description",
    maxlenght: "1023",
    placeholder: "Description"
  }), /*#__PURE__*/React.createElement("div", {
    id: "terms-lang-container"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "terms-lang-container"
  }, "Terms language:"), /*#__PURE__*/React.createElement(LanguagePicker, {
    id: "terms-lang",
    name: "terms-lang",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    id: "defs-lang-container"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "defs-lang-container"
  }, "Definitions language:"), /*#__PURE__*/React.createElement(LanguagePicker, {
    id: "defs-lang",
    name: "defs-lang",
    required: true
  })));
}
export default htmlFormHead;