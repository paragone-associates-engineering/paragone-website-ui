import { Skeleton, Card, CardContent, Grid } from "@mui/material";

interface SkeletonLoaderProps {
  count?: number; 
}

const SkeletonLoader = ({ count = 6 }: SkeletonLoaderProps) => {
  return (
    <Grid container spacing={2} sx={{px:3}}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card>
            <Skeleton variant="rectangular" height={150} animation="wave" />
            <CardContent>
              <Skeleton variant="text" width="80%" animation="wave" />
              <Skeleton variant="text" width="80%" animation="wave" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonLoader;
