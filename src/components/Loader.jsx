import { Box, CircularProgress, Container } from "@material-ui/core";
import Footer from "./Footer";

const Loader = () => (
  <Container maxWidth="md" component="main">
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      marginTop="3em"
    >
      <CircularProgress />
      <Footer />
    </Box>
  </Container>
);

export default Loader;
