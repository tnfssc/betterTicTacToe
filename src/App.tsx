import { DefaultTheme, ThemeProvider } from "@material-ui/styles";
import * as React from "react";
import { memo } from "react";
import Grid from "./components/grid";

const App = () => {
  return (
    <div>
      <Grid width={4} height={4} />
    </div>
  );
};

const theme: DefaultTheme = {};

export default memo(() => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
));
