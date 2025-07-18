import type React from "react"
import { Box, Typography, Card, CardActionArea } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { KeyboardArrowRight } from "@mui/icons-material"
//import type { Region } from "../types"

interface RegionCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  region:any
}

const RegionCard: React.FC<RegionCardProps> = ({ region }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        height:50,
        border:'1px solid #ddd',
        backgroundColor: "background.paper",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateX(5px)",
          bgcolor:'primary.main',
          color:'white'
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/listings/regions?location=${region}`}
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1.5,
           "&:hover": {
          color:'white'
        },
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

