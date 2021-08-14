const DEV_BASE_API_URL = "http://127.0.0.1:6002/api";
const USER_ENDPOINT = "/user-management/users";

const devConfig = {
  devConfig: true,
  baseAPIURL: DEV_BASE_API_URL,
  userEndpoint: USER_ENDPOINT,
};

const prodConfig = {
  prodConfig: false,
  serverURL: DEV_BASE_API_URL,
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
