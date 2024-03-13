import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Alert from "./Alert";
import "../App.css";

export default function TextForm(props) {
  //Defining States
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [collapsedNodes, setCollapsedNodes] = useState({});
  const textAreaRef = useRef(null);
  let lines = 0
  const defaultRows = "12"


  const toogleTextColor = () => { return { color: props.toggleMode === "light" ? "black" : "white" } }

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


  const toggleCollapse = (nodeKey) => {
    setCollapsedNodes((prevNodes) => ({
      ...prevNodes,
      [nodeKey]: !prevNodes[nodeKey],
    }));
  };

  const renderExpandCollapseButton = (nodeKey) => {
    const isCollapsed = collapsedNodes[nodeKey];

    return (
      <button
        className="btn btn-sm btn-dark mx-1"
        onClick={() => toggleCollapse(nodeKey)}
        style={{
          ...toggleMode(),
          padding: '0.2rem 0.3rem',
          fontSize: '0.8rem',
        }}
      >
        {isCollapsed ? '+' : '-'}
      </button>
    );
  };

  const renderChildNode = (key, value, depth) => {
    const indent = '_'.repeat(depth * 2)

    console.log(`value: ${value}`);
    if (typeof value === 'object' && value !== null) {
      const isCollapsed = collapsedNodes[key];

      return (
        <div key={key}>
          {indent}
          {renderExpandCollapseButton(key)}
          {key}: {isCollapsed ? '{...},' : renderJsonObject(value, depth + 1)}
        </div>
      );
    } else {
      return (
        <div key={key}>
          {indent}
          {key}: {value}
        </div>
      );
    }
  };

  const renderJsonObject = (jsonObject, depth) => {
    const keys = Object.keys(jsonObject);

    return (
      <>
        {'{'}
        {keys.map((key, index) => (
          <div key={key}>
            {renderChildNode(key, jsonObject[key], depth)}
            {index < keys.length - 1 ? ',' : ''}
          </div>
        ))}
        {depth === 0 ? '}' : '}'}
      </>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const textArea = textAreaRef.current;
      const lineNumberColumn = document.getElementById('lineNumberColumn');
      if (textArea && lineNumberColumn) {
        lineNumberColumn.scrollTop = textArea.scrollTop;
      }
    };

    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (textArea) {
        textArea.removeEventListener('scroll', handleScroll);
      }
    };
  }, [text]);

  const spaceHandler = () => {
    let alertMsg = "";
    let type = "success";
    if (!text) {
      alertMsg = "Please enter the text to be converted!";
      type = "warning";
      setMsg(alertMsg);
      setType(type);

      return "";
    } else alertMsg = "Cleared Unneccessary Blank Spaces";
    let string = text?.replace("\n    ", "")?.replace("\n}", "}")?.replace("\n]", "]")?.split(/[ \n]/).filter(t => t).map(t => t.trim()).join(" ");
    setMsg(alertMsg);
    setType(type);
    setText(string);
    setEndTime(0)
    setStartTime(0)
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

  const copyContent = async () => {
    try {
      if (!text?.length) throw new Error('Please enter some text to be copied');
      await navigator.clipboard.writeText(text);
      setMsg("Copied successfully");
      setType("success");

      setTimeout(() => {
        setMsg('');
        setType('');
      }, 3000)
    } catch (error) {
      setMsg(error.message);
      setType("warning");
    }
  }

  const getLineNumbers = () => {
    lines = text?.split("\n").length;
    if (lines <= defaultRows) lines = defaultRows
    return Array.from({ length: lines }, (_, index) => index + 1).join("\n");
  };

  const validateJSON = () => {
    try {
      let alertMsg = "";
      let type = "success";
      if (!text.length) {
        throw new Error('Please enter the text to be converted!')
      } else alertMsg = "Converted to JSON successfully";

      let parsedJson = JSON.parse(text)
      parsedJson = JSON.stringify(parsedJson, null, 4)?.toString() ?? text

      setText(parsedJson);
      setMsg(alertMsg);
      setType(type);
      setEndTime(0)
      setStartTime(0)
    } catch (error) {
      setMsg(error.message);
      setType("warning");
    }
  }

  const toUpperCASE = () => {
    let upperCaseText = text.toUpperCase();
    let alertMsg = "";
    let type = "success";
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
    let alertMsg = "";
    let type = "success";
    if (!text) {
      alertMsg = "Please enter the text to be converted!";
      type = "warning";
    } else alertMsg = "Converted to LowerCase successfully";
    setMsg(alertMsg);
    setType(type);
    setText(lowerCaseText);
  };

  const calculateWordsPerMinute = () => {
    const words = wordCount();
    const timeInSeconds = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    const minutes = timeInSeconds / 60; // Convert seconds to minutes
    return minutes ? Math.round(words / minutes) : 0;
  };

  const isArrayOrObject = (text) => {
    try {
      if (typeof text == 'object') return 1
      JSON.parse(text)
      return 1 // If parsed without error: means its a valid JSON or Array 
    } catch (error) {
      return 0
    }
  }

  //Functions invoked on "onClick" EVENT
  const wordCount = () => {
    if (!text || isArrayOrObject(text)) {
      return 0;
    }

    let words = 0;
    const countWordsInElement = (element) => {
      if (typeof element === 'string') {
        words += element?.split(/\s+/).filter(t => t).length;
      } else if (Array.isArray(element)) {
        element.forEach(countWordsInElement);
      } else if (typeof element === 'object') {
        Object.values(element).forEach(countWordsInElement);
      }
    };

    try {
      const parsedData = JSON.parse(text);
      countWordsInElement(parsedData);
    } catch (error) {
      // Handle parsing error, if any
      countWordsInElement(text);
    }

    return words;
  };

  const charCountWithoutSpace = () => {
    if (isArrayOrObject(text)) { return 0 }
    return text.length
  }

  const charCountWithSpace = () => {
    if (isArrayOrObject(text)) { return 0 }
    return text.replace(/\s/g, '').length
  }

  const countWpm = () => {
    if (isArrayOrObject(text)) return 0
    return (0.008 * text.length).toFixed(2)
  }


  //Main Functional Component
  return (
    <>
      {/* <div>{renderSuccessMsg(msg, msg, type)}</div> */}
      <div style={toggleMode()}>
        <section className="mb-3 headerSection">

          <div className="heading" style={toogleTextColor()}>
            {props.heading}
          </div>

          <div className="successMessage">
            {renderSuccessMsg(msg, msg, type)}
          </div>

          <button
            id="copyToClipboard"
            className="clipboardButton"
            onClick={copyContent}
          >Copy To Clipboard</button>

        </section>


        <div className="mb-3 position-relative" style={{ fontFamily: 'monospace' }}>
          <div id="lineNumberColumn" className="line-numbers position-absolute">
            {getLineNumbers()}
          </div>
          <textarea
            ref={textAreaRef}
            id="myBox"
            value={text}
            onChange={handleOnChange}
            className="form-control"
            rows={defaultRows}
            style={{ paddingLeft: `${40 + (String(lines).length * 5)}px` }} // Adjust the padding to align with line numbers
          />

          {/* used to add the textbox resize arrow */}
          <style>{`
          textarea {
          resize: both;
          overflow: none;
          }
          `}</style>

        </div>


        {/* Action Buttons */}
        <button
          className="btn btn-dark mx-2 px-2 button-53"
          // className="button-27"
          onClick={toUpperCASE}
          style={toggleMode()}
        >
          Convert to upper case
        </button>

        <button
          className="btn btn-dark mx-2 px-2 button-53"
          onClick={toLowerCASE}
          style={toggleMode()}
        >
          Convert to lower case
        </button>

        <button
          className="btn btn-dark mx-2 px-2 button-53"
          onClick={spaceHandler}
          style={toggleMode()}
        >
          Remove Unnecessary Spaces
        </button>

        <button
          className="btn btn-dark mx-2 px-2 button-53"
          onClick={validateJSON}
          style={toggleMode()}
        >
          Validate JSON
        </button>

      </div >

      <div className="container my-4" style={toggleMode()}>
        <h3> Your Text Summary</h3>
        <p>
          Your words have
          <button className="btn btn-light mx-2 px-2" disabled>{wordCount()}</button>words and
          <button className="btn btn-light mx-2 px-2" disabled>{charCountWithoutSpace()}</button>characters including space and
          <button className="btn btn-light mx-2 px-2" disabled> {charCountWithSpace()}</button>excluding space!
          <br />Minutes taken to read this text (average)
          <button className="btn btn-light mx-2 px-2" disabled>{countWpm()}</button>
          <br />Estimated Words Per Minute (WPM)
          <button className="btn btn-light mx-2 px-2" disabled>{calculateWordsPerMinute()}</button>
        </p>

        <h2>Preview of your Text</h2>
        <p>{text.replace(/\s/g, '').length ? text : props.previewMode}</p>

        <div className="container my-4" style={toggleMode()}>
          <h2>JSON view</h2>
          <div>
            {isArrayOrObject(text) ? (
              renderJsonObject(JSON.parse(text), 1)
            ) : (
              <p>{text}</p>
            )}
          </div>
        </div>

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
