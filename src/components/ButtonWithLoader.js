import { CircularProgress } from "@material-ui/core";
import React from "react";

/**
 * @param {object} props
 * @param {boolean} props.isDisabled
 * @param {any} props.children
 */
const ButtonWithLoader = ({ isDisabled, children }) => {
  if (!isDisabled) return <CircularProgress color="inherit" size="1.5rem" />;
  return children;
};
export default ButtonWithLoader;
