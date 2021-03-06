import { toast } from "react-toastify";
import * as actionTypes from "../actionTypes";

import authService from "../../../services/auth.Service";

// login
export const login = ({ userId, isAdmin }) => ({
  type: actionTypes.LOGIN,
  userId,
  isAdmin,
});

export const initLogin = (authDetails) => {
  return async (dispatch) => {
    try {
      const response = await authService.authenticate(authDetails);

      if (response.data.error) {
        toast.error(response.data.msg);
        return Promise.reject(response.data.msg);
      } else {
        // no error

        dispatch(
          login({
            userId: response.data.userId,
            isAdmin: response.data.isAdmin,
          })
        );
        return Promise.resolve(response.data.userId);
      }
    } catch (err) {
      return Promise.reject("Authentication Failed, Please try again later...");
    }
  };
};

// logout
export const logout = () => {
  return { type: actionTypes.LOGOUT };
};

export const initLogout = () => {
  return async (dispatch) => {
    try {
      dispatch(logout());
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject("Logout Failed");
    }
  };
};
