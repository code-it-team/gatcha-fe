import { _ROUTES, _URLS } from "src/constants";

const headers = {
  "Content-Type": "application/json",
};

/**
 * Handles signup/signin actions of the user
 * @param {object} body
 * @param {string} body.email
 * @param {string} body.password
 * @param {boolean} isAuth If signin request it is True else, false
 * @param {Function} reset
 * @param {Function} fireNotification
 */
export const apiAuth = (body, isAuth, reset, fireNotification) => {
  const subRoute = isAuth ? _ROUTES.signin : _ROUTES.signup;
  fetch(`${_URLS.baseUrl}${subRoute}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res?.ok) {
        // If successful
        res.json().then((res) => {
          fireNotification(res.message, "success");
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
