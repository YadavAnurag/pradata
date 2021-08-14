import axios from "axios";

import config from "../config/config";

export default axios.create({
  baseURL: config.baseAPIURL,
  headers: {
    "Content-Type": "application/json",
  },
});
