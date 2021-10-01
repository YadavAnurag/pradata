import * as actionTypes from "../actionTypes";

// login
export const login = ({ userId = "", isAdmin = "" } = {}) => ({
  type: actionTypes.LOGIN,
  userId,
  isAdmin,
});

export const initLogin = ({ id = "" } = {}) => {
  return async (dispatch) => {
    if (id === "") return Promise.reject("User Id can't be empty string");

    try {
      console.log("TODO - Will Create login");
      // const response = await userAuthService.authenticate(userAuth);
      const response = {
        auth: {
          userId: "xyz3",
          isAdmin: true,
        },
      };

      dispatch(login(response.auth));
      return Promise.resolve(true);
    } catch (err) {
      console.log(err);
      return Promise.reject("Login Failed, Please try again later...");
    }
  };
};

// logout
export const logout = () => {
  return { type: actionTypes.LOGOUT };
};

export const initLogout = () => {
  return () => {
    console.log("TODO - Will init logout");
  };
};
