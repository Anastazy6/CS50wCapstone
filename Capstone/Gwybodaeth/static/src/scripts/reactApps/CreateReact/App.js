import CreateForm from "./Components/CreateForm.js";


function App() {
  const rootNode = document.getElementById('react-root');
  const root     = ReactDOM.createRoot(rootNode);

  root.render(
    <CreateForm />
  )
}


export default App;