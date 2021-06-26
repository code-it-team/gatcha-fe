import { navigate } from "@reach/router";
import { _LOCAL_STORAGE_KEY_NAMES, _ROUTES, _URLS } from "src/constants";

/**
 * Handles signup/signin actions of the user
 * @param {object} body
 * @param {string} body.email
 * @param {string} body.password
 * @param {boolean} isAuth If signin request it is True else, false
 * @param {Function} reset
 * @param {Function} fireNotification
 */
const apiAuth = (body, isAuth, reset, fireNotification) => {
  const subRoute = isAuth ? _ROUTES.signin : _ROUTES.signup;
  fetch(`${_URLS.baseUrl}${subRoute}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res?.ok) {
        // If successful
        res.json().then((res) => {
          fireNotification(res.message, "success");
          // save JWT
          localStorage.setItem(_LOCAL_STORAGE_KEY_NAMES.jwt, res.body.jwt);
          if (subRoute === _ROUTES.signup)
            setTimeout(() => navigate(_ROUTES.signin), 300 );
          else setTimeout(() => navigate(_ROUTES.home), 300);
        });
        reset();
      } else {
        // If failed
        res.json().then((res) => {
          console.error(res);
          fireNotification(res.message, "error");
        });
      }
    })
    .catch((err) => {
      console.error(err);
      fireNotification(String(err), "error");
    });
};

export default apiAuth;
