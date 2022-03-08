import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
function App() {
  return (
    <>
      <Navbar title="Test Title" homeText="Home" aboutText="About" />
      <div className="container my-3">
        <TextForm heading="Upper Case Converter" />
      </div>
    </>
  );
}

export default App;
