import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TextForm(props) {
  //Defining States
  const [mystyle, setMyStyle] = useState({
    color: "black",
    backgroundColor: "white",
  });
  const [text, setText] = useState("");

  //Functions invoked on "onClick" EVENT
  const wordCount = () => {
    return text.split(" ").length === 1 ? 0 : text.split(" ").length;
  };

  const toggleMode = () => {
    if (props.toggleMode === "light") {
      setMyStyle({
        color: "black",
        backgroundColor: "white",
      });
    } else {
      setMyStyle({
        color: "white",
        backgroundColor: "black",
      });
    }
  };

  const spaceHandler = () => {
    if (!text) return "";
    let splitVal = text.trim().split(" ");
    let string = "";
    splitVal.forEach((elements) => {
      if (elements) {
        string += `${elements} `;
      }
    });
    setText(string);
  };

  const toUpperCASE = () => {
    let upperCaseText = text.toUpperCase();
    setText(upperCaseText);
  };

  const toLowerCASE = () => {
    let lowerCaseText = text.toLowerCase();
    setText(lowerCaseText);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  //Main Functional Component
  return (
    <>
      <div style={mystyle}>
        <h1>{props.heading}</h1>
        <div className="mb-3" style={mystyle}>
          <textarea
            id="myBox"
            value={text}
            onChange={handleOnChange}
            className="form-control"
            rows="8"
          />
        </div>
        <button
          className="btn btn-dark mx-2 px-2"
          onClick={toUpperCASE}
          style={mystyle}
        >
          Convert to upper case
        </button>
        <button
          className="btn btn-dark mx-2 px-2"
          onClick={toLowerCASE}
          style={mystyle}
        >
          Convert to lower case
        </button>
        <button
          className="btn btn-dark mx-2 px-2"
          onClick={spaceHandler}
          style={mystyle}
        >
          Remove Unnecessary Spaces
        </button>
      </div>

      <div className="container my-4" style={mystyle}>
        <h3> Your Text Summary</h3>
        <p>
          Your words have <b>{wordCount()}</b> words and <b>{text.length} </b>
          characters!
          <br />
          Minutes taken to read this text (average) -{" "}
          <b>{(0.008 * text.length).toFixed(2)}</b>
        </p>

        <h2>Preview of your Text</h2>
        <p>{text}</p>
      </div>
    </>
  );
}

TextForm.propTypes = {
  heading: PropTypes.string,
};

TextForm.defaultProps = {
  heading: "Heading Goes Here",
};
