const devConfig = {
  devConfig: true,
  baseAPIURL: process.env.REACT_APP_DEV_BASE_API_URL,
};

const prodConfig = {
  prodConfig: false,
  baseAPIURL: process.env.REACT_APP_PROD_BASE_API_URL,
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

export default config;
