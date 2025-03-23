import { Grid, Paper, Box, Typography } from "@mui/material";

export default function ReferralSteps() {
  return (
    <Grid 
      container 
      spacing={2} 
      sx={{ 
        mt: 4, 
        flexWrap: { xs: "wrap", md: "nowrap" }, 
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <Grid item xs={12} md={4}>
        <Paper
          elevation={0}
          sx={{
            px: 3,
            py:7,
            height: "100%",
            border: "1px solid #ddd",
            borderRadius: 2,
            backgroundColor: "background.paper",
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742474456/fi_17065320_qwsqsl.svg"
            alt="register"
            sx={{ mb: 2, width: 50, mx: "auto" }}
          />
          <Typography variant="h5" component="h3" gutterBottom>
            Register
          </Typography>
          <Typography variant="body2">
            Fill out the registration form to join our referral program and receive your unique referral code.
          </Typography>
        </Paper>
      </Grid>

     
      <Grid 
        item xs={12} md={1} 
        sx={{ 
          display: "flex", 
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742476999/Group_242_1_ajigod.svg"
          alt="arrow"
          sx={{ width: 100 }}
        />
      </Grid>

      
      <Grid item xs={12} md={4}>
        <Paper
          elevation={0}
          sx={{
            px: 3,
            py:7,
            height: "100%",
            border: "1px solid #ddd",
            borderRadius: 2,
            backgroundColor: "background.paper",
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742474454/fi_7981577_w3flod.svg"
            alt="refer"
            sx={{ mb: 2, width: 50, mx: "auto" }}
          />
          <Typography variant="h5" component="h3" gutterBottom>
            Refer
          </Typography>
          <Typography variant="body2">
            Share your referral code with potential clients looking for real estate services.
          </Typography>
        </Paper>
      </Grid>

     
      <Grid 
        item xs={12} md={1} 
        sx={{ 
          display: "flex", 
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742474445/Group_241_pqsabx.svg"
          alt="arrow"
          sx={{ width: 100, height:100 }}
        />
      </Grid>

      
      <Grid item xs={12} md={4}>
        <Paper
          elevation={0}
          sx={{
            px: 3,
            py:7,
            height: "100%",
            border: "1px solid #ddd",
            borderRadius: 2,
            backgroundColor: "background.paper",
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742474452/fi_3135673_rqolay.svg"
            alt="earn"
            sx={{ mb: 2, width: 50, mx: "auto" }}
          />
          <Typography variant="h5" component="h3" gutterBottom>
            Earn
          </Typography>
          <Typography variant="body2">
            Receive rewards and commissions for every successful transaction from your referrals.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
