"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#103783",
    },
    secondary: {
      main: "#9bafd9",
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", sans-serif',
  },
};

const theme = createTheme(themeOptions);

export default function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
