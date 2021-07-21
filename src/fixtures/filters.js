import moment from "moment";

export const userFilters = {
  text: "",
  contactNumber: "",
  planId: "", // using dropdown
  accountStatus: "", //active or inactive
  sortBy: "textAsc",
  startDate: moment().startOf("month").valueOf(),
  endDate: moment().endOf("month").valueOf(),
};
