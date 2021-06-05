import { makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import { _LOCAL_STORAGE_KEY_NAMES } from "src/constants";

/**
 * @param {string} msg
 */
export const renderError = (msg) =>
  msg ? <Alert severity="error">{msg}</Alert> : "";

/**
 * @param {undefined | boolean} requestResolved
 * @param {boolean} isSubmitting
 * @param {boolean} isValid
 * @param {object} touchedFields
 * @returns {boolean}
 */
export const isSubmitDisabled = (
  requestResolved,
  isSubmitting,
  isValid,
  touchedFields
) => {
  if (requestResolved !== undefined) return !requestResolved;
  if (isSubmitting || _.isEmpty(touchedFields)) return true;
  return isValid ? false : true;
};

export const formStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/**
 * Check if user is logged in
 * @returns {boolean}
 */
export const isAuthorized = () => {
  return localStorage.getItem(_LOCAL_STORAGE_KEY_NAMES.jwt) ? true : false;
};
