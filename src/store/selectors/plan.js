// getSelectedPlans
const getSelectedPlans = (plans, planFilters) => {
  const {
    text = "",
    price = 0,
    planStatus = "active",
    validityPeriod = 0,
    startDate = moment().startOf("month").valueOf(),
    endDate = moment().endOf("month").valueOf(),
    sortBy = "priceAsc",
  } = { ...planFilters };

  return plans
    .filter((plan) => {
      // textMatch
      const textMatch = plan.title.toLowerCase().includes(text);

      // priceMatch
      const priceMatch = plan.price >= price;

      // planStatusMatch
      const planStatusMatch = !!planStatus
        ? plan.status.toLowerCase() === planStatus.toLowerCase()
        : true;

      // validityPeriodMatch
      const validityPeriodMatch = plan.validityPeriod >= validityPeriod;

      // startDateMatch
      const startDateMatch =
        planStatus === "" ? true : plan.createdAt >= startDate;

      // endDateMatch
      const endDateMatch = planStatus === "" ? true : plan.createdAt <= endDate;

      return (
        textMatch &&
        priceMatch &&
        planStatusMatch &&
        validityPeriodMatch &&
        startDateMatch &&
        endDateMatch
      );
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

export default getSelectedPlans;
