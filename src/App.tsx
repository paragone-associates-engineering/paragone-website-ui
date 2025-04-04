import { ThemeProvider, CssBaseline } from "@mui/material";
import getTheme from "./theme";
import { useSelector } from "react-redux";
//import { RootState } from "./redux/store";
import Layout from "./layout";
import { RootState } from "./redux/store";

const App = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = getTheme(mode);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
};

export default App;
