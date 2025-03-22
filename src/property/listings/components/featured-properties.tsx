import type React from "react"
import { Box, Typography, Grid } from "@mui/material"
import PropertyCard from "./property-card"
import type { Property } from "../types"

interface FeaturedPropertiesProps {
  properties: Property[]
  title?: string
  subtitle?: string
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  title = "Featured listings",
  subtitle = "Have access to some of our most exclusive and available properties and developments that range from various models of houses, apartments, and lands",
}) => {
  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="overline" color="primary" align="center" display="block">
        {title}
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom align="center">
        Discover our featured and exclusive properties
      </Typography>

      <Typography variant="body1" paragraph align="center" sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
        {subtitle}
      </Typography>

      <Grid container spacing={4}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard property={property} featured={property.featured} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FeaturedProperties

