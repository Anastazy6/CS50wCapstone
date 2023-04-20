//import React from 'react'
//import ReactDOM from 'react-dom/client'

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render( /*#__PURE__*/React.createElement("h1", null, "Hello, world"));