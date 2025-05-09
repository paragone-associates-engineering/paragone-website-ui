import {useState} from 'react'
import { Container, Grid, Typography, Box, List, ListItem } from "@mui/material";
import { PageBanner } from "../common/banner/page-banner";
import Testimonials from "../common/testimonial";
import CustomButton from "../common/button";
import SectionTitle from "../common/section-title";
import {SellAsCompanyForm} from "./subscribe-form";
import CallMadeIcon from '@mui/icons-material/CallMade';

const packages = [
  { label: "Beginners", price: "₦100,000 / 1 month", package:["Property Listing 2", "Associate Push"], background:'#D5F7F6' },
  { label: "Pro", price: "₦300,000 / 3 months",  package:["Property Listing 5", "Social Media Advert 1", "Sponsored List", "Associate Push"], background:'#FFF1C5' },
  { label: "Enterprise", price: "₦600,000 / 6 months",  package:["Property Listing 5", "Social Media Advert 1", "Sponsored List", "Associate Push"], background:'#DEE3FF' },
  { label: "Advance", price: "₦1,200,000 / 1 year",  package:["Property Listing 5", "Social Media Advert 1", "Sponsored List", "Associate Push"], background:"#FEDEFF" },
];

export default function SubscribePage() {
  const [selectedPkg, setSelectedPkg] = useState('')

  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner title="Sell as a Company"  breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sell as a Company" }]}  />
      <Container sx={{ py: 5 }}>
         <SectionTitle
         subtitle='Sell as a Comapny'
                    title="  Gain unmatched exposure for your properties"
                    //description="Discover how our tailored real estate brokerage and property management service can help you effortlessly buy, sell, and manage properties"
                    centered={true}
                    marginBottom={6}
                  />
        {/* <Typography variant="h4" align="center" gutterBottom>
          Gain unmatched exposure for your properties
        </Typography> */}

        <Grid container spacing={3} justifyContent="center">
          {packages.map((pkg, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box p={3}  sx={{display:'flex', flexDirection:'column', bgcolor:`${pkg.background}`, height:'400px'}} borderRadius={2}>
                <Typography variant="h6">{pkg.label}</Typography>
                <Typography variant="h5"  gutterBottom>
                  {pkg.price}
                </Typography>
              
                <List sx={{flex:1}}>
                <Typography variant="h6" sx={{fontWeight:'700'}} gutterBottom>
            What’s Included
          </Typography>
  {pkg.package.map((pkgItem, i) => (
    <ListItem key={i}>
      {`• ${pkgItem}`}
    </ListItem>
  ))}
</List>
<a href='#subscribe-form'>
                <CustomButton onClick={() => setSelectedPkg(pkg.label)} variant="outline" sx={{borderColor:'primary.main', color:'text.primary', borderRadius:9 ,display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
                  Subscribe <CallMadeIcon />
                </CustomButton>
                </a>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* <Box mt={5}>
          <Typography variant="h5"  gutterBottom>
            Let’s get started
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Company name" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Office address" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth  type="file" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email address" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select fullWidth label="Preferred package" variant="outlined">
                {packages.map((pkg, index) => (
                  <MenuItem key={index} value={pkg.label}>
                    {pkg.label} - {pkg.price}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box> */}
        

        {/* <Box mt={5}>
          <Typography variant="h5" gutterBottom>
            Property Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Property Type" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Property Documents" type="file" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Location" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Landmark" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Property Description" multiline rows={4} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type="file" variant="outlined" />
            </Grid>
          </Grid>
        </Box>

        <Box mt={4} textAlign="center">
          <Button variant="contained" size="large" color="primary">
            Subscribe
          </Button>
        </Box> */}
      </Container>
      <Box component='section' id='subscribe-form'>
      <SellAsCompanyForm selectedPkg={selectedPkg} />
      </Box>
      <Testimonials />
    </Box>
  );
}
