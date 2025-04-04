import type React from "react"
import { Box, Typography, Card, CardActionArea } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { KeyboardArrowRight } from "@mui/icons-material"
//import type { Region } from "../types"

interface RegionCardProps {
  region:string
}

const RegionCard: React.FC<RegionCardProps> = ({ region }) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 2,
        border:'1px solid #ddd',
        backgroundColor: "background.paper",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateX(5px)",
          bgcolor:'primary.main',
          color:'#fff'
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/listings/location/${region}`}
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1.5,
        }}
      >
        <Typography variant="body1" fontWeight={500}>
          {region}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* {region.propertyCount !== undefined && (
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              {region.propertyCount} properties
            </Typography>
          )} */}
          <KeyboardArrowRight />
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default RegionCard

