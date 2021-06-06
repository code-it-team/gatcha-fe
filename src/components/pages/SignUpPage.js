import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Link } from "@reach/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { apiAuth } from "src/apis/apiAuth";
import { _LOCAL_STORAGE_KEY_NAMES, _ROUTES } from "src/constants";
import { _MESSAGES } from "src/constants/messages";
import { formStyles, isSubmitDisabled, renderError } from "src/helpers";
import * as yup from "yup";
import PageContainer from "../PageContainer";
import CustomNotification from "../CustomNotification";

// ########################################################
// #####################   Helpers    #####################
// ########################################################

// ########################################################
// ##############   Schema & Default Values   #############
// ########################################################
const schema = yup.object().shape({
  email: yup.string().email(_MESSAGES.emailFormat).required(_MESSAGES.required),
  password: yup.string().required(_MESSAGES.required),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], _MESSAGES.passwordMatchError)
    .required(_MESSAGES.required),
});

const defaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

// ########################################################
// ######################   Styles    #####################
// ########################################################
const useStyles = formStyles;

// ########################################################
// ################   Helper Components    ################
// ########################################################
const Form = () => {
  // ###############   Initializers    ##############
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

  // ##################   State    #################
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [messageType, setMessageType] = useState(undefined);
  const [requestResolved, setRequestResolved] = useState(undefined);
  const [jwt] = useState(localStorage.getItem(_LOCAL_STORAGE_KEY_NAMES.jwt));

  // #############   Event Handlers    #############
  const onSubmit = (data) => {
    setRequestResolved(false);
    // Make API request
    apiAuth(jwt, data, false, reset, fireNotification);
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
        Sign Up
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
        <Controller
          control={control}
          defaultValue=""
          name="confirmPassword"
          render={({ field }) => (
            <TextField
              required
              variant="outlined"
              margin="normal"
              fullWidth
              autoComplete="current-password"
              type="password"
              label="Confirm Password"
              {...field}
              error={errors.confirmPassword?.message ? true : false}
            />
          )}
        />
        {renderError(errors.confirmPassword?.message)}
        <Grid container>
          <Grid item>
            <Link to={_ROUTES.signin} style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="primary">
                {"Do you have an account? Sign In"}
              </Typography>
            </Link>
          </Grid>
        </Grid>
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
          <PersonAddIcon fontSize="small" />
          <Box ml={1}>Sign Up</Box>
        </Button>
      </form>
      {/* // Successfully submitted notification */}
      <CustomNotification
        handleClose={handleClose}
        open={open}
        messageType={messageType}
        message={notificationMessage}
      />
    </>
  );
};

// ########################################################
// #################   Main Component    ##################
// ########################################################
const SignUpPage = () => {
  return <PageContainer WrappedComponent={<Form />} />;
};

export default SignUpPage;
