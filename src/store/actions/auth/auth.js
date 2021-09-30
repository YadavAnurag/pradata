import * as actionTypes from "../actionTypes";

// login
export const login = (userId) => ({
  type: actionTypes.LOGIN,
  userId,
});

export const initLogin = () => {
  return async (dispatch) => {
    try {
      console.log("TODO - Will Create login");
      // const response = await userAuthService.authenticate(userAuth);
      const response = {
        auth: {
          userId: "anything",
          isAdmin: true,
        },
      };

      dispatch(login(response.auth.userId));
      return Promise.resolve(response.auth.userId);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
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
