import { Box, Container } from "@material-ui/core";
import { useParams } from "@reach/router";
import { useEffect, useState } from "react";
import apiGetProfile from "src/apis/apiGetProfile";
import CustomNotification from "../CustomNotification";
import Footer from "../Footer";
import Header from "../Header";
import Loader from "../Loader";
import ViewQuestions from "../ViewQuestions";

// ########################################################
// #################   Main Component    ##################
// ########################################################

const ProfilePage = (props) => {
  // #####################   State    #####################
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [messageType, setMessageType] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    const subRoute = `/answers/published/${params.link}`;
    apiGetProfile(subRoute, setQuestions, fireNotification);
  }, [params.link]);
  // #################   Event Handlers    ################
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

  if (questions.length === 0) return <Loader />;
  return (
    <>
      <Header />
      <Container maxWidth="md" component="main">
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

export default ProfilePage;
