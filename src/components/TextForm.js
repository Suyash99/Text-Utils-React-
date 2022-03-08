import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const conditionChecker = (input) => {
    if (input === "") return 0;
    let splitVal = input.split(" ");
    let emptyLen = splitVal.filter((e) => e === "").length;
    splitVal.splice(splitVal.indexOf(""), emptyLen);
    return splitVal.length;
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
  return (
    <>
      <div>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            id="myBox"
            value={text}
            onChange={handleOnChange}
            className="form-control"
            rows="8"
          />
        </div>
        <button className="btn btn-success mx-2" onClick={toUpperCASE}>
          Convert to upper case
        </button>

        <button className="btn btn-success mx-2" onClick={toLowerCASE}>
          Convert to lower case
        </button>
      </div>

      <div className="container my-4">
        <h3> Your Text Summary</h3>
        <p>
          Your words have <b>{conditionChecker(text)}</b> words and{" "}
          <b>{text.length} </b>
          characters!
          <br />
          Minutes taken to read this text (average) -{" "}
          <b>{(0.008 * conditionChecker(text)).toFixed(2)}</b>
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
