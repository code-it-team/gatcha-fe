import { navigate } from "@reach/router";
import { _ROUTES, _URLS } from "src/constants";

/**
 * Handles get requests
 * @param {string} subRoute
 * @param {Function} setter
 * @param {Function} fireNotification
 * @returns {void}
 */
const apiGetProfile = (subRoute, setter, fireNotification) => {
  fetch(`${_URLS.baseUrl}${subRoute}`, {
    method: "GET",
  })
    .then((res) => {
      if (res?.ok) {
        // If successful×
        res.json().then((res) => {
          setter(res.body.questions);
          fireNotification(res.message, "success");
        });
      } else {
        // If failed
        res.json().then((res) => {
          console.error(res);
          navigate(_ROUTES.error);
          fireNotification(res.message, "error");
        });
      }
    })
    .catch((err) => {
      console.error(err);
      navigate(_ROUTES.error);
      fireNotification(String(err), "error");
    });
};

export default apiGetProfile;
