function App() {
  document.innerHTML = '';
  const root = ReactDOM.createRoot(document.createElement('div'));
  root.render( /*#__PURE__*/React.createElement("h1", null, "Hello, world"));
}
export default App;