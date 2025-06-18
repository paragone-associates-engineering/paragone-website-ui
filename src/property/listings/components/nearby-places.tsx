import type React from "react"
import { Box, Typography, Grid } from "@mui/material"
import {
  School as SchoolIcon,
  LocalHospital as LocalHospitalIcon,
  ShoppingCart as ShoppingCartIcon,
  DirectionsBus as DirectionsBusIcon,
  TheaterComedy as TheaterComedyIcon,
} from "@mui/icons-material"
import type { Landmark } from "../../types"

interface NearbyPlacesProps {
  places: Landmark[];
}

const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ places }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case "education":
        return <SchoolIcon />
      case "health":
        return <LocalHospitalIcon />
      case "shopping":
        return <ShoppingCartIcon />
      case "transport":
        return <DirectionsBusIcon />
      case "culture":
        return <TheaterComedyIcon />
      default:
        return (
          <img 
            src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1750252532/Icon_tyfmqa.svg" 
            alt="Default icon"
            style={{ width: 24, height: 24 }}
          />
        )
    }
  }

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "education":
        return "Education"
      case "health":
        return "Health & Medicine"
      case "shopping":
        return "Shopping"
      case "transport":
        return "Transport"
      case "culture":
        return "Culture"
      default:
        return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  
  const placesByCategory: Record<string, Landmark[]> = {}
  places.forEach((place) => {
    if (!placesByCategory[place.category]) {
      placesByCategory[place.category] = []
    }
    placesByCategory[place.category].push(place)
  })

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        What's nearby
      </Typography>

      {Object.keys(placesByCategory).map((category) => (
        <Box key={category} sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            {getIcon(category)}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {getCategoryTitle(category)}
            </Typography>
          </Box>

          {placesByCategory[category].map((place, index) => (
            <Box key={index} sx={{ ml: 4, mb: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Typography variant="body2" color="text.secondary">
                    {place.category}
                  </Typography>
                  <Typography variant="body1">{place.name}</Typography>
                </Grid>
                {/* <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    {place.distance} mile
                  </Typography>
                </Grid> */}
              </Grid>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default NearbyPlaces