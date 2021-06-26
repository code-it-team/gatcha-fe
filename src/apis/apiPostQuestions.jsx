import { navigate } from "@reach/router";
import { _ROUTES, _URLS } from "src/constants";
import { headers } from "src/helpers";

/**
 * Handles signup/signin actions of the user
 * @param {string} jwt
 * @param {string} subRoute
 * @param {object} body
 * @param {Function} reset
 * @param {Function} fireNotification
 */
const apiPostQuestions = (jwt, subRoute, body, reset, fireNotification) => {
  fetch(`${_URLS.baseUrl}${subRoute}`, {
    method: "POST",
    headers: headers(jwt),
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res?.ok) {
        // If successful
        res.json().then((res) => {
          fireNotification(res.message, "success");
          navigate(_ROUTES.home);
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

export default apiPostQuestions;
