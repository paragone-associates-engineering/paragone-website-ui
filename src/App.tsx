import { ThemeProvider, CssBaseline } from "@mui/material";
import getTheme from "./theme";
import { useSelector } from "react-redux";
//import { RootState } from "./redux/store";
import Layout from "./layout";
import { RootState } from "./redux/store";
import { useScrollManager } from "./hooks/use-scroll";

const App = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = getTheme(mode);
  useScrollManager(); 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
};

export default App;
