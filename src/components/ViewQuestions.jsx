import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  accordion: {
    marginBottom: theme.spacing(2),
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
    borderBottom: "1px solid #565656",
  },
  accordionDetails: {},
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

// ########################################################
// #################   Main Component    ##################
// ########################################################
/**
 * @param {object} props
 * @param {Object[]} props.questions
 * @param {string} props.questions[].body
 * @param {string} props.questions[].answer
 * @returns {JSX.Element}
 */
const ViewQuestions = ({ questions }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {questions.map((question, index) => (
        <Box key={index} mb={2}>
          <Accordion defaultExpanded={true} className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.accordionSummary}
            >
              <Typography className={classes.heading}>
                {index + 1}) {question.body}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography className={classes.details}>
                {question.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </div>
  );
};

export default ViewQuestions;
