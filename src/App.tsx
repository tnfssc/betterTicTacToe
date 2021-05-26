import { DefaultTheme, ThemeProvider } from "@material-ui/styles";
import React, { memo } from "react";
import Grid from "./components/grid";

const App = () => {
  return (
    <div>
      <Grid />
    </div>
  );
};

const theme: DefaultTheme = {};

export default memo(() => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
));
