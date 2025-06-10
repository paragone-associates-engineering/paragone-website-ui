import { 
  Box, 
  Container, 
  Grid, 
  Typography
} from '@mui/material';
import { Star } from '@mui/icons-material';
import SectionTitle from './section-title';
import ServiceCard from './service-card';
import { AnimatedWrapper } from './animations/animated-wrapper';
const OurServices = () => {
    return (
        <Box component="section" sx={{ py: 5 }}>
               <Container maxWidth="lg">
                <AnimatedWrapper>
                 <SectionTitle
                   title="How our clients get benefited by us"
                   subtitle="Our Services"
                   //description="We strive to provide value at every step of your real estate journey"
                   centered={true}
                   marginBottom={3}
                 />
                 <Box sx={{ display: 'flex', flexDirection:"column", alignItems: 'center', justifyContent:"center", gap:1 }}>
                    <Typography variant="body2" sx={{  backgroundColor:"#F4F4F4", padding:2}}>“Outstanding service, bought my dream home quickly”</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center", gap:0.1 }} marginBottom={4}>
                             
                                <Star sx={{ fontSize: 18, color: 'primary.main' }} />
                                <Star sx={{ fontSize: 18, color: 'primary.main' }} />
                                <Star sx={{ fontSize: 18, color: 'primary.main' }} />
                                <Star sx={{ fontSize: 18, color: 'primary.main' }} />
                                <Star sx={{ fontSize: 18, color: 'primary.main' }} />
                                <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 600 }}>4.9 <span style={{fontWeight:"400", opacity:0.8}}>(128,000)</span></Typography>
                              </Box>
                 </Box>
                 <Grid container spacing={4} sx={{MaxWidth:{sm:600,md:'100%'}}}>
                   <Grid item xs={12} md={4}>
                     <ServiceCard
                       title="Buy a property"
                       description="Find your dream home with our extensive listings and expert buying agents to guide you through the process."
                       imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741276451/fi_7374059_k6kuhg.svg"
                       //icon={<HomeIcon sx={{ width: 56, height: 56, color: theme.palette.primary.main }} />}
                       actionText="Learn More"
                       actionLink="/listings"
                       actionVariant="outline"
                     />
                   </Grid>
                   <Grid item xs={12} md={4}>
                     <ServiceCard
                       title="Sell a property"
                       description="Get the best value for your property with our market expertise, professional marketing, and negotiation skills."
                       imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741274361/fi_3526159_pmvmt1.svg"
                       //icon={<AttachMoney sx={{ width: 56, height: 56, color: theme.palette.primary.main }} />}
                       actionText="Learn More"
                       actionLink="/partner-with-us"
                     />
                   </Grid>
                   <Grid item xs={12} md={4}>
                     <ServiceCard
                       title="Manage a property"
                       description="Let us handle the day-to-day operations of your rental properties while you enjoy a steady income stream."
                       imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741276444/fi_6684167_knrmez.svg"
                       //icon={<VerifiedUser sx={{ width: 56, height: 56, color: theme.palette.primary.main }} />}
                       actionText="Learn More"
                       actionLink="/property-management"
                       actionVariant="outline"
                     />
                   </Grid>
                 </Grid>
                 </AnimatedWrapper>
               </Container>
             </Box>
    )
}

export default OurServices
