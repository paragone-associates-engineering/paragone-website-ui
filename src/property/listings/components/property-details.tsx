import type React from "react"
import { Box, Typography, Grid } from "@mui/material"
import { ApiProperty } from "../../../types/properties"

interface PropertyDetailsProps {
  property: ApiProperty
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Property details
      </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
  {[
    { icon: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987395/Icon_u6frq4.svg', label: "Total area", value: `${property.propertyDetail.squareFeet} sq ft` },
    { icon: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987397/double-bed_1_t8j5n1.svg', label: "Bedrooms", value: property.propertyDetail.bedrooms },
    { icon: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987397/bath-tub_1_tvddev.svg', label: "Bathrooms", value: property.propertyDetail.bathrooms },
    { icon: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987396/stairs_1_yljfdy.svg', label: "Floor", value: "3/8" },
    { icon: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987708/brick_2_1_ae3qyr.svg', label: "Construction year", value: "N/A" },
    { icon: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742987396/parking-sign_1_amf4kq.svg', label: "Parking", value: property.propertyDetail.hasGarage ? "Yes" : "No" }
  ].map((item, index) => (
    <Grid item xs={12} sm={6} key={index} sx={{ borderBottom: 1, borderRight: index % 3 !== 2 ? 1 : 0, borderColor: "grey.300", p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* {item.icon} */}
          <Box component='img' src={item.icon} alt={item.label}/>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {item.label}
          </Typography>
        </Box>
        <Typography variant="body1">{item.value}</Typography>
      </Box>
    </Grid>
  ))}
</Grid>
        {/* <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <WifiIcon  sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                WiFi
              </Typography>
              <Typography variant="body1">{property.features.wifi ? "Yes" : "No"}</Typography>
            </Box>
          </Box>
        </Grid> */}

        {/* <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TvIcon  sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Cable TV
              </Typography>
              <Typography variant="body1">{property.features.cableTV ? "Yes" : "No"}</Typography>
            </Box>
          </Box>
        </Grid> */}

        {/* <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ElevatorIcon  sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Elevator
              </Typography>
              <Typography variant="body1">{property.features.elevator ? "Yes" : "No"}</Typography>
            </Box>
          </Box>
        </Grid> */}
      
    </Box>
  )
}

export default PropertyDetails

