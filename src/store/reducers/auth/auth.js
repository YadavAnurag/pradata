let authDefaultState = null;
if (!localStorage.length) {
  authDefaultState = { userId: "", isAdmin: false };
} else {
  const previousAuthStorage = JSON.parse(localStorage.getItem("auth"));
  authDefaultState = {
    userId:
      previousAuthStorage.userId === undefined
        ? ""
        : previousAuthStorage.userId,
    isAdmin:
      previousAuthStorage.isAdmin === undefined
        ? false
        : previousAuthStorage.isAdmin,
  };
}

console.log("authDefaultState", authDefaultState);

export const authReducer = (state = authDefaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        userId: action.userId,
        isAdmin: action.isAdmin,
      };

    case "LOGOUT":
      return {
        userId: "",
        isAdmin: false,
      };

    default:
      return state;
  }
};
