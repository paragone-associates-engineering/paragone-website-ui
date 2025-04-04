import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width:'100vw',
        maxWidth:'1200px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
