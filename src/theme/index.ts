import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";

const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      ...palette,
      mode,
    },
    typography,
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: "white",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: "white",
            px:4,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
            "&.Mui-selected": {
              //backgroundColor: "primary.main", 
              //color: "#fff",
              border:'none',
              outline:'none',
              "&:hover": {
                backgroundColor: "primary.dark", 
              },
          },
        },
          contained: {
            color: "#FFFFFF",
            "&:hover": {
              color: "#fff",
            },
          },
          outlined: {
            borderColor: "#DDDDDD",
            color: "#333333",
            "&:hover": {
              borderColor: "#BBBBBB",
              backgroundColor: "rgba(221, 221, 221, 0.2)", // Light gray background
              color: "#333333",
            },
          },
        },
      },
      
      MuiToggleButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
            color: "primary.main", 
            borderColor: "primary.main", 
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.1)", 
              borderColor: "primary.main",
            },
            "&.Mui-selected": {
              backgroundColor: "primary.main", 
              color: "#fff",
              border:'none',
              outline:'none',
              "&:hover": {
                backgroundColor: "primary.dark", 
              },
            },
          },
        },
      },
    },
  });

export default getTheme;
