import type React from "react"
import { Box, Typography, Grid } from "@mui/material"
import {
  Home as HomeIcon,
  Bathtub as BathtubIcon,
  Hotel as HotelIcon,
  SquareFoot as SquareFootIcon,
  CalendarToday as CalendarTodayIcon,
  DirectionsCar as DirectionsCarIcon,
  Wifi as WifiIcon,
  Tv as TvIcon,
  Elevator as ElevatorIcon,
} from "@mui/icons-material"
import type { Property } from "../types"

interface PropertyDetailsProps {
  property: Property
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Property details
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SquareFootIcon sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total area
              </Typography>
              <Typography variant="body1">{property.features.area} sq ft</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HotelIcon sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Bedrooms
              </Typography>
              <Typography variant="body1">{property.features.bedrooms}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BathtubIcon  sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Bathrooms
              </Typography>
              <Typography variant="body1">{property.features.bathrooms}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HomeIcon  sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Floor
              </Typography>
              <Typography variant="body1">3/8</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CalendarTodayIcon  sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Construction year
              </Typography>
              <Typography variant="body1">{property.constructionYear || "N/A"}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DirectionsCarIcon  sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Parking
              </Typography>
              <Typography variant="body1">{property.features.parking ? "Yes" : "No"}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <WifiIcon  sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                WiFi
              </Typography>
              <Typography variant="body1">{property.features.wifi ? "Yes" : "No"}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TvIcon  sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Cable TV
              </Typography>
              <Typography variant="body1">{property.features.cableTV ? "Yes" : "No"}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ElevatorIcon  sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Elevator
              </Typography>
              <Typography variant="body1">{property.features.elevator ? "Yes" : "No"}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PropertyDetails

