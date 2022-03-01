const onAuthStateChanged = (auth) => {
  return new Promise((resolve, reject) => {
    if (!localStorage.length) {
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
