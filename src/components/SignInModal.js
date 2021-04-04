import {
  Box,
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import CopyRight from "./CopyRight";
import SignIcon from "./SignIcon";

// ######################   Styles    ######################
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "75%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// #################   Main Component    ###################
const SignInModal = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      {/* <Grid item xs={false} sm={5} md={5}>
        <SignIcon />
      </Grid> */}
      <Grid item xs={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              // autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              // autoComplete="current-password"
            />
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
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <CopyRight />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default SignInModal;
