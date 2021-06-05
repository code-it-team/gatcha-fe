import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useEffect, useState } from "react";
import { apiGet } from "src/apis/apiGet";
import Footer from "../Footer";

// ########################################################
// ################   Helper Components    ################
// ########################################################
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(25),
    fontWeight: theme.typography.fontWeightBold,
  },
  details: {
    fontSize: theme.typography.pxToRem(20),
    padding: theme.spacing(2),
  },
  accordionSummary: {
    backgroundColor: theme.palette.primary.main,
    border: "1px solid black",
  },
  accordionDetails: {},
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
/**
 *
 * @param {object} props
 * @param {Object[]} props.questions
 * @param {string} props.questions[].body
 * @param {string} props.questions[].answer
 * @returns {JSX.Element}
 */
const Page = ({ questions }) => {
  const classes = useStyles();

  if (!questions || questions.length === 0) return <CircularProgress />;
  return (
    <div className={classes.root}>
      {questions.map((question, index) => (
        <>
          <Accordion key={index} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.accordionSummary}
            >
              <Typography className={classes.heading}>
                {question.body}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography className={classes.details}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion key={index} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.accordionSummary}
            >
              <Typography className={classes.heading}>
                {question.body}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography className={classes.details}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </div>
  );
};

// ########################################################
// #################   Main Component    ##################
// ########################################################
const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    apiGet(`/questions`, setQuestions);
  }, [questions]);

  return (
    <Container maxWidth="md" component="main">
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        marginTop="5em"
      >
        <Page questions={questions} />
        <Footer />
      </Box>
    </Container>
  );
};

export default HomePage;
