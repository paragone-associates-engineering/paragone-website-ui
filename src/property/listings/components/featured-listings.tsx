import { Box, CardMedia, Grid, Typography, Chip } from "@mui/material";

const listings = [
  {
    id: 1,
    title: "Luxury house in Los Angeles",
    address: "Smoky Hollow St. Sulphur, LA 70663",
    price: "₦ 250000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=800&q=80", // Replace with actual image URL
  },
  {
    id: 2,
    title: "Luxury house in Los Angeles",
    address: "Smoky Hollow St. Sulphur, LA 70663",
    price: "₦ 250000",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&w=800&q=80",
  },
  {
    id: 3,
    title: "Luxury house in Los Angeles",
    address: "Smoky Hollow St. Sulphur, LA 70663",
    price: "₦ 250000",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&w=800&q=80",
  },
//   {
//     id: 4,
//     title: "Luxury house in Los Angeles",
//     address: "Smoky Hollow St. Sulphur, LA 70663",
//     price: "₦ 250000",
//     image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=800&q=80",
//   },
];

export default function FeaturedListings() {
  return (
    <Box sx={{ backgroundColor: "secondary.main", p: 1, borderRadius: 3 }}>
      
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Featured listings
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Leo morbi faucibus mattis pharetra tellus velit
      </Typography>

     
      <Grid container spacing={1}>
        {listings.map((listing) => (
          <Grid item xs={12} key={listing.id}>
            <Box sx={{ display: "flex", borderRadius: 3, boxShadow: 0, p: 1 }}>
              {/* Image with "For Sale" Tag */}
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image={listing.image}
                  alt={listing.title}
                  sx={{ width: 150, height: 130, borderRadius: 2 }}
                />
                <Chip
                  label="For sale"
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    backgroundColor: "white",
                    fontWeight: "bold",
                  }}
                />
              </Box>

             
              <Box sx={{ pl: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {listing.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {listing.address}
                </Typography>
                <Typography variant="h6" fontWeight="bold" mt={1}>
                  {listing.price}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
