"use client"

import { useState, useEffect } from "react"
import { Container, Box, Typography, Grid, Chip } from "@mui/material"
import { useParams } from "react-router-dom"
import { PageBanner } from "../../../common/banner/page-banner"
import PropertyGallery from "../components/property-gallery"
import PropertyDetails from "../components/property-details"
import NearbyPlaces from "../components/nearby-places"
import PropertyVideo from "../components/property-video"
import BookViewingForm from "../components/book-view-form"
import ContactAgentForm from "../components/contact-agent-form"
import RelatedProperties from "../components/related-properties"
import { formatCurrency } from "../utils"
import type { Property, NearbyPlace } from "../types"
import FeaturedListings from "../components/featured-listings"

const mockProperty: Property = {
  id: "property-1",
  title: "Amazing modern apartment",
  price: 120000,
  pricePerSqm: 1500,
  location: {
    address: "41 W Washington Road Fairfax",
    city: "VA",
    state: "90232",
    coordinates: {
      lat: 51.5074,
      lng: -0.1278,
    },
  },
  features: {
    bedrooms: 4,
    bathrooms: 3,
    area: 1650,
    parking: true,
    wifi: true,
    cableTV: true,
    elevator: true,
    airConditioning: true,
  },
  description:
    "Lorem ipsum dolor sit amet consectetur. Morbi quis feugiat odio vel vehicula. Praesent pulvinar in lorem eget. Et consequat sed aliquam pulvinar aliquam enim. Duis feugiat neque ut efficitur pulvinar nulla accumsan vitae eu efficitur.\n\nUt pellentesque lectus auctor pretium urna. Lectus vestibulum et et consequat sed aliquam pulvinar aliquam enim. Duis feugiat neque ut efficitur pulvinar nulla accumsan vitae eu efficitur.\n\nLorem ipsum dolor sit amet consectetur. Morbi quis feugiat odio vel vehicula. Praesent pulvinar in lorem eget. Et consequat sed aliquam pulvinar aliquam enim. Duis feugiat neque ut efficitur pulvinar nulla accumsan vitae eu efficitur.",
  images: [
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&w=800&q=80',
    `https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?auto=format&w=800&q=8`,
    `https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&w=800&q=80`,
    `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&w=800&q=80`
    // `/property-${index + 3 > 9 ? index - 6 : index + 3}.jpg`,
    // `/property-${index + 4 > 9 ? index - 5 : index + 4}.jpg`,
  ],
  propertyType: "apartment",
  listingType: "sale",
  rating: 4.9,
  reviewCount: 12,
  featured: true,
  constructionYear: 2020,
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
}

// Mock nearby places
const mockNearbyPlaces: NearbyPlace[] = [
  { category: "education", name: "Allen Academy", distance: 0.089, type: "School" },
  { category: "education", name: "St. Joseph School", distance: 0.228, type: "School" },
  { category: "education", name: "George Washington School", distance: 0.359, type: "School" },
  { category: "health", name: "Allen Academy", distance: 0.089, type: "Hospital" },
  { category: "health", name: "St. Joseph School", distance: 0.228, type: "Clinic" },
  { category: "health", name: "George Washington School", distance: 0.359, type: "Pharmacy" },
  { category: "culture", name: "Allen Academy", distance: 0.089, type: "Museum" },
  { category: "culture", name: "St. Joseph School", distance: 0.228, type: "Theater" },
  { category: "culture", name: "George Washington School", distance: 0.359, type: "Art Gallery" },
]

// Mock related properties
const mockRelatedProperties: Property[] = Array(3)
  .fill(null)
  .map((_, index) => ({
    id: `related-property-${index + 1}`,
    title:
      index % 3 === 0
        ? "Ipsum qui in commodo nulla"
        : index % 3 === 1
          ? "Quis duis velit sunt voluptate minim"
          : "Voluptate adipisicing adipisicing",
    price: 120000 + index * 50000,
    pricePerSqm: 1500,
    location: {
      address: "238 Highgate Road",
      city: "London",
      coordinates: {
        lat: 51.5074,
        lng: -0.1278,
      },
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 1650,
      parking: index % 2 === 0,
      wifi: true,
      cableTV: true,
      elevator: index % 3 === 0,
    },
    description:
      "Lorem ipsum dolor sit amet consectetur. Morbi quis feugiat odio vel vehicula. Praesent pulvinar in lorem eget. Et consequat sed aliquam pulvinar aliquam enim. Duis feugiat neque ut efficitur pulvinar nulla accumsan vitae eu efficitur.",
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&w=800&q=80',
        `https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?auto=format&w=800&q=8`,
        `https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&w=800&q=80`,
        // `/property-${index + 3 > 9 ? index - 6 : index + 3}.jpg`,
        // `/property-${index + 4 > 9 ? index - 5 : index + 4}.jpg`,
      ],
    propertyType: index % 4 === 0 ? "apartment" : index % 4 === 1 ? "house" : index % 4 === 2 ? "land" : "commercial",
    listingType: index % 3 === 0 ? "sale" : index % 3 === 1 ? "rent" : "short-stay",
    rating: 4.9,
    reviewCount: 12,
    featured: index < 3,
    constructionYear: 2020,
  }))

const PropertyDetailsPage = () => {
  const { propertyId } = useParams<{ propertyId: string }>()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)

  // Simulate API call to fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real app, this would be an API call
      setProperty(mockProperty)
      setLoading(false)
    }

    fetchProperty()
  }, [propertyId])

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
        currentPage='property details'
        // breadcrumbs={[
        //   { label: "Home", href: "/" },
        //   { label: "Listings", href: "/listings" },
        //   { label: property.title },
        // ]}
      />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Chip
          label={
            property.listingType === "sale" ? "For sale" : property.listingType === "rent" ? "For rent" : "Short stay"
          }
          color={property.listingType === "sale" ? "primary" : property.listingType === "rent" ? "secondary" : "info"}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {property.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {property.location.address}, {property.location.city}
              {property.location.state ? `, ${property.location.state}` : ""}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h4" component="div" color="primary.main" gutterBottom>
              {formatCurrency(property.price)}
            </Typography>
            {property.pricePerSqm && (
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(property.pricePerSqm)}/sqm
              </Typography>
            )}
          </Box>
        </Box>

        <PropertyGallery images={property.images} title={property.title} />

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

            {mockNearbyPlaces.length > 0 && (
              <Box sx={{ my: 6 }}>
                <NearbyPlaces places={mockNearbyPlaces} />
              </Box>
            )}

            {property.videoUrl && (
              <Box sx={{ my: 6 }}>
                <PropertyVideo videoUrl={property.videoUrl} thumbnailUrl={property.images[0]} />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: 20 }}>
              <BookViewingForm propertyId={property.id} propertyTitle={property.title} />

              <Box sx={{ mt: 4 }}>
                <ContactAgentForm propertyId={property.id} propertyTitle={property.title} />
              </Box>

              <Box sx={{ mt: 4, bgcolor:"secondary.main", p:2, borderRadius:2 }}>
                <FeaturedListings  />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <RelatedProperties properties={mockRelatedProperties} />
    </Box>
  )
}

export default PropertyDetailsPage;

