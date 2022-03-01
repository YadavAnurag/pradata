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
import EditConnectPage from "../components/Connect/EditConnectPage";
import ErrorPage from "../components/Error/ErrorPage";
import HomePage from "../components/Home/HomePage";
import ConnectPage from "../components/Connect/ConnectPage";
import Header from "../components/Header/Header";
import PlanListPage from "../components/Plan/PlanListPage";
import PaymentPage from "../components/UserPayment/UserPayment";
import ProfilePage from "../components/Profile/ProfilePage";
import UserListPage from "../components/User/UserListPage";
import UsagePage from "../components/Usage/UsagePage";
import Footer from "../components/Footer/Footer";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRouter";
import AdminRoute from "./AdminRouter";
import LoginPage from "../components/Login/LoginPage";

// const history = createBrowserHistory({
//   forceRefresh: false,
// });
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoute path="/login" component={LoginPage} exact />
        <PublicRoute path="/plans/" component={PlanListPage} exact />
        <PublicRoute path="/connect" component={ConnectPage} exact />
        <PublicRoute path="/" component={HomePage} exact />

        <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
        <PrivateRoute path="/users/edit" component={EditUserPage} exact />
        <PrivateRoute path="/usages" component={UsagePage} exact />
        <PrivateRoute path="/payments" component={PaymentPage} exact />
        <PrivateRoute path="/profile" component={ProfilePage} exact />

        <PrivateRoute path="/users" component={UserListPage} exact={true} />
        <AdminRoute path="/users/add" component={AddUserPage} exact />
        <AdminRoute
          path="/users/add-payment"
          component={AddPaymentPage}
          exact
        />
        <AdminRoute path="/users/renew" component={AddUsagePage} exact />
        <AdminRoute path="/plans/add" component={AddPlanPage} exact />
        <AdminRoute path="/plans/edit" component={EditPlanPage} exact />
        <AdminRoute path="/connect/edit" component={EditConnectPage} exact />

        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
