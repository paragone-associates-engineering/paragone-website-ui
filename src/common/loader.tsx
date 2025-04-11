
import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#fff"
    >
      <CircularProgress
        style={{ color: "primary.main" }}
        size={48}
        thickness={5}
      />
    </Box>
  );
};

export default Loader;
