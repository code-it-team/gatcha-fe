import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Link, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { _MESSAGES } from "src/constants/messages";
import { renderError } from "src/helpers";
import * as yup from "yup";
import AuthContainer from "./AuthContainer";
import CustomNotification from "./CustomNotification";

// #####################   Helpers    ######################
/**
 *
 * @param {boolean} isSubmitting
 * @param {boolean} isValid
 * @param {object} touchedFields
 * @returns
 */
const isSubmitDisabled = (isSubmitting, isValid, touchedFields) => {
  if (isSubmitting || _.isEmpty(touchedFields)) return true;
  return isValid ? false : true;
};

// ##############   Schema & Default Values   ##############
const schema = yup.object().shape({
  email: yup.string().email(_MESSAGES.emailFormat).required(),
  password: yup.string().required(),
});

const defaultValues = {
  email: "",
  password: "",
};

// ######################   Styles    ######################
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// ################   Helper Components    #################
const Form = () => {
  // ##################   Notification    ###################
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
        Sign In
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
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
          disabled={isSubmitDisabled(isSubmitting, isValid, touchedFields)}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs={12}>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" color="secondary">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
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

// #################   Main Component    ###################
const SignInPage = () => {
  return <AuthContainer WrappedComponent={<Form />} />;
};

export default SignInPage;
