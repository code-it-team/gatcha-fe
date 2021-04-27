import { Typography } from "@material-ui/core";

const CopyRight = () => {
  return (
    <footer>
      <Typography variant="body2" color="textSecondary" align="center">
        {`Copyright © code-it Team `}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
};

export default CopyRight;
