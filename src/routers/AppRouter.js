import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ErrorPage from "../components/Error/ErrorPage";
import HelpPage from "../components/Help/HelpPage";
import HomePage from "../components/Home/HomePage";
import Navigation from "../components/Navigation/Navigation";
import ProfilePage from "../components/Profile/ProfilePage";
import UsagePage from "../components/Usage/UsagePage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/usage" exact>
          <UsagePage />
        </Route>
        <Route path="/help" exact>
          <HelpPage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
