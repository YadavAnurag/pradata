import axios from "axios";
import config from "./config";

// console.log("baseAPIURL", baseAPIURL);
const instance = axios.create({
  baseURL: config.baseAPIURL,
});

export default instance;
