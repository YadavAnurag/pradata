import * as actionTypes from "../actionTypes";

// login
export const login = (uid) => ({
  type: actionTypes.LOGIN,
  uid,
});

export const initLogin = () => {
  return () => {
    console.log("TODO - Will init login");
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
