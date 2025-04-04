"use client"

import {  useEffect } from "react"
import { Container, Box, Typography, Grid, Chip } from "@mui/material"
import { useParams } from "react-router-dom"
import { PageBanner } from "../../../common/banner/page-banner"
import PropertyGallery from "../components/property-gallery"
import PropertyDetails from "../components/property-details"
import NearbyPlaces from "../components/nearby-places"
import PropertyVideo from "../components/property-video"
import BookViewingForm from "../components/book-view-form"
import ContactAgentForm from "../components/contact-agent-form"
//import RelatedProperties from "../components/related-properties"
import { formatCurrency } from "../utils"
//import type { Property, NearbyPlace } from "../types"
import FeaturedListings from "../components/featured-listings"
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks"
import { fetchListingById, fetchListings } from "../../../redux/slices/listings-slice"

const PropertyDetailsPage = () => {
  const { propertyId } = useParams<{ propertyId: string }>()
  console.log('id', propertyId)
  const dispatch = useAppDispatch()

  const listings = useAppSelector((state) => state.listings)
  console.log("Property details state:", listings)

  const { selectedProperty:property, loading } = listings || {
    selectedProperty: null,
    loading: true,
    properties: [],
  }

  useEffect(() => {
    if (propertyId) {
      dispatch(fetchListingById(propertyId))
    }
  }, [dispatch, propertyId])

  // Fetch related properties
  useEffect(() => {
    if (property) {
      // Fetch properties with similar characteristics
      dispatch(
        fetchListings({
          listingType: property.listingType,
          page: 1,
          pageSize: 3,
        }),
      )
    }
  }, [dispatch, property])
  
const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
        <Typography>Loading property details...</Typography>
      </Container>
    )
  }

  if (!property) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
        <Typography>Property not found</Typography>
      </Container>
    )
  }

  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner
        title="Property Information"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Property", href: "/listings" },
          { label: 'Property Information' },
        ]}
      />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Chip
          label={
            property?.listingType === "For Sale" ? "For Sale" : property?.listingType === "For Rent" ? "For rent" : "Short stay"
          }
          color={property?.listingType === "sale" ? "primary" : property?.listingType === "For Rent" ? "secondary" : "info"}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {property?.propertyName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {property?.location}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h4" component="div" color="primary.main" gutterBottom>
              {formatCurrency(property.amount)}
            </Typography>
            {property?.propertyDetail?.squareFeet && (
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(property.propertyDetail.squareFeet)}/sqm
              </Typography>
            )}
          </Box>
        </Box>

        <PropertyGallery images={property.images} title={property.propertyName} />

        <Grid container spacing={6} sx={{ mt: {xs:1, md:2} }}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="h2" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph sx={{ whiteSpace: "pre-line" }}>
              {property.description}
            </Typography>

            <Box sx={{ my: 6 }}>
              <PropertyDetails property={property} />
            </Box>

            {property?.landmarks?.length > 0 && (
              <Box sx={{ my: 6 }}>
                <NearbyPlaces places={property?.landmarks} />
              </Box>
              
            )}

            {videoUrl && (
              <Box sx={{ my: 6 }}>
                <PropertyVideo videoUrl={videoUrl} thumbnailUrl={property.images[0]} />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: 20 }}>
            {/* propertyId={property.id} propertyTitle={property?.propertyName} */}
              <BookViewingForm  />

              <Box sx={{ mt: 4 }}>
                <ContactAgentForm  />
              </Box>

              <Box sx={{ mt: 4, bgcolor:"secondary.main", p:2, borderRadius:2 }}>
                <FeaturedListings  />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* <RelatedProperties properties={mockRelatedProperties} /> */}
    </Box>
  )
}

export default PropertyDetailsPage;

