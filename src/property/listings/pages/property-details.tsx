import { useEffect } from "react"
import { Container, Box, Typography, Grid, Chip } from "@mui/material"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async" // You'll need to install this
import { PageBanner } from "../../../common/banner/page-banner"
import PropertyGallery from "../components/property-gallery"
import PropertyDetails from "../components/property-details"
import NearbyPlaces from "../components/nearby-places"
import PropertyVideo from "../components/property-video"
import BookViewingForm from "../components/book-view-form"
import ContactAgentForm from "../components/contact-agent-form"
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks"
import { fetchListingById, fetchFeaturedProperties, fetchRelatedProperties } from "../../../redux/slices/listings-slice"
import { formatCurrency } from "../utils"
import RelatedProperties from "../components/related-properties"
import FeaturedList from "../components/featured-listings"
import Loader from "../../../common/loader"

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

 // console.log
  const getDetailValue = (name: string | number) =>
    property?.propertyDetails?.find((detail) => detail.name === name)?.value

  useEffect(() => {
    if (propertyId) {
      dispatch(fetchListingById(propertyId))
    }
  }, [dispatch, propertyId])

  useEffect(() => {
    dispatch(fetchFeaturedProperties())
  }, [dispatch])

  useEffect(() => {
    if (property) {
      dispatch(
        fetchRelatedProperties({
          propertyType: property.propertyType,
          locationRegion: property.location?.region,
          excludeId: property.id,
        }),
      )
    }
  }, [dispatch, property])

  const videoUrl = property?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"

  
  const generateSEOData = () => {
    if (!property?.propertyName ) return null

    const title = `${property.propertyName} - ${property.location?.region} | Paragon E-Signature`
    const description = property.description?.substring(0, 160) + (property.description?.length > 160 ? '...' : '')
    const image = property.images?.[0] || '/default-property-image.jpg'
    const url = `https://www.paragonesignature.com/listings/${property.id}`
    const price = formatCurrency(property.amount)
    const area = getDetailValue("area")

    const enhancedDescription = `${property.listingType} - ${price}${area ? ` | ${area} sqm` : ''} | ${property.location?.region}. ${description}`

    return {
      title,
      description: enhancedDescription,
      image,
      url,
      price,
      area
    }
  }

  const seoData = generateSEOData()

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
       <Loader/>
      </Container>
    )
  }

  if (!property?.propertyName) {
    return (
      <>
        <Helmet>
          <title>Property Not Found | Paragone Signature</title>
          <meta name="description" content="The requested property could not be found." />
        </Helmet>
        <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
          <Typography>Property not found</Typography>
        </Container>
      </>
    )
  }

  return (
    <Box sx={{ width: "100vw" }}>
      
      <Helmet>
        <title>{seoData?.title}</title>
        <meta name="description" content={seoData?.description} />
        
      
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData?.url} />
        <meta property="og:title" content={seoData?.title} />
        <meta property="og:description" content={seoData?.description} />
        <meta property="og:image" content={seoData?.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Paragon E-Signature" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={seoData?.url} />
        <meta name="twitter:title" content={seoData?.title} />
        <meta name="twitter:description" content={seoData?.description} />
        <meta name="twitter:image" content={seoData?.image} />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData?.url} />
        
        {/* Property-specific structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": property.propertyName,
            "description": property.description,
            "url": seoData?.url,
            "image": seoData?.image,
            "offers": {
              "@type": "Offer",
              "price": property.amount,
              "priceCurrency": "NGN",
              "availability": "https://schema.org/InStock"
            },
            "address": {
              "@type": "PostalAddress",
              "addressRegion": property.location?.region,
              "addressCountry": "NG"
            },
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": getDetailValue("area"),
              "unitText": "SQM"
            }
          })}
        </script>
      </Helmet>

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
      </Container>
    </Box>
  )
}

export default PropertyDetailsPage