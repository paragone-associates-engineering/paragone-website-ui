
import type React from "react"
import { Grid, Box, Typography, Pagination } from "@mui/material"
import { styled } from "@mui/material/styles"
import PropertyCard from "../../../common/property-card"
import type { ApiProperty } from "../../../types/properties"
import SkeletonLoader from "../../../common/skeleton-loader"
import { useAppDispatch } from "../../../redux/store/hooks"
import { setCurrentPage } from "../../../redux/slices/listings-slice"

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "text.main",
    border: `1px solid #ddd`,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    "&.MuiPaginationItem-ellipsis": {
      backgroundColor: "transparent",
      color: theme.palette.primary.main,
      border: "none",
    },
  },
  "& .MuiPaginationItem-previousNext": {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.grey[500],
    },
  },
}))

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
  loading = false,
  emptyMessage = "No properties found matching your criteria.",
}) => {
  const dispatch = useAppDispatch()
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page))
   
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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


      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6, gap:3 }}>
          <StyledPagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            size="medium"
            // showFirstButton
            // showLastButton
          />
        </Box>
      )}
    </Box>
  )
}

export default PropertyGrid
