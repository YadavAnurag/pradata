import moment from "moment";
import React, { useState } from "react";

const DatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className="example-custom-input" onClick={handleClick}>
        {moment(startDate).format("dd-mm-yyyy")}
      </button>
      {isOpen && (
        <DatePicker selected={startDate} onChange={handleChange} inline />
      )}
    </div>
  );
};

export default DatePicker;
