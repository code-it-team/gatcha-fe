import { navigate } from "@reach/router";
import { _LOCAL_STORAGE_KEY_NAMES, _ROUTES, _URLS } from "src/constants";
import { headers } from "src/helpers";

/**
 * Handles get requests
 * @param {string} jwt
 * @param {string} subRoute
 * @param {Function} setter
 * @param {Function} setPublished
 * @returns {void}
 */
const apiGetQuestions = (jwt, subRoute, setter, setPublished) => {
  fetch(`${_URLS.baseUrl}${subRoute}`, {
    method: "GET",
    headers: headers(jwt),
  })
    .then((res) => {
      if (res?.ok) {
        // If successful
        res.json().then((res) => {
          setter(res.body.questions);
          setPublished(res.body.published);
        });
      } else if (res.status === 400) {
        // If failed, not valid token
        res.text().then((err) => {
          console.error(err);
          localStorage.removeItem(_LOCAL_STORAGE_KEY_NAMES.jwt);
          navigate(_ROUTES.signin);
        });
      }
    })
    .catch((err) => {
      console.error(err);
      navigate(_ROUTES.error);
    });
};

export default apiGetQuestions;
