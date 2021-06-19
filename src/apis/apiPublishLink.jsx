import { _URLS } from "src/constants";
import { getSharableLink, headers } from "src/helpers";

/**
 * @param {string} jwt
 * @param {string} subRoute
 * @param {Function} fireNotification
 * @param {Function} setProfileLink
 */
const apiGetPublishLink = (jwt, subRoute, fireNotification, setProfileLink) => {
  fetch(`${_URLS.baseUrl}${subRoute}`, {
    method: "GET",
    headers: headers(jwt),
  })
    .then((res) => {
      if (res?.ok) {
        // If successful
        res.json().then((res) => {
          setProfileLink(getSharableLink(res.body.link));
        });
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

export default apiGetPublishLink;
