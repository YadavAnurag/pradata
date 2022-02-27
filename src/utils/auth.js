const onAuthStateChanged = (auth) => {
  //   console.log(
  //     "[onAuthStateChanged] Called ",
  //     auth,
  //     localStorage,
  //     localStorage.length
  //   );

  return new Promise((resolve, reject) => {
    if (!localStorage.length) {
      // no storage
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      const previousAuth = JSON.parse(localStorage.getItem("auth"));
      console.log("previousAuth", previousAuth);
      console.log(
        previousAuth.userId,
        auth.userId,
        previousAuth.userId !== auth.userId
      );
      console.log(
        previousAuth.isAdmin,
        auth.isAdmin,
        previousAuth.isAdmin !== auth.isAdmin
      );
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
