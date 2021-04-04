import { Typography } from "@material-ui/core";

const CopyRight = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © code-it Team `}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default CopyRight;
