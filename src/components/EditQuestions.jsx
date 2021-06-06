import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  makeStyles,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { apiPost } from "src/apis/apiPost";
import { _END_POINTS } from "src/apis/endpoints";
import { _MESSAGES } from "src/constants";
import { isSubmitDisabled, renderError } from "src/helpers";
import CustomNotification from "./CustomNotification";

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
    padding: theme.spacing(2),
  },
  accordionSummary: {
    color: theme.palette.primary.main,
    borderBottom: "1px solid #565656",
  },
  accordionDetails: {},
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  textArea: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(20),
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    padding: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "10rem",
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
 * @param {string} props.jwt
 * @returns {JSX.Element}
 */
const EditQuestions = ({ questions, jwt }) => {
  const classes = useStyles();
  const defaultValues = () =>
    questions.reduce((res, q, i) => {
      res[String(i)] = q.answer;
      return res;
    }, {});
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, touchedFields },
    control,
  } = useForm({
    mode: "all",
    defaultValues: defaultValues(),
  });
  const [requestResolved, setRequestResolved] = useState(undefined);
  const updateQuestions = (data) => {
    const updated = questions.map((q, i) => ({
      questionId: q.id,
      answer: data[String(i)],
    }));
    return {
      questionAnswers: updated,
    };
  };
  // #####################   State    #####################
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [messageType, setMessageType] = useState(undefined);

  // #################   Event Handlers    ################
  const onSubmit = (data) => {
    setRequestResolved(false);

    // Make API request
    apiPost(
      jwt,
      _END_POINTS.answers,
      updateQuestions(data),
      reset,
      fireNotification
    );
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
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  {index + 1}. {question.body}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <Controller
                  control={control}
                  name={String(index)}
                  rules={{ required: _MESSAGES.required }}
                  render={({ field }) => {
                    return (
                      <TextareaAutosize
                        rowsMin={4}
                        aria-label="maximum height"
                        placeholder="Answer"
                        className={classes.textArea}
                        {...field}
                      />
                    );
                  }}
                />
              </AccordionDetails>
              {renderError(errors[index]?.message)}
            </Accordion>
          </Box>
        ))}
        <Box display="flex" justifyContent="center">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large"
            disabled={isSubmitDisabled(
              requestResolved,
              isSubmitting,
              isValid,
              touchedFields
            )}
          >
            Submit
          </Button>
        </Box>
      </form>
      <CustomNotification
        handleClose={handleClose}
        open={open}
        messageType={messageType}
        message={notificationMessage}
      />
    </div>
  );
};

export default EditQuestions;
