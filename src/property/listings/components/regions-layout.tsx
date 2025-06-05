import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import RegionCard from "./region-card";
import { API_BASE_URL } from "../../../services/api";

const RegionsGrid = ({
  title = "Service Regions",
  subtitle = "Explore the dream property you've been searching for",
}: {
  title?: string;
  subtitle?: string;
}) => {
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/listings/get-available-locations`);
        setRegions(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load regions");
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 8, pb:6 }}>
      {/* <Box> */}

      <Grid container spacing={2} sx={{ px: 1 }}>
        <Box sx={{pl:{xs:3, md:0}}}>
        <Typography variant="h4" sx={{fontSize:26}} gutterBottom>
        {title}
      </Typography>
       <Typography variant="body1" component="p" sx={{ mb: 2, maxWidth:{xs:'100%', md:"80%"} }}>
        {subtitle}
      </Typography>
      </Box>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {regions.map((region:any) => (
          <Grid item xs={6} sm={6} md={2} key={region?.region}>
            <RegionCard region={region?.region} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RegionsGrid;
