import moment from "moment";

// getSelectedPlans
export const getSelectedPlans = (plans, planFilters) => {
  const {
    text = "",
    price = 100,
    planStatus = "active",
    validityPeriod = 15,
    startDate = null,
    endDate = null,
    sortBy = "priceAsc",
  } = { ...planFilters };

  return plans
    .filter((plan) => {
      // textMatch
      const textMatch = plan.title.toLowerCase().includes(text);

      // priceMatch
      const priceMatch = plan.price >= price * 100;

      // planStatusMatch
      const planStatusMatch = !!planStatus
        ? plan.status.toLowerCase() === planStatus.toLowerCase()
        : true;

      // validityPeriodMatch
      const validityPeriodMatch =
        plan.validityPeriod >= validityPeriod * 24 * 3600 * 1000;

      // startDateMatch
      // const startDateMatch =
      //   planStatus === "" ? true : plan.createdAt >= startDate;
      // console.log(
      //   "plan.createdAt <= startDate",
      //   moment(plan.createdAt).format(),
      //   moment(startDate).format,
      //   plan.createdAt >= startDate
      // );

      // endDateMatch
      // const endDateMatch = planStatus === "" ? true : plan.createdAt <= endDate;
      // console.log(
      //   "plan.createdAt <= EndDate",
      //   moment(plan.createdAt).format(),
      //   moment(endDate).format(),
      //   plan.createdAt <= endDate
      // );
      console.log(
        "id",
        plan.id,
        "textMatch",
        textMatch,
        "priceMatch",
        priceMatch,
        "planStatusMatch",
        planStatusMatch,
        "validityPeriodMatch",
        validityPeriodMatch
      );

      return textMatch && priceMatch && planStatusMatch && validityPeriodMatch;
    })
    .sort((first, second) => {
      if (sortBy.includes("text")) {
        return sortBy === "textAsc"
          ? first.title.toLowerCase() > second.title.toLowerCase()
          : first.title.toLowerCase() < second.title.toLowerCase();
      } else if (sortBy.includes("price")) {
        return sortBy === "priceAsc"
          ? first.price - second.price
          : second.price - first.price;
      } else if (sortBy.includes("validityPeriod")) {
        return sortBy === "validityPeriodAsc"
          ? first.validityPeriod - second.validityPeriod
          : second.validityPeriod - first.validityPeriod;
      }
    });
};
