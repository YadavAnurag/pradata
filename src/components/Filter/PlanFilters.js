import React, { useState, forwardRef, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  setPlanTextFilter,
  setPriceFilter,
  setPlanStatusFilter,
  setValidityPeriodFilter,
  setPlanSortByFilter,
} from "../../store/actions/plan/planFilter";

const PlanFilters = (props) => {
  // state
  const [text, setText] = useState(props.filters.text);
  const [price, setPrice] = useState(props.filters.price);
  const [planStatus, setPlanStatus] = useState("active");
  const [validityPeriod, setValidityPeriod] = useState(
    props.filters.validityPeriod
  );
  const [sortBy, setSortBy] = useState(props.filters.sortBy);

  // configs
  const planStatusConfigs = [
    { text: "All", value: "" },
    { text: "Active", value: "active" },
    { text: "Inactive", value: "inactive" },
  ];
  const sortByConfigs = [
    { text: "Text ⤴", value: "textAsc" },
    { text: "Text ⤵", value: "textDesc" },
    { text: "Price ⤴", value: "priceAsc" },
    { text: "Price ⤵", value: "priceDesc" },
    { text: "Validity Period ⤴", value: "validityPeriodAsc" },
    { text: "Validity Period ⤵", value: "validityPeriodDesc" },
  ];

  // handlers
  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    props.setPlanTextFilter(value);
  };
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value !== "" && /^\d+$/.test(value) === false) {
      // TODO - Use Toast
      alert("Price should be any Number only !!!");
      return;
    }
    setPrice(value);
    props.setPriceFilter(value);
  };
  const handlePlanStatusChange = (e) => {
    const value = e.target.value;
    setPlanStatus(value);
    props.setPlanStatusFilter(value);
  };
  const handleValidityPeriodChange = (e) => {
    const value = e.target.value;
    if (value !== "" && /^\d+$/.test(value) === false) {
      // TODO - Use Toast
      alert("Price should be any Number only !!!");
      return;
    }
    setValidityPeriod(value);
    props.setValidityPeriodFilter(value);
  };

  const handleSortByChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    props.setPlanSortByFilter(value);
  };

  return (
    <div className="content-container">
      <div className="input-group">
        <div className="input-group__item">
          <input
            type="text"
            value={text}
            name="text"
            onChange={handleTextChange}
            placeholder="Plan Title"
          />
        </div>
        <div className="input-group__item">
          {/* <label>Price:</label> */}
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="Plan Price"
          />
        </div>
        <div className="input-group__item">
          {/* <label>Validity:</label> */}
          <input
            type="text"
            value={validityPeriod}
            onChange={handleValidityPeriodChange}
            placeholder="Validity Period"
          />
        </div>
      </div>
      <div className="input-group">
        <div className="input-group__item">
          {/* <label>Sort:</label> */}
          <select name="sortBy" value={sortBy} onChange={handleSortByChange}>
            {sortByConfigs.map((sortBy, key) => {
              return (
                <option key={key} value={sortBy.value}>
                  {sortBy.text}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-group__item">
          <select
            name="planStatus"
            value={planStatus}
            onChange={handlePlanStatusChange}
          >
            {planStatusConfigs.map((status, key) => {
              return (
                <option key={key} value={status.value}>
                  {status.text}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plans: state.plans,
    filters: state.planFilters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setPlanTextFilter: (text) => dispatch(setPlanTextFilter({ text })),
    setPriceFilter: (price) => dispatch(setPriceFilter({ price })),
    setPlanStatusFilter: (status) =>
      dispatch(setPlanStatusFilter({ planStatus: status })),
    setValidityPeriodFilter: (validityPeriod) =>
      dispatch(setValidityPeriodFilter({ validityPeriod })),
    setPlanSortByFilter: (sortBy) => dispatch(setPlanSortByFilter({ sortBy })),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlanFilters);
