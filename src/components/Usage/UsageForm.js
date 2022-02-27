import React, { useState } from "react";
import moment from "moment";
import { v4 as uuid } from "uuid";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

const UsageForm = (props) => {
  // +state
  const [planId, setPlanId] = useState(props.plans[0].id);
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("digital");
  const [paymentReferenceId, setPaymentReferenceId] = useState("");
  const [error, setError] = useState({
    planId: "",
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
  const handleCurrentPlanIdChange = (e) => {
    const value = e.target.value;
    setPlanId(value);
    setError({ planId: "" });
  };
  const handlePaidAmountChange = (e) => {
    const value = e.target.value;

    if (!value || value.match(/^\d{1,}(\.?\d{0,2})$/)) {
      // set error if user enters more price than required for selected plan
      const currentPlanPrice = props.plans.find(
        (plan) => plan.id === planId
      ).price;

      if (value * 100 <= currentPlanPrice) {
        // update and clear error
        setError({ paidAmount: "" });
        setPaidAmount(value);
      } else {
        setError({
          paidAmount: `Amount can't be more than ${currentPlanPrice / 100}`,
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
    console.log("[UsageForm: handleSubmit - props.onSubmit]");
    e.preventDefault();
    if (planId === "") {
      setError((previousError) => ({
        ...previousError,
        planId: "Please choose a plan",
      }));
    }
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

    let finalMatch = planId !== "" && paidAmount !== "" && paymentMethod !== "";
    if (paymentMethod === "digital")
      finalMatch = finalMatch && paymentReferenceId !== "";
    if (finalMatch) {
      props.onSubmit({
        planId,
        paymentDetails: [
          {
            id: uuid(),
            paidAmount: Number.parseFloat(paidAmount) * 100,
            paymentMethod,
            paymentReferenceId:
              paymentMethod === "digital"
                ? paymentReferenceId
                : "Use BHIM App for Digital Transaction",
            paidAt: moment().valueOf(),
          },
        ],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Plan</label>
        <select
          name="planId"
          value={planId}
          onChange={handleCurrentPlanIdChange}
        >
          {props.plans.map((plan, key) => {
            return (
              <option key={key} value={plan.id}>
                {plan.title}
              </option>
            );
          })}
        </select>
        <span>{error.planId}</span>
      </div>
      <h2>Payment Details</h2>
      <label>Paid Amount</label>
      <input
        type="text"
        placeholder="Amount"
        value={paidAmount}
        onChange={handlePaidAmountChange}
      />
      <span>{error.paidAmount}</span>

      <label>Payment Method</label>
      <select
        name="method"
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
      >
        {paymentMethodConfigs.map((paymentMethod, key) => {
          return (
            <option key={key} value={paymentMethod.value}>
              {paymentMethod.text}
            </option>
          );
        })}
      </select>
      <span>{error.paymentMethod}</span>

      <label>Payment Reference Id</label>
      <input
        type="text"
        placeholder="Reference Id"
        value={paymentReferenceId}
        onChange={handlePaymentReferenceIdChange}
      />
      <span>{error.paymentReferenceId}</span>

      <div>
        <button>Save Plan</button>
      </div>
    </form>
  );
};

export default UsageForm;
