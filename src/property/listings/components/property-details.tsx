/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Box, Typography, Grid } from "@mui/material"
import { ApiProperty } from "../../../types/properties"

// Mapping of detail names to icon URLs and labels
const detailIconMap: Record<
  string,
  { icon: string; label: string; render?: (value: any) => string }
> = {
  bedrooms: {
    icon: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987397/double-bed_1_t8j5n1.svg",
    label: "Bedrooms",
  },
  bathrooms: {
    icon: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987397/bath-tub_1_tvddev.svg",
    label: "Bathrooms",
  },
  garage: {
    icon: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987396/parking-sign_1_amf4kq.svg",
    label: "Parking",
    render: (value: boolean) => (value ? "Yes" : "No"),
  },
  // Add more mappings if needed
}

interface PropertyDetailsProps {
  property: ApiProperty
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const detailsArray = property?.propertyDetails || []

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Property details
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {/* Static area display */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ borderBottom: 1, borderRight: 1, borderColor: "grey.300", p: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987395/Icon_u6frq4.svg"
                alt="Total area"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                Total Area
              </Typography>
            </Box>
            <Typography variant="body1">{property.area} sq ft</Typography>
          </Box>
        </Grid>

        {/* Dynamic propertyDetails rendering */}
        {detailsArray.map((detail, index) => {
          const mapped = detailIconMap[detail.name]
          if (!mapped) return null // Skip if no icon is mapped

          return (
            <Grid
              item
              xs={12}
              sm={6}
              key={detail.id}
              sx={{ borderBottom: 1, borderRight: (index + 1) % 3 !== 0 ? 1 : 0, borderColor: "grey.300", p: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box component="img" src={mapped.icon} alt={mapped.label} />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {mapped.label}
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {mapped.render ? mapped.render(detail.value) : detail.value}
                </Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default PropertyDetails
