import { Box, Typography } from "@material-ui/core";
import ErrorIcon from "../icons/ErrorIcon";
import PageContainer from "../PageContainer";

// ########################################################
// ################   Helper Components    ################
// ########################################################
/**
 *
 * @returns {JSX.Element}
 */
const Page = () => {
  return (
    <>
      <Box maxWidth="sm" justifyContent="center" marginBottom="3em">
        <Typography variant="h5">Oops! ... Something Went Wrong 😨</Typography>
      </Box>
      <ErrorIcon />
    </>
  );
};

// ########################################################
// #################   Main Component    ##################
// ########################################################
const ErrorPage = () => {
  return <PageContainer WrappedComponent={<Page />} />;
};

export default ErrorPage;
