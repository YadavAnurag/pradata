import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
// import { createBrowserHistory } from "history";

import AddPaymentPage from "../components/Usage/AddPaymentPage";
import AddPlanPage from "../components/Plan/AddPlanPage";
import AddUsagePage from "../components/Usage/AddUsagePage";
import AddUserPage from "../components/User/AddUserPage";
import Dashboard from "../components/Dashboard/Dashboard";
import EditPlanPage from "../components/Plan/EditPlanPage";
import EditUserPage from "../components/User/EditUserPage";
import ErrorPage from "../components/Error/ErrorPage";
import HomePage from "../components/Home/HomePage";
import HelpPage from "../components/Help/HelpPage";
import Header from "../components/Header/Header";
import PlanListPage from "../components/Plan/PlanListPage";
import PaymentPage from "../components/UserPayment/UserPayment";
import ProfilePage from "../components/Profile/ProfilePage";
import UserListPage from "../components/User/UserListPage";
import UsagePage from "../components/Usage/UsagePage";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRouter";
import LoginPage from "../components/Login/LoginPage";

// const history = createBrowserHistory({
//   forceRefresh: false,
// });
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoute path="/dashboard" component={Dashboard} exact={true} />
        <PublicRoute path="/users" component={UserListPage} exact={true} />
        <PublicRoute path="/users/add" component={AddUserPage} exact />
        <PublicRoute path="/users/edit" component={EditUserPage} exact />
        <PublicRoute
          path="/users/add-payment"
          component={AddPaymentPage}
          exact
        />

        <PublicRoute path="/usages" component={UsagePage} exact />
        <PublicRoute path="/users/renew" component={AddUsagePage} exact />

        <PublicRoute path="/plans/add" component={AddPlanPage} exact />
        <PublicRoute path="/plans/edit" component={EditPlanPage} exact />

        {/* <PrivateRoute path="/dashboard" component={Dashboard} exact={true} /> */}
        <PublicRoute path="/login" component={LoginPage} exact />
        <PublicRoute path="/plans/" component={PlanListPage} exact />
        <PublicRoute path="/payments" component={PaymentPage} exact />
        <PublicRoute path="/profile" component={ProfilePage} exact />
        <PublicRoute path="/help" component={HelpPage} exact />
        <PublicRoute path="/" component={HomePage} exact />
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
