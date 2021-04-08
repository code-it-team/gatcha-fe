import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

/**
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {(event: import("react").SyntheticEvent<Element, Event>) => void}  props.handleClose
 * @param {import("@material-ui/lab/Alert").Color}  props.messageType
 * @param {string}  props.message
 * @returns {JSX.Element}
 */
const CustomNotification = ({ open, handleClose, messageType, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert onClose={handleClose} severity={messageType}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomNotification;
