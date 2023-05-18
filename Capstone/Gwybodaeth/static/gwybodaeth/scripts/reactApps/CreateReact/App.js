import CreateForm from "./Components/CreateForm";
function App() {
  const rootNode = document.getElementById('react-root');
  const root = ReactDOM.createRoot(rootNode);
  root.render( /*#__PURE__*/React.createElement(StrictMode, null, /*#__PURE__*/React.createElement(CreateForm, null)));
}
export default App;