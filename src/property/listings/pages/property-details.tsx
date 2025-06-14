

import { useEffect } from "react"
import { Container, Box, Typography, Grid, Chip } from "@mui/material"
import { useParams } from "react-router-dom"
import { PageBanner } from "../../../common/banner/page-banner"
import PropertyGallery from "../components/property-gallery"
import PropertyDetails from "../components/property-details"
import NearbyPlaces from "../components/nearby-places"
import PropertyVideo from "../components/property-video"
import BookViewingForm from "../components/book-view-form"
import ContactAgentForm from "../components/contact-agent-form"
//import FeaturedProperties from "../components/featured-properties"
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks"
import { fetchListingById, fetchFeaturedProperties, fetchRelatedProperties } from "../../../redux/slices/listings-slice"
import { formatCurrency } from "../utils"
import RelatedProperties from "../components/related-properties"
import FeaturedList from "../components/featured-listings"

const PropertyDetailsPage = () => {
  const { propertyId } = useParams<{ propertyId: string }>()
  const dispatch = useAppDispatch()

  const listings = useAppSelector((state) => state.listings)
  const {
    selectedProperty: property,
    loading,
    featuredProperties,
    featuredLoading,
    relatedProperties,
    relatedLoading,
  } = listings || {
    selectedProperty: null,
    loading: true,
    featuredProperties: [],
    featuredLoading: false,
    relatedProperties: [],
    relatedLoading: false,
  }

  const getDetailValue = (name: string | number) =>
    property?.propertyDetails?.find((detail) => detail.name === name)?.value

  useEffect(() => {
    if (propertyId) {
      dispatch(fetchListingById(propertyId))
    }
  }, [dispatch, propertyId])

  useEffect(() => {
    // Fetch featured properties
    dispatch(fetchFeaturedProperties())
  }, [dispatch])

  useEffect(() => {
    if (property) {
     
      dispatch(
        fetchRelatedProperties({
          propertyType: property.propertyType,
          locationRegion: property.location?.region,
          excludeId: property._id,
        }),
      )
    }
  }, [dispatch, property])

  const videoUrl = property?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"

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
    <Box sx={{ width: "100vw" }}>
      <PageBanner
        title="Property Information"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Property", href: "/listings" },
          { label: "Property Information" },
        ]}
      />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Chip
          label={
            property?.listingType === "For Sale"
              ? "For Sale"
              : property?.listingType === "For Rent"
                ? "For Rent"
                : "Short Stay"
          }
          color={
            property?.listingType === "For Sale"
              ? "primary"
              : property?.listingType === "For Rent"
                ? "secondary"
                : "info"
          }
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" textTransform={"capitalize"} gutterBottom>
              {property?.propertyName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {property?.location?.region}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h4" component="div" color="primary.main" gutterBottom>
              {formatCurrency(property.amount)}
            </Typography>
            {getDetailValue("area") && (
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(Number(getDetailValue("area") || 0))}/sqm
              </Typography>
            )}
          </Box>
        </Box>

        <PropertyGallery images={property.images} title={property.propertyName} />

        <Grid container spacing={6} sx={{ mt: { xs: 1, md: 2 } }}>
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
                <NearbyPlaces places={property.landmarks} />
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
              <BookViewingForm propertyId={propertyId || ""} />
              <Box sx={{ mt: 4 }}>
                <ContactAgentForm propertyId={propertyId || ""} />
              </Box>
              
            </Box>
          </Grid>
        </Grid>
{relatedProperties?.length > 0 && (
           <RelatedProperties
          properties={relatedProperties}
          loading={relatedLoading}
          propertyType={property?.propertyType}
        />
)}

{featuredProperties?.length > 0 && (
<Box sx={{ mt: 4, bgcolor: "", p: 2, borderRadius: 2 }}>
                <FeaturedList properties={featuredProperties} loading={featuredLoading} />
              </Box>
              )}
        {/* <RelatedProperties
          properties={relatedProperties}
          loading={relatedLoading}
          propertyType={property?.propertyType}
        /> */}
      </Container>
    </Box>
  )
}

export default PropertyDetailsPage
