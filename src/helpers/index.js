import Alert from "@material-ui/lab/Alert";

/**
 * @param {string} msg
 */
export const renderError = (msg) =>
  msg ? <Alert severity="error">{msg}</Alert> : "";
