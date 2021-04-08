import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Link, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Controller, useForm } from "react-hook-form";
import { _MESSAGES } from "src/constants/messages";
import * as yup from "yup";
import AuthContainer from "./AuthContainer";

// #####################   Helpers    ######################
/**
 * @param {object} error
 * @param {string} msg
 */
const renderError = (error, msg) =>
  error ? <Alert severity="error">{msg}</Alert> : "";

// ##############   Schema & Default Values   ##############
const schema = yup.object().shape({
  email: yup.string().required(),
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

// #################   Main Component    ###################
const SignInPage = () => {
  const classes = useStyles();
  const {
    handleSubmit,
    formState: { errors },
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
    reset();
  };

  console.log(errors);

  const Form = () => (
    <>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field: {ref, ...rest} }) => (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              autoComplete="email"
              label="Email Address"
              inputRef={ref}
              {...rest}
              error={errors.email?.message ? true : false}
            />
          )}
        />
        {renderError(errors.email?.message, _MESSAGES.required)}
        <Controller
          control={control}
          defaultValue=""
          name="password"
          render={({ field: {ref, ...rest} }) => (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              autoComplete="current-password"
              type="password"
              label="Password"
              inputRef={ref}
              {...rest}
              error={errors.password?.message ? true : false}
            />
          )}
        />
        {renderError(errors.password?.message, _MESSAGES.required)}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
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
    </>
  );

  return <AuthContainer Form={<Form />} />;
};

export default SignInPage;
