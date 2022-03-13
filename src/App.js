import "./App.css";
import { useState } from "react";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
function App() {
  const [mode, setMode] = useState("Light");
  return (
    <>
      <Navbar
        title="Test Title"
        homeText="Home"
        aboutText="About"
      />
      <div className="container my-3">
        <TextForm heading="Upper Case Converter" mode={mode} />
      </div>
      {/* <About></About> */}
    </>
  );
}

export default App;
