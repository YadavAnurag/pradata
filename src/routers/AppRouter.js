import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import AddPaymentPage from "../components/Usage/AddPaymentPage";
import AddPlanPage from "../components/Plan/AddPlanPage";
import AddUsagePage from "../components/Usage/AddUsagePage";
import AddUserPage from "../components/User/AddUserPage";
import Dashboard from "../components/Dashboard/Dashboard";
import EditPlanPage from "../components/Plan/EditPlanPage";
import EditUserPage from "../components/User/EditUserPage";
import ErrorPage from "../components/Error/ErrorPage";
import HelpPage from "../components/Help/HelpPage";
import Navigation from "../components/Navigation/Navigation";
import PlanListPage from "../components/Plan/PlanListPage";
import ProfilePage from "../components/Profile/ProfilePage";
import UserListPage from "../components/User/UserListPage";
import UsagePage from "../components/Usage/UsagePage";

// const history = createBrowserHistory({
//   forceRefresh: false,
// });
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/users" exact>
          <UserListPage />
        </Route>
        <Route path="/users/add" exact>
          <AddUserPage />
        </Route>
        <Route path="/users/edit" exact>
          <EditUserPage />
        </Route>
        <Route path="/usages" exact>
          <UsagePage />
        </Route>
        <Route path="/users/renew" exact>
          <AddUsagePage />
        </Route>
        <Route path="/users/add-payment" exact>
          <AddPaymentPage />
        </Route>
        <Route path="/users/add" exact>
          <AddUserPage />
        </Route>
        <Route path="/plans" exact>
          <PlanListPage />
        </Route>
        <Route path="/plans/add" exact>
          <AddPlanPage />
        </Route>
        <Route path="/plans/edit" exact>
          <EditPlanPage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/about" exact>
          <HelpPage />
        </Route>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
