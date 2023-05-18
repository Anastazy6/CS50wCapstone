import CreateForm from "./Components/CreateForm";

function App() {
  const rootNode = document.getElementById('react-root');
  const root     = ReactDOM.createRoot(rootNode);

  root.render(
    <StrictMode>
      <CreateForm />
    </StrictMode>
  )
}


export default App;