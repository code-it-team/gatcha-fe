import { Avatar, Box, Container, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import CopyRight from "./CopyRight";

// ######################   Styles    ######################
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// #################   Main Component    ###################
const AuthContainer = ({ WrappedComponent }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar
          className={classes.avatar}
          src="/assets/code-it-logo.png"
          variant="rounded"
        ></Avatar>
        {WrappedComponent}
      </Paper>
      <Box mt={8}>
        <CopyRight />
      </Box>
    </Container>
  );
};

export default AuthContainer;
