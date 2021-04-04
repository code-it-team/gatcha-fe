import { purple, teal } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      dark: teal[900],
      main: teal[500],
      light: teal[300],
    },
    secondary: {
      dark: purple[900],
      main: purple[500],
      light: purple[300],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
