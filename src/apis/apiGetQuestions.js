import { navigate } from "@reach/router";
import { _LOCAL_STORAGE_KEY_NAMES, _ROUTES, _URLS } from "src/constants";
import { headers } from "src/helpers";
import { _END_POINTS } from "./endpoints";

/**
 * Handles get requests
 * @param {string} jwt
 * @param {string} subRoute
 * @param {Function} setter
 * @param {Function} setPublished
 * @returns {void}
 */
const apiGetQuestions = (jwt, subRoute, setter, setPublished) => {
  if (!localStorage.getItem(_LOCAL_STORAGE_KEY_NAMES.jwt))
    apiGetQuestions(jwt, subRoute, setter, setPublished);
  fetch(`${_URLS.baseUrl}${subRoute}`, {
    method: "GET",
    headers: headers(jwt),
  })
    .then((res) => {
      if (res?.ok) {
        // If successful
        res.json().then((res) => {
          if (subRoute === _END_POINTS.questions) {
            setter(res.body.questions);
            setPublished(res.body.published);
          }
        });
      } else {
        // If failed
        res.json().then((res) => {
          console.error(res);
          navigate(_ROUTES.error);
        });
      }
    })
    .catch((err) => {
      console.error(err);
      navigate(_ROUTES.error);
    });
};

export default apiGetQuestions;
