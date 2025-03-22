import type React from "react"
import { Box, Typography, Grid } from "@mui/material"
import RegionCard from "./region-card"
import type { Region } from "../types"

interface RegionsGridProps {
  regions: Region[]
  title?: string
  subtitle?: string
}

const RegionsGrid: React.FC<RegionsGridProps> = ({
  regions,
  title = "Service Regions",
  subtitle = "Explore the diverse property landscapes in our service regions",
}) => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        {subtitle}
      </Typography>

      <Grid container spacing={2}>
        {regions.map((region) => (
          <Grid item xs={12} sm={6} md={4} key={region.id}>
            <RegionCard region={region} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default RegionsGrid

