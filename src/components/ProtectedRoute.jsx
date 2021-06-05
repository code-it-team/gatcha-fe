import { Redirect } from "@reach/router";
import { useState } from "react";
import { _ROUTES } from "src/constants";
import { isAuthorized } from "../helpers/index";
import { PageRoute } from "./PageRoute";

/**
 * @param {object} props
 * @param {JSX.Element} props.pageComponent
 * @param {import("@reach/router").RouteComponentProps} props.path
 * @param {boolean} [props.isDefault]
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ pageComponent, path, isDefault }) => {
  const [isLoggedIn] = useState(isAuthorized());

  if (!isLoggedIn) {
    // @ts-ignore
    return <Redirect from={path} to={_ROUTES.signin} noThrow={true} />;
  }
  return (
    <PageRoute
      path={path}
      pageComponent={pageComponent}
      isDefault={isDefault}
    />
  );
};

export default ProtectedRoute;
