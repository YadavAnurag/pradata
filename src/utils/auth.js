const onAuthStateChanged = (auth) => {

  // check if localStorage contains userId
  const parsedLocalStorage = JSON.parse(localStorage.getItem("auth"));
  const isAuthAvailableInLocalStorage = localStorage.length &&
    (parsedLocalStorage !== null);

  return new Promise((resolve, reject) => {
    if (!isAuthAvailableInLocalStorage) {
      // no storage
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      const previousAuth = JSON.parse(localStorage.getItem("auth"));

      if (
        previousAuth.userId !== auth.userId ||
        previousAuth.isAdmin !== auth.isAdmin
      ) {
        localStorage.setItem("auth", JSON.stringify(auth));
      }
    }
    resolve("");
  });
};

export default onAuthStateChanged;
