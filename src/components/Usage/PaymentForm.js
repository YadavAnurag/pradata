import React, { useState } from "react";
import moment from "moment";
import { v4 as uuid } from "uuid";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

const PaymentForm = (props) => {
  // +state
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("digital");
  const [paymentReferenceId, setPaymentReferenceId] = useState("");
  const [error, setError] = useState({
    paidAmount: "",
    paymentMethod: "",
    paymentReferenceId: "",
    suggestDigital: "",
  });
  // -state

  const paymentMethodConfigs = [
    { text: "Digital", value: "digital" },
    { text: "Cash", value: "cash" },
  ];

  // handles
  const handlePaidAmountChange = (e) => {
    const value = e.target.value;

    if (!value || value.match(/^\d{1,}(\.?\d{0,2})$/)) {
      // set error if user enters more price than required for selected plan
      setPaidAmount(value);
      if (value * 100 <= props.dueAmount) {
        // update and clear error
        setError({ paidAmount: "" });
      } else {
        setError({
          paidAmount:
            props.dueAmount === 0
              ? "No dues... all payment received already"
              : `Amount can't be more than ${props.dueAmount / 100}`,
        });
      }
    } else {
      // set error only number allowed
      setError({ paidAmount: "Please enter amount" });
    }
  };
  const handlePaymentMethodChange = (e) => {
    const value = e.target.value;
    setPaymentMethod(value);

    if (value === "cash") {
      // clear error for reference id and suggest for digi
      setError({
        paymentMethod: "",
        paymentReferenceId: "",
        suggestDigital: "Use BHIM App for Digital Transaction",
      });
    } else {
      // clear error and thanks for digi
      setError({
        paymentMethod: "",
        suggestDigital: "Thanks for accepting only digital transaction",
      });
    }
  };
  const handlePaymentReferenceIdChange = (e) => {
    const value = e.target.value;
    setPaymentReferenceId(value);
    setError({ paymentReferenceId: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paidAmount === "") {
      setError((previousError) => ({
        ...previousError,
        paidAmount: "Please enter amount paid",
      }));
    }
    if (paymentMethod === "") {
      setError((previousError) => {
        return {
          ...previousError,
          paymentMethod: "Please choose payment method",
        };
      });
    }
    if (paymentMethod === "digital" && paymentReferenceId === "") {
      setError((previousError) => ({
        ...previousError,
        paymentReferenceId: "Please enter transaction id",
      }));
    }

    let finalMatch = paidAmount !== "" && paymentMethod !== "";
    if (paymentMethod === "digital")
      finalMatch = finalMatch && paymentReferenceId !== "";
    if (finalMatch) {
      const paymentDetail = {
        id: uuid(),
        paidAmount: Number.parseFloat(paidAmount) * 100,
        paymentMethod,
        paymentReferenceId:
          paymentMethod === "digital"
            ? paymentReferenceId
            : "Use BHIM App for Digital Transaction",
        paidAt: moment().valueOf(),
      };
      props.onSubmit(paymentDetail);
    }
  };

  const isError =
    !!error.paidAmount || !!error.paymentMethod || !!error.paymentReferenceId;

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
      <h3>Payment Details</h3>
      {/* <label>Amount</label> */}
      <input
        type="text"
        placeholder={error.paidAmount ? error.paidAmount : "Amount"}
        value={paidAmount}
        onChange={handlePaidAmountChange}
        className={!!error.paidAmount ? "input input-error" : "input"}
      />
      {error.paidAmount && <span>{error.paidAmount}</span>}

      {/* <label>Payment Method</label> */}
      <select
        name="method"
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
        className={!!error.paymentMethod ? "input input-error" : "input"}
      >
        {paymentMethodConfigs.map((paymentMethod, key) => {
          return (
            <option key={key} value={paymentMethod.value}>
              {paymentMethod.text}
            </option>
          );
        })}
      </select>
      {/* <span>{error.paymentMethod}</span> */}

      {/* <label>Payment Reference Id</label> */}
      <input
        type="text"
        placeholder="Reference Id"
        placeholder={
          error.paymentReferenceId ? error.paymentReferenceId : "Reference Id"
        }
        value={paymentReferenceId}
        onChange={handlePaymentReferenceIdChange}
        className={!!error.paymentReferenceId ? "input input-error" : "input"}
      />
      {/* <span>{error.paymentReferenceId}</span> */}

      <div>
        <button
          className={isError ? "button button--disabled" : "button"}
          disabled={isError}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
