import { Container, Box,  } from "@mui/material"
import { PageBanner } from "../../../common/banner/page-banner"
import RegionsGrid from "../components/regions-layout"
import Testimonials from "../../../common/testimonial"
import ExclusiveProperties from "../../../common/exclusive-properties"

const Listings = () => {
  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner title="Listings" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Listings" }]} />

      <Container maxWidth="lg">
        <RegionsGrid />
      </Container>
      <ExclusiveProperties  />
      <Testimonials />
    </Box>
  )
}

export default Listings

