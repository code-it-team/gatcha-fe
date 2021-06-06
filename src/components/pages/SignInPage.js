import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link } from "@reach/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { apiAuth } from "src/apis/apiAuth";
import { _ROUTES } from "src/constants";
import { _MESSAGES } from "src/constants/messages";
import { isSubmitDisabled, renderError } from "src/helpers";
import * as yup from "yup";
import CustomNotification from "../CustomNotification";
import PageContainer from "../PageContainer";

// ########################################################
// #####################   Helpers    #####################
// ########################################################

// ########################################################
// ##############   Schema & Default Values   #############
// ########################################################
const schema = yup.object().shape({
  email: yup.string().email(_MESSAGES.emailFormat).required(_MESSAGES.required),
  password: yup.string().required(_MESSAGES.required),
});

const defaultValues = {
  email: "",
  password: "",
};

// ########################################################
// ######################   Styles    #####################
// ########################################################
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// ########################################################
// ################   Helper Components    ################
// ########################################################
const Form = () => {
  // ##################   Initializers    #################
  const classes = useStyles();
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    reset,
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues,
  });

  // #####################   State    #####################
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [requestResolved, setRequestResolved] = useState(undefined);
  const [messageType, setMessageType] = useState(undefined);

  // #################   Event Handlers    ################
  const onSubmit = (data) => {
    setRequestResolved(false);
    // Make API request
    apiAuth(data, true, reset, fireNotification);
  };

  /**
   * @param {string} message
   * @param {import("@material-ui/lab/Alert").Color} messageType
   */
  const fireNotification = (message, messageType) => {
    setNotificationMessage(message);
    setMessageType(messageType);
    setOpen(true);
    setRequestResolved(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              required
              variant="outlined"
              margin="normal"
              fullWidth
              autoComplete="email"
              label="Email Address"
              {...field}
              error={errors.email?.message ? true : false}
            />
          )}
        />
        {renderError(errors.email?.message)}
        <Controller
          control={control}
          defaultValue=""
          name="password"
          render={({ field }) => (
            <TextField
              required
              variant="outlined"
              margin="normal"
              fullWidth
              autoComplete="current-password"
              type="password"
              label="Password"
              {...field}
              error={errors.password?.message ? true : false}
            />
          )}
        />
        {renderError(errors.password?.message)}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          style={{ textTransform: "none" }}
          size="large"
          disabled={isSubmitDisabled(
            requestResolved,
            isSubmitting,
            isValid,
            touchedFields
          )}
        >
          <LockOpenIcon fontSize="small" />
          <Box ml={1}>Sign In</Box>
        </Button>
        <Grid container>
          <Grid item xs={12}>
            {/* <Link to={_ROUTES.signup} style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="primary">
                {"Forgot password?"}
              </Typography>
            </Link> */}
          </Grid>
          <Grid item>
            <Link to={_ROUTES.signup} style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="secondary">
                {"Don't have an account? Sign Up"}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
      <CustomNotification
        handleClose={handleClose}
        open={open}
        messageType={messageType}
        message={notificationMessage}
      />
    </>
  );
};

// #################   Main Component    ##################
const SignInPage = () => {
  return <PageContainer WrappedComponent={<Form />} />;
};

export default SignInPage;
