import { Avatar, Box, Container, makeStyles, Paper } from "@material-ui/core";
import Footer from "./Footer";

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
/**
 *
 * @param {object} props
 * @param {JSX.Element} props.WrappedComponent
 * @param {boolean} [props.showAvatar]
 * @returns {JSX.Element}
 */
const PageContainer = ({ WrappedComponent, showAvatar = true }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper}>
        {showAvatar ? (
          <Box marginBottom="2em">
            <Avatar
              className={classes.avatar}
              src="/assets/code-it-logo.png"
              variant="rounded"
            />
          </Box>
        ) : null}
        {WrappedComponent}
        <Footer />
      </Paper>
    </Container>
  );
};

export default PageContainer;
