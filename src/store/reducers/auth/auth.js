export const authReducer = (state = { uid: "aja" }, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        uid: action.uid,
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
