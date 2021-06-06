import { Box, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { apiGet } from "src/apis/apiGet";
import { _LOCAL_STORAGE_KEY_NAMES } from "src/constants";
import EditQuestions from "../EditQuestions";
import Footer from "../Footer";
import Header from "../Header";
import Loader from "../Loader";

// ########################################################
// #################   Main Component    ##################
// ########################################################
const EditPage = () => {
  // #####################   State    #####################
  const [questions, setQuestions] = useState([]);
  const [jwt] = useState(localStorage.getItem(_LOCAL_STORAGE_KEY_NAMES.jwt));

  useEffect(() => {
    apiGet(jwt, `/questions`, setQuestions);
  }, [jwt]);

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
          <EditQuestions questions={questions} jwt={jwt} />
          <Footer />
        </Box>
      </Container>
    </>
  );
};

export default EditPage;
