const onAuthStateChanged = (auth) => {
  console.log(
    "[onAuthStateChanged] Called ",
    auth,
    localStorage,
    localStorage.length
  );

  return new Promise((resolve, reject) => {
    if (!localStorage.length) {
      // no storage
      console.log("1 no storage");
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      const previousAuth = JSON.parse(localStorage.getItem("auth"));
      // console.log("previousAuth", previousAuth);
      console.log("2 some storage", previousAuth);

      if (
        previousAuth.userId !== auth.userId ||
        previousAuth.isAdmin !== auth.isAdmin
      ) {
        console.log("3 gonna set", JSON.stringify(auth));
        localStorage.setItem("auth", JSON.stringify(auth));
      }
    }
    resolve("");
  });
};

export default onAuthStateChanged;
