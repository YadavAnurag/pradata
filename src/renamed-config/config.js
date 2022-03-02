const DEV_BASE_API_URL = process.env.REACT_APP_PROD_BASE_API_URL;
const USER_ENDPOINT = "/user-management/users";

const devConfig = {
  devConfig: true,
  baseAPIURL: DEV_BASE_API_URL,
  userEndpoint: USER_ENDPOINT,
};

const prodConfig = {
  prodConfig: false,
  baseAPIURL: DEV_BASE_API_URL,
};

let config = {};

if (devConfig.devConfig) {
  config = { ...prodConfig, ...devConfig };
} else {
  config = { ...devConfig, ...prodConfig };
}

// set seedDatabase true of false
config.seedStore = true;

// is Auth Required for login
config.isAuthRequired = true;

module.exports = config;
