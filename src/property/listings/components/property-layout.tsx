import type React from "react"
import { Grid, Box, Typography, Pagination, PaginationItem } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import PropertyCard from "../../../common/property-card"
//import { propertiesData } from "../../../constant";
import { ApiProperty } from "../../../types/properties";
import SkeletonLoader from "../../../common/skeleton-loader";
interface PropertyGridProps {
  properties: ApiProperty[]
  totalCount?: number
  currentPage?: number
  itemsPerPage?: number
  baseUrl?: string
  loading?: boolean
  emptyMessage?: string
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  totalCount = 0,
  currentPage = 1,
  itemsPerPage = 6,
  baseUrl = "/listings",
  loading = false,
  emptyMessage = "No properties found matching your criteria.",
}) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  if (loading) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <SkeletonLoader count={6} /> 
      </Box>
    )
  }

  if (properties.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography>{emptyMessage}</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Grid container rowSpacing={6} columnSpacing={2}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={6} key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && currentPage > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                component={RouterLink}
                to={`${baseUrl}${item.page === 1 ? "" : `?page=${item.page}`}`}
                {...item}
              />
            )}
          />
        </Box>
      )}
    </Box>
  )
}

export default PropertyGrid

