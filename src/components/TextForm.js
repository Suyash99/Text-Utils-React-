import React, { useState } from "react";
import PropTypes from "prop-types";
import Alert from "./Alert";

export default function TextForm(props) {
  //Defining States
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  //Functions invoked on "onClick" EVENT
  const wordCount = () => {
    return !text.length ? 0 : text.split(/[ \n]/).filter(t => t).length
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
    let string = text.split(/[ \n]/).filter(t => t).map(t => t.trim()).join(" ");
    setMsg(alertMsg);
    setType(type);
    setText(string);
    setEndTime(0)
    setStartTime(0)
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
    setEndTime(0)
    setStartTime(0)
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
    setEndTime(Date.now())

    if (!startTime) {
      setStartTime(Date.now())
    }
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

  const calculateWordsPerMinute = () => {
    const words = wordCount();
    const timeInSeconds = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    const minutes = timeInSeconds / 60; // Convert seconds to minutes
    return minutes ? Math.round(words / minutes) : 0;
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
          Your words have <button className="btn btn-light mx-1 px-10" disabled>{wordCount()} </button>words and<button className="btn btn-light mx-2 px-2" disabled>{text.length} </button>
          characters including space and<button className="btn btn-light mx-2 px-2" disabled> {text.split(/[ \n]/).filter(t => t).join('').length}</button>excluding space!
          <br />
          Minutes taken to read this text (average) -{" "}<button className="btn btn-light mx-2 px-2" disabled>{(0.008 * text.length).toFixed(2)}</button>
          <br />
          Estimated Words Per Minute (WPM)<button className="btn btn-light mx-2 px-2" disabled>{calculateWordsPerMinute()}</button>
        </p>

        <h2>Preview of your Text</h2>
        <p>{text.split(/[ \n]/).filter(t => t).join('').length ? text : props.previewMode}</p>
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
