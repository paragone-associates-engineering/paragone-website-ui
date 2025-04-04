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
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 4 }}>
        {subtitle}
      </Typography>

      <Grid container spacing={2} sx={{ px: 1 }}>
        {regions.map((region:string) => (
          <Grid item xs={6} sm={6} md={4} key={region}>
            <RegionCard region={region} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RegionsGrid;
