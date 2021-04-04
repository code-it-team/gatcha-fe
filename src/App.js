import { Router } from "@reach/router";
import SignInModal from "./components/SignInModal";
import { _URLS } from "./constants/urls";

const App = () => {
  return (
    <Router>
      <SignInModal path={_URLS.signin} default />
    </Router>
  );
};

export default App;
