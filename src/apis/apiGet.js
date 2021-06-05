import { navigate } from "@reach/router";
import { _LOCAL_STORAGE_KEY_NAMES, _ROUTES, _URLS } from "src/constants";
import { _END_POINTS } from "./endpoints";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem(_LOCAL_STORAGE_KEY_NAMES.jwt)}`,
};

/**
 * Handles get requests
 * @param {string} subRoute
 * @param {Function} setter
 * @returns {void}
 */
export const apiGet = (subRoute, setter) => {
  fetch(`${_URLS.baseUrl}${subRoute}`, {
    method: "GET",
    headers,
  })
    .then((res) => {
      if (res?.ok) {
        // If successful
        res.json().then((res) => {
          if (subRoute === _END_POINTS.questions) {
            setter(res.body.questions);
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
