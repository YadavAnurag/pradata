import moment from "moment";
import { v4 as uuid } from "uuid";

export const users = [
  {
    id: "1",
    firstName: "Manoj",
    middleName: "Kumar",
    lastName: "Gupta",
    emailId: "manoj@gmail.com",
    contactNumber: "7985000000",
    address: "Sakrawal Tanda Ambedkarnagar",
    status: "active",
    usages: new Array(
      {
        id: "1",
        planId: "1",
        startedAt: moment("2020-08-23").valueOf(),
        paymentDetails: [
          {
            id: uuid(),
            paidAmount: 8000,
            paymentMethod: "on-line",
            paymentReferenceId: "a1",
            paidAt: moment("2020-08-23").valueOf(),
          },
          {
            id: uuid(),
            paidAmount: 8000,
            paymentMethod: "cash",
            paymentReferenceId: "",
            paidAt: moment("2020-09-02").valueOf(),
          },
        ],
      },
      {
        id: "2",
        planId: "2",
        startedAt: moment("2020-06-22").valueOf(),
        paymentDetails: [
          {
            id: uuid(),
            paidAmount: 8000,
            paymentMethod: "On-Line",
            paymentReferenceId: "asdf",
            paidAt: moment("2020-06-22").valueOf(),
          },
        ],
      },
      {
        id: "3",
        planId: "1",
        startedAt: moment("2021-06-28").valueOf(),
        paymentDetails: [
          {
            id: uuid(),
            paidAmount: 80 * 100,
            paymentMethod: "On-Line",
            paymentReferenceId: "asdf",
            paidAt: moment("2020-06-28").valueOf(),
          },
          {
            id: uuid(),
            paidAmount: 20 * 100,
            paymentMethod: "debit card",
            paymentReferenceId: "asdsdf",
            paidAt: moment("2020-07-05").valueOf(),
          },
        ],
      }
    ),
    createdAt: moment("2019-05-21").valueOf(),
  },
  {
    id: "2",
    firstName: "Shiv",
    middleName: "",
    lastName: "Singh",
    emailId: "shiv@gmail.com",
    contactNumber: "9123000000",
    address: "Varanasi UP",
    status: "active",
    usages: [
      {
        id: "1",
        planId: "2",
        startedAt: moment("2021-05-05").valueOf(),
        paymentDetails: [
          {
            id: uuid(),
            paidAmount: 100 * 100,
            paymentMethod: "cash",
            paymentReferenceId: "",
            paidAt: moment("2021-05-05").valueOf(),
          },
        ],
      },
    ],
    createdAt: moment("2019-05-21").valueOf(),
  },
  {
    id: "3",
    firstName: "Anu",
    middleName: "",
    lastName: "",
    emailId: "anu@gmail.com",
    contactNumber: "8354000000",
    address: "Koirana Sakrawal Tanda Ambedkarnagar UP Pin-224190",
    status: "active",
    usages: new Array({
      id: "1",
      planId: "1",
      startedAt: moment("2021-07-01").valueOf(),
      paymentDetails: [
        {
          id: uuid(),
          paidAmount: 20 * 100,
          paymentMethod: "cash",
          paymentReferenceId: "",
          paidAt: moment("2021-07-01").valueOf(),
        },
        {
          id: uuid(),
          paidAmount: 70 * 100,
          paymentMethod: "Online",
          paymentReferenceId: "12342",
          paidAt: moment("2021-07-05").valueOf(),
        },
      ],
    }),
    createdAt: moment("2018-05-21").valueOf(),
  },
  {
    id: "4",
    firstName: "Kushwe",
    middleName: "",
    lastName: "Shivam",
    emailId: "shivam@outlook.com",
    contactNumber: "9874000000",
    status: "inactive",
    address: "Prayagraj UP Pin-224190",
    usages: [],
    createdAt: moment("2016-05-21").valueOf(),
  },
  {
    id: "5",
    firstName: "Anju",
    middleName: "",
    lastName: "Maurya",
    emailId: "anju@yahoo.com",
    contactNumber: "1234000000",
    address: "Hyderabad Telangana",
    status: "active",
    usages: [
      {
        id: "1",
        planId: "3",
        startedAt: moment("2021-07-01").valueOf(),
        paymentDetails: [
          {
            id: uuid(),
            paidAmount: 498 * 100,
            paymentMethod: "credit card",
            paymentReferenceId: "ff123",
            paidAt: moment("2021-07-01").valueOf(),
          },
        ],
      },
    ],
    createdAt: moment("2019-07-01").valueOf(),
  },
];

export const plans = [
  {
    id: "1",
    title: "super",
    price: 100 * 100,
    status: "active",
    description: "super plan",
    validityPeriod: 30 * 24 * 3600 * 1000,
    createdAt: moment("2015-05-21").valueOf(),
  },
  {
    id: "2",
    title: "combo",
    price: 200 * 100,
    status: "active",
    description: "combo plan",
    validityPeriod: 60 * 24 * 3600 * 1000,
    createdAt: moment("2015-05-21").valueOf(),
  },
  {
    id: "3",
    title: "special",
    price: 500 * 100,
    status: "inactive",
    description: "special plan",
    validityPeriod: 90 * 24 * 3600 * 1000,
    createdAt: moment("2015-05-21").valueOf(),
  },
];
