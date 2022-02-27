import React, { useRef, useState } from "react";

const Accordion = (props) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("gg-chevron-down");

  const content = useRef(null);

  const toggleAccordion = () => {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "gg-chevron-down" : "gg-chevron-up"
    );
  };

  return (
    <div className="accordion">
      <div className="accordion__header" onClick={toggleAccordion}>
        {props.title}
        <i className={setRotate}></i>
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion__content"
      >
        {props.children}
      </div>
    </div>
  );
};

export default Accordion;
