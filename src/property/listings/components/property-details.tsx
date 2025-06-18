/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Box, Typography, Grid } from "@mui/material"
import { ApiProperty } from "../../../types/properties"

const detailIconMap: Record<
  string,
  { icon: string; label: string }
> = {
  bedrooms: {
    icon: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987397/double-bed_1_t8j5n1.svg",
    label: "Bedrooms",
  },
  bathrooms: {
    icon: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987397/bath-tub_1_tvddev.svg",
    label: "Bathrooms",
  },
  // garage: {
  //   icon: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987396/parking-sign_1_amf4kq.svg",
  //   label: "Garage",
  // },
  parking: {
    icon: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987396/parking-sign_1_amf4kq.svg",
    label: "Parking",
  },
  // security: {
  //   icon: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987396/parking-sign_1_amf4kq.svg",
  //   label: "Security",
  // },
}


const defaultIcon =
  "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987395/Icon_u6frq4.svg"


const formatValue = (value: any): string => {
  if (typeof value === 'boolean') {
    return value ? "Yes" : "No"
  }
  if (value === null || value === undefined) {
    return "N/A"
  }
  return value.toString()
}

const formatLabel = (key: string): string => {
  return key
    .replace(/([A-Z])/g, " $1") 
    .replace(/_/g, " ") 
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

interface PropertyDetailsProps {
  property: ApiProperty
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const propertyDetails = property?.propertyDetails || []

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Property details
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ borderBottom: 1, borderRight: 1, borderColor: "grey.300", p: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box component="img" src={defaultIcon} alt="Total area" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                Total Area
              </Typography>
            </Box>
            <Typography variant="body1">{property.area} sq ft</Typography>
          </Box>
        </Grid>

        {propertyDetails.map((detail) => {
          const key = detail.name
          const value = detail.value
          const mapped = detailIconMap[key]
          const icon = mapped?.icon || defaultIcon
          const label = mapped?.label || formatLabel(key)
          const displayValue = formatValue(value)

          return (
            <Grid
              key={detail.id || detail._id || key}
              item
              xs={12}
              sm={6}
              sx={{ borderBottom: 1, borderRight: 1, borderColor: "grey.300", p: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box component="img" src={icon} alt={label} />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {label}
                  </Typography>
                </Box>
                <Typography variant="body1">{displayValue}</Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default PropertyDetails