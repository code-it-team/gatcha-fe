import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "@reach/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { _ROUTES } from "src/constants";
import { _MESSAGES } from "src/constants/messages";
import { formStyles, isSubmitDisabled, renderError } from "src/helpers";
import * as yup from "yup";
import AuthContainer from "./AuthContainer";
import CustomNotification from "./CustomNotification";

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
  // ##################   Notification    #################
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // #############   State & Event Handlers    ############
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

  const onSubmit = (data) => {
    console.log(data);

    // Reset form fields
    reset({ ...defaultValues }, { keepIsValid: false });

    // Successfully submitted notification
    setNotificationMessage(_MESSAGES.success);

    // Unsuccessfully submitted notification

    // Fire notification
    handleClick();
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
          disabled={isSubmitDisabled(isSubmitting, isValid, touchedFields)}
        >
          Sign Up
        </Button>
      </form>
      {/* // Successfully submitted notification */}
      <CustomNotification
        handleClose={handleClose}
        open={open}
        messageType="success"
        message={notificationMessage}
      />
    </>
  );
};

// #################   Main Component    ##################
const SignUpPage = () => {
  return <AuthContainer WrappedComponent={<Form />} />;
};

export default SignUpPage;
