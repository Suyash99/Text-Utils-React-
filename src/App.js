import "./App.css";
import { useState } from "react";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import { Routes, Route } from "react-router";

function App() {
  //State
  const [mode, setMode] = useState("light");
  const [btnText, setBtnText] = useState("Enable Dark Mode");

  //Helping Functions
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setBtnText("Disable Dark Mode");
      // document.body.style.backgroundColor = "#042743";
      document.body.style.backgroundColor = "black";
    } else {
      setMode("light");
      setBtnText("Enable Dark Mode");
      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <Routes>
      <Route path="/" element={
        <div>
          <Navbar
            mode={mode}
            title="Text Utilities"
            homeText="Home"
            aboutText="About"
            toggleMode={toggleMode}
            btnText={btnText}
          />
          <div className="container my-3">
            <TextForm heading="Converter" toggleMode={mode} />
          </div>
        </div>
      } />
      <Route path="/about" element={
        <div>
          <Navbar
            mode={mode}
            title="Text Utilities"
            homeText="Home"
            aboutText="About"
            toggleMode={toggleMode}
            btnText={btnText}
          />
          <About />
        </div>
      } />
    </Routes>
  );
}

export default App;
