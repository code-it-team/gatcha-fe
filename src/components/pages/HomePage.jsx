import { Box, Button, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import apiGetQuestions from "src/apis/apiGetQuestions";
import apiGetPublishLink from "src/apis/apiPublishLink";
import apiPublishQuestions from "src/apis/apiPublishQuestions";
import { _END_POINTS } from "src/apis/endpoints";
import { _LOCAL_STORAGE_KEY_NAMES, _MESSAGES } from "src/constants";
import { isAllQuestionsAnswered } from "src/helpers";
import CustomNotification from "../CustomNotification";
import Footer from "../Footer";
import Header from "../Header";
import Loader from "../Loader";
import ViewQuestions from "../ViewQuestions";

// ########################################################
// #################   Main Component    ##################
// ########################################################
const HomePage = () => {
  // #####################   State    #####################
  const [questions, setQuestions] = useState([]);
  const [jwt] = useState(localStorage.getItem(_LOCAL_STORAGE_KEY_NAMES.jwt));
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [published, setPublished] = useState(false);
  const [messageType, setMessageType] = useState(undefined);
  const [profileLink, setProfileLink] = useState("link");

  useEffect(() => {
    apiGetQuestions(jwt, _END_POINTS.questions, setQuestions, setPublished);
    apiGetPublishLink(
      jwt,
      _END_POINTS.getPublishLink,
      fireNotification,
      setProfileLink
    );
  }, [jwt, profileLink]);
  // #################   Event Handlers    ################
  const onCLick = () => {
    // Make API request
    apiPublishQuestions(jwt, _END_POINTS.publish, questions, fireNotification);
  };

  /**
   * @param {string} message
   * @param {import("@material-ui/lab/Alert").Color} messageType
   */
  const fireNotification = (message, messageType) => {
    setNotificationMessage(message);
    setMessageType(messageType);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const renderPublishLink = () => {
    if (published)
      return (
        <Box
          mt="3em"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="center"
        >
          <Button
            variant="contained"
            onClick={() => {
              fireNotification(_MESSAGES.copyToClipboard, "success");
              navigator.clipboard.writeText(profileLink);
            }}
          >
            Copy Link
          </Button>
        </Box>
      );
    return (
      <Box mb={5}>
        <Button
          variant="contained"
          color="secondary"
          disabled={published || !isAllQuestionsAnswered(questions)}
          onClick={onCLick}
        >
          Publish
        </Button>
      </Box>
    );
  };

  if (questions.length === 0) return <Loader />;
  return (
    <>
      <Header />
      <Container maxWidth="md" component="main">
        {renderPublishLink()}
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          marginTop="3em"
        >
          <ViewQuestions questions={questions} />
          <Footer />
        </Box>
      </Container>
      <CustomNotification
        handleClose={handleClose}
        open={open}
        messageType={messageType}
        message={notificationMessage}
      />
    </>
  );
};

export default HomePage;
