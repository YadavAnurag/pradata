export const authReducer = (state = { userId: "", isAdmin: false }, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        userId: action.userId,
        isAdmin: action.isAdmin,
      };

    case "LOGOUT":
      return {};

    default:
      return state;
  }
};
