import { makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";

/**
 * @param {string} msg
 */
export const renderError = (msg) =>
  msg ? <Alert severity="error">{msg}</Alert> : "";

/**
 *
 * @param {boolean} isSubmitting
 * @param {boolean} isValid
 * @param {object} touchedFields
 * @returns
 */
export const isSubmitDisabled = (isSubmitting, isValid, touchedFields) => {
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
