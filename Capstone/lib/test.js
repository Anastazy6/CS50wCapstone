import { createRoot } from 'react-dom/client';
console.log("eeeee");
const root = createRoot(document.getElementById('react-test'));
root.render( /*#__PURE__*/React.createElement("p", null, "If you see this then React works properly"));