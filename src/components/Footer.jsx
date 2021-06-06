import { Box } from "@material-ui/core";

// ########################################################
// #################   Main Component    ##################
// ########################################################
const Footer = () => {
  return (
    <Box mt={8} component="footer" color="text.secondary">
      Copyright © code-it Team {new Date().getFullYear()}.
    </Box>
  );
};

export default Footer;
