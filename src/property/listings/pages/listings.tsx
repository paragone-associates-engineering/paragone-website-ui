"use client"

import { Container, Box,  } from "@mui/material"

import { PageBanner } from "../../../common/banner/page-banner"
import RegionsGrid from "../components/regions-layout"
import Testimonials from "../../../common/testimonial"
import type { Region } from "../types"
import ExclusiveProperties from "../../../common/exclusive-properties"

const mockRegions: Region[] = [
  { id: "ikouji", name: "Ikouji", propertyCount: 24 },
  { id: "lekki", name: "Lekki", propertyCount: 18 },
  { id: "chevron", name: "Chevron", propertyCount: 15 },
  { id: "eko-atlantic-city", name: "Eko Atlantic City", propertyCount: 12 },
  { id: "vic", name: "VIC", propertyCount: 10 },
  { id: "victoria-island", name: "Victoria Island", propertyCount: 8 },
  { id: "banana-island", name: "Banana Island", propertyCount: 6 },
  { id: "epe", name: "Epe", propertyCount: 5 },
  { id: "ajah", name: "Ajah", propertyCount: 7 },
  { id: "bodo-lekki", name: "Bodo Lekki", propertyCount: 4 },
  { id: "ikoyi", name: "Ikoyi", propertyCount: 9 },
  { id: "mojo", name: "Mojo", propertyCount: 3 },
]

// const mockProperties: Property[] = Array(9)
//   .fill(null)
//   .map((_, index) => ({
//     id: `property-${index + 1}`,
//     title:
//       index % 3 === 0
//         ? "Ipsum qui in commodo nulla"
//         : index % 3 === 1
//           ? "Quis duis velit sunt voluptate minim"
//           : "Voluptate adipisicing adipisicing",
//     price: 120000 + index * 50000,
//     pricePerSqm: 1500,
//     location: {
//       address: "238 Highgate Road",
//       city: "London",
//       coordinates: {
//         lat: 51.5074,
//         lng: -0.1278,
//       },
//     },
//     features: {
//       bedrooms: 4,
//       bathrooms: 3,
//       area: 1650,
//       parking: index % 2 === 0,
//       wifi: true,
//       cableTV: true,
//       elevator: index % 3 === 0,
//     },
//     description:
//       "Lorem ipsum dolor sit amet consectetur. Morbi quis feugiat odio vel vehicula. Praesent pulvinar in lorem eget. Et consequat sed aliquam pulvinar aliquam enim. Duis feugiat neque ut efficitur pulvinar nulla accumsan vitae eu efficitur.",
//     images: [
//       'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&w=800&q=80',
//       `https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?auto=format&w=800&q=8`,
//       `https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&w=800&q=80`,
//       // `/property-${index + 3 > 9 ? index - 6 : index + 3}.jpg`,
//       // `/property-${index + 4 > 9 ? index - 5 : index + 4}.jpg`,
//     ],
//     propertyType: index % 4 === 0 ? "apartment" : index % 4 === 1 ? "house" : index % 4 === 2 ? "land" : "commercial",
//     listingType: index % 3 === 0 ? "sale" : index % 3 === 1 ? "rent" : "short-stay",
//     rating: 4.9,
//     reviewCount: 12,
//     featured: index < 3,
//     constructionYear: 2020,
//   }))

const Listings = () => {
  // const [listingType, setListingType] = useState<string | null>("all")
  // const [properties, setProperties] = useState<Property[]>(mockProperties)

  // const handleListingTypeChange = (_event: React.MouseEvent<HTMLElement>, newListingType: string | null) => {
  //   if (newListingType !== null) {
  //     setListingType(newListingType)

  //     if (newListingType === "all") {
  //       setProperties(mockProperties)
  //     } else {
  //       setProperties(
  //         mockProperties.filter((property) =>
  //           newListingType === "land" ? property.propertyType === "land" : property.listingType === newListingType,
  //         ),
  //       )
  //     }
  //   }
  // }

  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner title="Listings" currentPage='Listings' />

      <Container maxWidth="lg">
        <RegionsGrid regions={mockRegions} />
 

        {/* <Box sx={{ mt: 8 }}>
          <Typography variant="overline" color="primary" align="center" display="block">
            Featured listings
          </Typography>

          <Typography variant="h4" component="h2" gutterBottom align="center">
            Discover our featured and exclusive properties
          </Typography>

          <Typography variant="body1" paragraph align="center" sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
            Have access to some of our most exclusive and available properties and developments that range from various
            models of houses, apartments, and lands
          </Typography>

          <Box sx={{width:'100%', display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, overflowX:'auto', whitespace:'nowrap',  "&::-webkit-scrollbar": {
      display: "none",
    }, }}>
            <CustomToggleButtonGroup
              value={listingType}
              exclusive
              onChange={handleListingTypeChange}
              aria-label="listing type"
            >
              <CustomToggleButton value="all" aria-label="all properties">
                <HomeIcon sx={{ mr: 1 }} />
                All properties
              </CustomToggleButton>
              <CustomToggleButton value="sale" aria-label="for sale">
                <HomeIcon sx={{ mr: 1 }} />
                For sale
              </CustomToggleButton>
              <CustomToggleButton value="rent" aria-label="for rent">
                <ApartmentIcon sx={{ mr: 1 }} />
                For rent
              </CustomToggleButton>
              <CustomToggleButton value="short-stay" aria-label="short stay">
                <WeekendIcon sx={{ mr: 1 }} />
                Short stay
              </CustomToggleButton>
              <CustomToggleButton value="land" aria-label="land">
                <LandscapeIcon sx={{ mr: 1 }} />
                Land
              </CustomToggleButton>
            </CustomToggleButtonGroup>

            <CustomButton variant="outline" sx={{px:3}} startIcon={FilterAltIcon}  href="/listings/filter">
              Filters
            </CustomButton>
          </Box>

          <PropertyGrid properties={properties} totalCount={properties.length} currentPage={1} itemsPerPage={9} />
        </Box> */}
      </Container>
      <ExclusiveProperties />
      <Testimonials />
    </Box>
  )
}

export default Listings

