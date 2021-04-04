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
    secondary: {
      dark: "#5f0937",
      main: "#880e4f",
      light: "#9f3e72",
    },
    primary: {
      dark: "#381f75",
      main: "#512da8",
      light: "#7357b9",
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
