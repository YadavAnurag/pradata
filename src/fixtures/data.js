import moment from "moment";

export const users = new Array(
  {
    id: "1",
    firstName: "Manoj",
    middleName: "Kumar",
    lastName: "Gupta",
    gender: "male",
    emailId: "manoj@gmail.com",
    contactNumber: "7985000000",
    address: "Sakrawal Tanda Ambedkarnagar",
    accountStatus: "active",
    usages: new Array(
      {
        id: "1",
        planId: "1",
        startedAt: moment("2020-08-23").valueOf(),
        paymentDetails: {
          paidAmount: 8000,
          paymentMethod: "cash",
          paymentRefId: "a1",
        },
      },
      {
        id: "2",
        planId: "2",
        startedAt: moment("2020-06-22").valueOf(),
        paymentDetails: {
          paidAmount: 20000,
          paymentMethod: "online",
          paymentRefId: "a2",
        },
      },
      {
        id: "3",
        planId: "1",
        startedAt: moment("2020-05-21").valueOf(),
        paymentDetails: {
          paidAmount: 10000,
          paymentMethod: "online",
          paymentRefId: "a3",
        },
      }
    ),
    createdAt: moment("2019-05-21").valueOf(),
  },
  {
    id: "2",
    firstName: "Shiv",
    middleName: "",
    lastName: "Singh",
    gender: "male",
    emailId: "shiv@gmail.com",
    contactNumber: "9123000000",
    address: "Varanasi UP",
    accountStatus: "active",
    usages: new Array(
      {
        id: "1",
        planId: "2",
        startedAt: moment("2020-09-24").valueOf(),
        paymentDetails: {
          paidAmount: 10000,
          paymentMethod: "online",
          paymentRefId: "a1",
        },
      },
      {
        id: "2",
        planId: "1",
        startedAt: moment("2020-08-23").valueOf(),
        paymentDetails: {
          paidAmount: 18000,
          paymentMethod: "online",
          paymentRefId: "a2",
        },
      }
    ),
    createdAt: moment("2019-05-21").valueOf(),
  },
  {
    id: "3",
    firstName: "Anu",
    middleName: "",
    lastName: "",
    gender: "male",
    emailId: "anu@gmail.com",
    contactNumber: "8354000000",
    address: "Koirana Sakrawal Tanda Ambedkarnagar UP Pin-224190",
    accountStatus: "inactive",
    usages: new Array({
      id: "1",
      planId: "1",
      startedAt: moment("2020-01-01").valueOf(),
      paymentDetails: {
        paidAmount: 8000,
        paymentMethod: "cash",
        paymentRefId: "a1",
      },
    }),
    createdAt: moment("2018-05-21").valueOf(),
  },
  {
    id: "4",
    firstName: "Kushwe",
    middleName: "",
    lastName: "Shivam",
    gender: "female",
    emailId: "shivam@gmail.com",
    contactNumber: "9874000000",
    address: "Prayagraj UP Pin-224190",
    usages: new Array(),
    createdAt: moment("2016-05-21").valueOf(),
  }
);

export const plans = new Array(
  {
    id: "1",
    title: "super",
    price: 10000,
    description: "super plan",
    validityPeriod: 30 * 24 * 3600 * 1000,
    createdAt: moment("2015-05-21").valueOf(),
  },
  {
    id: "2",
    title: "combo",
    price: 20000,
    description: "combo plan",
    validityPeriod: 60 * 24 * 3600 * 1000,
    createdAt: moment("2015-05-21").valueOf(),
  },
  {
    id: "3",
    title: "special",
    price: 50000,
    description: "special plan",
    validityPeriod: 90 * 24 * 3600 * 1000,
    createdAt: moment("2015-05-21").valueOf(),
  }
);
