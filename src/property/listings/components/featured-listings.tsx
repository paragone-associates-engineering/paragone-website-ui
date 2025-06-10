import type React from "react"
import { Box, Typography, Grid, CircularProgress } from "@mui/material"
import type { ApiProperty } from "../../../types/properties"
//import { formatCurrency } from "../utils"
import PropertyCard from "../../../common/property-card"

interface FeaturedPropertiesProps {
  properties: ApiProperty[]
  loading?: boolean
  title?: string
  subtitle?: string
}

const FeaturedList: React.FC<FeaturedPropertiesProps> = ({
  properties,
  loading = false,
  title = "Featured Listings",
  //subtitle = "Leo morbi faucibus mattis pharetra tellus velit",
}) => {
  if (loading) {
    return (
      <Box sx={{ backgroundColor: "secondary.main", p: 1, borderRadius: 3, textAlign: "center", py: 4 }}>
        <CircularProgress size={24} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading featured properties...
        </Typography>
      </Box>
    )
  }

  if (!properties || properties.length === 0) {
    return (
      <Box sx={{ backgroundColor: "secondary.main", p: 1, borderRadius: 3, textAlign: "center", py: 4 }}>
        <Typography variant="h5" fontWeight="bold" marginBottom={5} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No featured properties available.
        </Typography>
      </Box>
    )
  }

//   const chipStyles: Record<
//   string,
//   { label: string; bg: string; muiColor?: "primary" | "secondary" | "default" }
// > = {
//   "For Sale":   { label: "For sale",   bg: "#46B0FD", muiColor: "primary" },
//   "For Rent":   { label: "For rent",   bg: "#B032EB", muiColor: "secondary" },
//   Land:         { label: "Land",       bg: "#4CAF50" },          
//   "Short Stay": { label: "Short stay", bg: "#FF9800" },         
  
// };

  
  return (
    <Box sx={{ backgroundColor: "", p: 1, py:3, borderRadius: 3 }}>
      <Typography  color="primary" gutterBottom align="center">
                         Featured properties
                        </Typography>
      <Typography variant="h5" fontWeight="bold" marginBottom={4} textAlign={'center'} gutterBottom>
        {title}
      </Typography>
     

      <Grid container spacing={1}>
        {properties.slice(0, 3).map((property) => {
//           const type = property?.listingType ?? "default";
// const { label,  muiColor } = chipStyles[type] ?? {
//   label: type,
//   bg: "#9E9E9E",
//   muiColor: "default",
// };
          return (
            <Grid item xs={12} sm={6} md={4} key={property._id}>
                        <PropertyCard property={property} />
                      </Grid>
  //         <Grid item xs={12} sm={4} key={property._id}>
  //           <Box sx={{  borderRadius: 3, boxShadow: 0, p: 1 }}>
  //             {/* Image with Listing Type Tag */}
  //             <Box sx={{ position: "relative" }}>
  //               <CardMedia
  //                 component="img"
  //                 image={property.images?.[0] || "/placeholder.svg?height=130&width=150"}
  //                 alt={property.propertyName}
  //                 sx={{ width: 200, height: 170, borderRadius: 2 }}
  //               />
  //               <Box sx={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection:"column", gap: 1 }}>
  //               <Chip 
  //           label={label}
  // color={muiColor}
  // size="small"
  //           sx={{ 
  //             backgroundColor: property?.listingType === 'For Sale' ? '#46B0FD' : '#B032EB',
  //             color: 'white',
  //             fontWeight: 'bold',
  //             px:0.5,
  //             py:1.5,
  //              borderRadius:2
  //           }} 
  //         />
  //         </Box>
  //             </Box>

  //             {/* Property Details */}
  //             <Box sx={{ pl: 2, flex: 1 }}>
  //               <Typography
  //                 variant="h6"
  //                 fontWeight="bold"
  //                 sx={{
  //                   textTransform: "capitalize",
  //                   overflow: "hidden",
  //                   textOverflow: "ellipsis",
  //                   display: "-webkit-box",
  //                   WebkitLineClamp: 2,
  //                   WebkitBoxOrient: "vertical",
  //                 }}
  //               >
  //                 {property.propertyName}
  //               </Typography>
  //               <Typography
  //                 variant="body2"
  //                 color="text.secondary"
  //                 sx={{
  //                   overflow: "hidden",
  //                   textOverflow: "ellipsis",
  //                   display: "-webkit-box",
  //                   WebkitLineClamp: 1,
  //                   WebkitBoxOrient: "vertical",
  //                 }}
  //               >
  //                 {property.location?.region || property.location?.city}
  //               </Typography>
  //               <Typography variant="h6" fontWeight="bold" mt={1}>
  //                 {formatCurrency(property.amount)}
  //               </Typography>
  //             </Box>
  //           </Box>
  //         </Grid>
        )})}
      </Grid>
    </Box>
  )
}

export default FeaturedList
