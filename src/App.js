import { Router } from "@reach/router";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import { _ROUTES } from "./constants/routes";

const App = () => {
  return (
    <Router>
      <SignInPage
        // @ts-ignore
        path={_ROUTES.signin}
        default
      />
      <SignUpPage
        // @ts-ignore
        path={_ROUTES.signup}
      />
    </Router>
  );
};

export default App;
