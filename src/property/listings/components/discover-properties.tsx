import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid2,
  Button,
  Stack,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";
import TerrainIcon from "@mui/icons-material/Terrain";
import { FilterOption } from "../../../types/properties";
import PropertyCard from "../../../common/property-card";
import SkeletonLoader from "../../../common/skeleton-loader";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { fetchListings } from "../../../redux/slices/listings-slice";
 import CustomButton from "../../../common/button";
 import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Helmet } from "react-helmet-async";

const filterOptions: FilterOption[] = [
  { value: "all", label: "All properties", icon: <HouseIcon /> },
  //{ value: "location", label: "Location", icon: <LocationOnIcon /> },
  { value: "For Sale", label: "For sale", icon: <HomeWorkIcon /> },
  { value: "For Rent", label: "For rent", icon: <ApartmentIcon /> },
  { value: "Short Stay", label: "Short stay", icon: <HomeWorkIcon /> },
  { value: "Land", label: "Land", icon: <TerrainIcon /> },
];

const DiscoverExclusiveProperties = () => {
  const dispatch = useAppDispatch()
  const listings = useAppSelector((state) => state.listings)
  
    const { properties, loading, pageSize, currentPage} = listings || {
      properties: [],
      totalCount: 0,
      loading: true,
      currentPage: 1,
      pageSize: 6,
      filters: {},
    }
  
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const handleFilterChange = (value: string) => {
      
      if (value !== null) {
        setActiveFilter(value);
            }
    };

  const filteredProperties = properties?.length > 0 && properties.filter((property) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "For Sale" && property.listingType === "For Sale") return true;
    if (activeFilter === "For Rent" && property.listingType === "For Rent") return true;
     if (activeFilter === "Short Stay" && property.listingType === "Short Stay") return true;
     if (activeFilter === "Land" && property.listingType === "Land") return true;
    return false;
  });
 //console.log(filteredProperties)
  useEffect(() => {
      dispatch(fetchListings({ page: currentPage, pageSize }))
    }, [dispatch, currentPage, pageSize]);

   
    
  return (
   <>
    <Helmet>
           <title>Listings | Paragone Signature & Associates</title>
        <meta name="description" content='This includes all listings available in Paragone Signature and Associates' />
         </Helmet>
   
      <Box sx={{bgcolor:'secondary.main', py:5, borderBottom: '1px solid #e0e0e0'}}>
       
         <Container maxWidth="lg">
         <Box textAlign="center" mb={2}>
        <Typography variant='subtitle1' color="primary">
          Featured listing
        </Typography>
        <Typography variant="h4" fontWeight="bold" mb={2}>
        Discover our featured and exclusive properties
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          mb={4}
          sx={{ maxWidth: "800px", mx: "auto" }}
        >
         Have access to some of our most exclusive and available listings of properties and developments that range from various models of houses, apartments, and lands.
        </Typography>
      </Box>

<Box sx={{display: 'flex', flexDirection:{xs:'column', md:'row'}, alignItems:{xs:'flex-end', md:'center'}, justifyContent:'space-between'}}>
<Box sx={{ display: 'flex',width:'100%', overflowX:'auto', justifyContent: {xs:'flex-start'}, my: 4, gap: {xs:0.8,md:1} }}>
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          variant={activeFilter === option.value ? "contained" : "outlined"}
          onClick={() => handleFilterChange(option.value)}
          sx={{
            borderRadius: 2,
            py: 1,
            px: {md:2},
            minWidth: { xs: '130px', sm: 'auto' },
            //mb: { xs: 1, md: 0 },
            bgcolor: activeFilter === option.value ? '#ffa726' : 'white',
            color: activeFilter === option.value ? 'white' : 'inherit',
            borderColor: '#e0e0e0',
            '&:hover': {
              bgcolor: activeFilter === option.value ? '#fb8c00' : '#f5f5f5',
              borderColor: '#e0e0e0'
            },
            boxShadow: activeFilter === option.value ? 2 : 0,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ 
              display: 'flex', 
              //alignItems: 'center', 
              bgcolor:activeFilter === option.value ? 'white' : '#EFF3F5',
              py:0.5,
              px:1,
              borderRadius:1,
              color: activeFilter === option.value ? 'primary.main' : '#757575',
            }}>
              {option.icon}
            </Box>
            <Typography variant="body2" sx={{ whitespace: 'nowrap', fontWeight: activeFilter === option.value ? 'bold' : 'normal' }}>
              {option.label}
            </Typography>
          </Stack>
        </Button>
      ))}
    </Box>
    <CustomButton
            //variant="outlined"
            sx={{ bgcolor: "#5A6164", color: "#fff", height:40, borderRadius:10,px:2, mb:{xs:2,md:0} }}
            startIcon={FilterAltIcon}
            href={`/listings/filter`}
          >
            Filter
          </CustomButton>
</Box>
      
      <Grid2 container spacing={2}>
      {loading ? (
        <SkeletonLoader count={6} />
      ) : Array.isArray(filteredProperties) && filteredProperties.length > 0 ? (
        filteredProperties.slice(0, 6).map((property) => (
          <Grid2 size={{xs:12, sm:6, md:4}}  key={property.id}>
            <PropertyCard property={property} />
          </Grid2>
        ))
      ) : (
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            width: "100%", 
            mt: 4 
          }}
        >
          
          <Typography variant="h6" color="textSecondary">
            No properties available
          </Typography>
        </Box>
      )}
    </Grid2>
 <Box display="flex" justifyContent="center" mt={4}>
        <CustomButton href='/listings/filter' sx={{px:5, py:1.5}}>Browse all Properties</CustomButton>
      </Box>
     {/* {totalPages > 1 && currentPage > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                color="primary"
                renderItem={(item) => (
                  <PaginationItem
                    component={RouterLink}
                    to={`/listings${item.page === 1 ? "" : `?page=${item.page}`}`}
                    {...item}
                  />
                )}
              />
            </Box>
          )} */}
    </Container>
   
    </Box>
    </>
  );
};

export default DiscoverExclusiveProperties;
