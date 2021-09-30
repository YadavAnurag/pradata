import React, { useState, forwardRef, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";

import {
  setUserTextFilter,
  setContactNumberFilter,
  setEmailIdFilter,
  setCurrentPlanIdFilter,
  setUserAccountStatusFilter,
  setIsDueFilter,
  setSortByFilter,
  // setUserStartDateFilter,
  // setUserEndDateFilter,
} from "../../store/actions/user/userFilter";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const UserFilters = (props) => {
  // state
  const [text, setText] = useState(props.filters.text);
  const [contactNumber, setContactNumber] = useState(
    props.filters.contactNumber
  );
  const [emailId, setEmailId] = useState(props.filters.emailId);
  const [planId, setPlanId] = useState(props.filters.planId);
  const [accountStatus, setAccountStatus] = useState(
    props.filters.accountStatus
  );
  const [isDue, setIsDue] = useState(props.filters.isDue);
  const [sortBy, setSortBy] = useState(props.filters.sortBy);
  // const [startDate, setStartDate] = useState(props.filters.startDate);
  // const [endDate, setEndDate] = useState(props.filters.endDate);

  // configs
  const accountStatusConfigs = [
    { text: "All", value: "" },
    { text: "Active", value: "active" },
    { text: "Inactive", value: "inactive" },
  ];
  const isDueConfigs = [
    { text: "All", value: "" },
    { text: "Dues", value: true },
    { text: "No Dues", value: false },
  ];
  const sortByConfigs = [
    { text: "Text ⤴", value: "textAsc" },
    { text: "Text ⤵", value: "textDesc" },
    { text: "Due Amount ⤵", value: "dueAmountDesc" },
    { text: "Due Amount ⤴", value: "dueAmountAsc" },
    // { text: "Due Date ⤴", value: "dueDateAsc" },
    // { text: "Due Date ⤵", value: "dueDateDesc" },
  ];

  // handlers
  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    props.setUserTextFilter(value);
  };
  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    if (value !== "" && /^\d+$/.test(value) === false) {
      // TODO - Use Toast
      alert("Please enter any Number only !!!");
      return;
    }
    setContactNumber(value);
    props.setContactNumberFilter(value);
  };
  const handleEmailIdChange = (e) => {
    const value = e.target.value;
    setEmailId(value);
    props.setEmailIdFilter(value);
  };
  const handleCurrentPlanIdChange = (e) => {
    const value = e.target.value;
    setPlanId(value);
    props.setCurrentPlanIdFilter(value);
  };
  const handleAccountStatusChange = (e) => {
    const value = e.target.value;
    setAccountStatus(value);
    console.log("handle", value);
    props.setUserAccountStatusFilter(value);
  };
  const handleIsDueChange = (e) => {
    let value = e.target.value;
    if (value === "") value = null;
    if (value === "true") value = true;
    if (value === "false") value = false;

    setIsDue(value);
    props.setIsDueFilter(value);
  };
  const handleSortByChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    props.setSortByFilter(value);
  };

  // // ReactDatePicker
  // const StartDateCustomInput = forwardRef(({ value, onClick }, ref) => (
  //   <button className="example-custom-input" onClick={onClick} ref={ref}>
  //     {moment(value).format("DD-MMM-YYYY")}
  //   </button>
  // ));
  // const handleStartDateChange = (e) => {
  //   setStartDate(e);
  //   props.setUserStartDateFilter(e === null ? e : e.valueOf());

  //   // if start or end data is null then make both of them null
  //   // if (e === null) {
  //   //   handleEndDateChange(null);
  //   // }
  // };
  // const handleEndDateChange = (e) => {
  //   setEndDate(e);
  //   props.setUserEndDateFilter(e === null ? e : e.valueOf());

  //   // if start or end data is null then make both of them null
  //   // if (e === null) {
  //   //   handleStartDateChange(null);
  //   // }
  // };

  useEffect(() => {
    // // if date is null then show placeholder in ReactDatePicker
    // if (startDate === null) {
    //   document.querySelectorAll(".example-custom-input")[0].textContent =
    //     "--/--/----";
    // }
    // if (endDate === null) {
    //   document.querySelectorAll(".example-custom-input")[1].textContent =
    //     "--/--/----";
    // }
  });

  return (
    <div>
      <label>Name</label>
      <input
        type="text"
        value={text}
        name="text"
        onChange={handleTextChange}
        placeholder="Enter Text"
      />
      <label>Contact Number</label>
      <input
        type="text"
        value={contactNumber}
        onChange={handleContactNumberChange}
        placeholder="Contact Number"
      />
      <label>Email Id</label>
      <input
        type="email"
        value={emailId}
        onChange={handleEmailIdChange}
        placeholder="Email Id"
      />

      <label>Plan</label>
      <select name="planId" value={planId} onChange={handleCurrentPlanIdChange}>
        <option key={"all"} value={""}>
          {"All"}
        </option>
        {props.plans.map((plan, key) => {
          return (
            <option key={key} value={plan.id}>
              {plan.title}
            </option>
          );
        })}
      </select>

      <label>Account Status</label>
      <select
        name="accountStatus"
        value={accountStatus}
        onChange={handleAccountStatusChange}
      >
        {accountStatusConfigs.map((status, key) => {
          return (
            <option key={key} value={status.value}>
              {status.text}
            </option>
          );
        })}
      </select>

      <label>Dues</label>
      <select
        name="isDue"
        value={isDue === null ? "" : isDue}
        onChange={handleIsDueChange}
      >
        {isDueConfigs.map((due, key) => {
          return (
            <option key={key} value={due.value}>
              {due.text}
            </option>
          );
        })}
      </select>

      <label>Sort By</label>
      <select name="sortBy" value={sortBy} onChange={handleSortByChange}>
        {sortByConfigs.map((sortBy, key) => {
          return (
            <option key={key} value={sortBy.value}>
              {sortBy.text}
            </option>
          );
        })}
      </select>

      {/* <label>Start Date</label>
      <ReactDatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        customInput={<StartDateCustomInput />}
        isClearable
        placeholderText="I have been cleared!"
        // showMonthDropdown
        showYearDropdown
      />

      <label>End Date</label>
      <ReactDatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        customInput={<StartDateCustomInput />}
        isClearable
        placeholderText="I have been cleared!"
      /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plans: state.plans,
    filters: state.userFilters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUserTextFilter: (text) => dispatch(setUserTextFilter({ text })),
    setContactNumberFilter: (contactNumber) =>
      dispatch(setContactNumberFilter({ contactNumber })),
    setEmailIdFilter: (emailId) => dispatch(setEmailIdFilter({ emailId })),
    setCurrentPlanIdFilter: (planId) =>
      dispatch(setCurrentPlanIdFilter({ currentPlanId: planId })),
    setUserAccountStatusFilter: (status) =>
      dispatch(setUserAccountStatusFilter({ userAccountStatus: status })),
    setIsDueFilter: (isDue) => dispatch(setIsDueFilter({ isDue })),
    setSortByFilter: (sortBy) => dispatch(setSortByFilter({ sortBy })),
    // setUserStartDateFilter: (startDate) =>
    //   dispatch(setUserStartDateFilter({ startDate })),
    // setUserEndDateFilter: (endDate) =>
    //   dispatch(setUserEndDateFilter({ endDate })),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserFilters);
