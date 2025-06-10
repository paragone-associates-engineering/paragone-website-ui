import type React from "react"
import { Box, Typography, Grid, CircularProgress } from "@mui/material"
import PropertyCard from "../../../common/property-card"
import type { ApiProperty } from "../../../types/properties"

interface RelatedPropertiesProps {
  properties: ApiProperty[]
  loading?: boolean
  propertyType?: string
  title?: string
}

const RelatedProperties: React.FC<RelatedPropertiesProps> = ({ properties, loading = false }) => {
  
  //const displayTitle = title || (propertyType ? `Related ${propertyType} Properties` : "Related Properties in the Area")

  if (loading) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading related properties...
        </Typography>
      </Box>
    )
  }

  if (!properties || properties.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography  color="primary" gutterBottom>
                    Related property
                  </Typography>
        <Typography variant="h5" gutterBottom>
        Check Related Properties
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No related properties found.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 6, bgcolor: "secondary.main", maxWidth: "1200px", margin: "auto", px: { xs: 2, md: 0 } }}>
       <Typography  color="primary" gutterBottom align="center">
                    Related property
                  </Typography>
      <Typography variant="h4" fontWeight={700} component="h2" gutterBottom align="center">
      Check Related Properties
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2, px:3, }}>
        {properties.slice(0, 2).map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property._id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default RelatedProperties
