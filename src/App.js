import { Router } from "@reach/router";
import { Suspense } from "react";
import { PageRoute } from "./components/PageRoute";
import EditPage from "./components/pages/EditPage";
import ErrorPage from "./components/pages/ErrorPage";
import HomePage from "./components/pages/HomePage";
import ProfilePage from "./components/pages/ProfilePage";
import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { _ROUTES } from "./constants/routes";

const App = () => {
  return (
    <Suspense fallback={<div>loading ...</div>}>
      <Router>
        <PageRoute path={_ROUTES.signin} pageComponent={<SignInPage />} />
        <PageRoute path={_ROUTES.signup} pageComponent={<SignUpPage />} />
        <ProtectedRoute path={_ROUTES.home} pageComponent={<HomePage />} />
        <ProtectedRoute path={_ROUTES.edit} pageComponent={<EditPage />} />
        <PageRoute path={_ROUTES.error} pageComponent={<ErrorPage />} />
        <PageRoute path={_ROUTES.profileLink} pageComponent={<ProfilePage />} />
      </Router>
    </Suspense>
  );
};

export default App;
