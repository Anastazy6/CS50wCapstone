function StudyItem() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "create-item-index-bullet\r bg-lleuad \r text-lleuad-lawn"
  }), /*#__PURE__*/React.createElement("div", {
    className: "create-item-container"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "term-input \r create-item-input",
    name: "term",
    placeholder: "Enter term",
    required: true
  }), /*#__PURE__*/React.createElement("textarea", {
    className: "definition-input \r create-item-input",
    name: "definition",
    placeholder: "Enter definition",
    required: true
  }), /*#__PURE__*/React.createElement("textarea", {
    className: "category-input \r create-item-input",
    name: "category",
    placeholder: "Enter category"
  }), /*#__PURE__*/React.createElement("textarea", {
    className: "notes-input \r create-item-input",
    name: "notes",
    placeholder: "Enter notes"
  })));
}
export default StudyItem;