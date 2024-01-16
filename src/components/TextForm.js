import React, { useState } from "react";
import PropTypes from "prop-types";
import Alert from "./Alert";

export default function TextForm(props) {
  //Defining States
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");

  //Functions invoked on "onClick" EVENT
  const wordCount = () => {
    text=text.trim()
    return text.split(" ").length === 1 ? 0 : text.split(" ").length;
  };

  const toggleMode = () => {
    return props.toggleMode === "light"
      ? {
          color: "black",
          backgroundColor: "white",
        }
      : {
          color: "white",
          backgroundColor: "black",
        };
  };

  const spaceHandler = () => {
    var alertMsg = "";
    var type = "success";
    if (!text) {
      alertMsg = "Please enter the text to be converted!";
      type = "warning";
      setMsg(alertMsg);
      setType(type);

      return "";
    } else alertMsg = "Cleared Unneccessary Blank Spaces";
    let splitVal = text.trim().split(" ");
    let string = "";
    splitVal.forEach((elements) => {
      if (elements) {
        string += `${elements} `;
      }
    });
    setMsg(alertMsg);
    setType(type);
    setText(string);
  };

  const toUpperCASE = () => {
    let upperCaseText = text.toUpperCase();
    var alertMsg = "";
    var type = "success";
    if (!text) {
      alertMsg = "Please enter the text to be converted!";
      type = "warning";
    } else alertMsg = "Converted to Uppercase successfully";
    setMsg(alertMsg);
    setType(type);
    setText(upperCaseText);
  };

  const toLowerCASE = () => {
    let lowerCaseText = text.toLowerCase();
    var alertMsg = "";
    var type = "success";
    if (!text) {
      alertMsg = "Please enter the text to be converted!";
      type = "warning";
    } else alertMsg = "Converted to LowerCase successfully";
    setMsg(alertMsg);
    setType(type);
    setText(lowerCaseText);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
    setMsg("");
    setType("");
  };

  const renderSuccessMsg = (boolean, text, type) => {
    if (boolean && !text) {
      return (
        <Alert
          message={"Please Enter Text to Convert"}
          type={"warning"}
        ></Alert>
      );
    }
    if (boolean) {
      return <Alert message={text} type={type}></Alert>;
    }
    return <></>;
  };

  //Main Functional Component
  return (
    <>
      <div>{renderSuccessMsg(msg ? true : false, msg, type)}</div>
      <div style={toggleMode()}>
        <h1>{props.heading}</h1>
        <div className="mb-3" style={toggleMode()}>
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
          style={toggleMode()}
        >
          Convert to upper case
        </button>
        <button
          className="btn btn-dark mx-2 px-2"
          onClick={toLowerCASE}
          style={toggleMode()}
        >
          Convert to lower case
        </button>
        <button
          className="btn btn-dark mx-2 px-2"
          onClick={spaceHandler}
          style={toggleMode()}
        >
          Remove Unnecessary Spaces
        </button>
      </div>

      <div className="container my-4" style={toggleMode()}>
        <h3> Your Text Summary</h3>
        <p>
          Your words have <b>{wordCount()}</b> words and <b>{text.length} </b>
          characters!
          <br />
          Minutes taken to read this text (average) -{" "}
          <b>{(0.008 * text.length).toFixed(2)}</b>
        </p>

        <h2>Preview of your Text</h2>
        <p>{text.length ? text : props.previewMode}</p>
      </div>
    </>
  );
}

TextForm.propTypes = {
  heading: PropTypes.string,
  previewMode: PropTypes.string,
};

TextForm.defaultProps = {
  heading: "Heading Goes Here",
  previewMode: "Enter some text to preview",
};
