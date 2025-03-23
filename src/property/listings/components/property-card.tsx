"use client"

import React from "react"
import { Box, Typography, Card, CardContent, CardMedia, Rating, IconButton, Chip } from "@mui/material"
import { Favorite, FavoriteBorder, LocationOn, Hotel, Bathtub, SquareFoot } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import type { Property } from "../types"
import { formatCurrency } from "../utils"

interface PropertyCardProps {
  property: Property
  featured?: boolean
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, featured = false }) => {
  const [isFavorite, setIsFavorite] = React.useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const getListingTypeChip = (type: string) => {
    switch (type) {
      case "sale":
        return (
          <Chip
            label="For sale"
            size="small"
            sx={{
              bgcolor: "#FFA500",
              color: "white",
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 1,
            }}
          />
        )
      case "rent":
        return (
          <Chip
            label="For rent"
            size="small"
            sx={{
              bgcolor: "#9C27B0",
              color: "white",
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 1,
            }}
          />
        )
      case "short-stay":
        return (
          <Chip
            label="Short stay"
            size="small"
            sx={{
              bgcolor: "#2196F3",
              color: "white",
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 1,
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        backgroundColor: "background.paper",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
        },
        position: "relative",
        overflow: "visible",
      }}
      component={RouterLink}
      to={`/listings/${property.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box sx={{ position: "relative" }}>
        {getListingTypeChip(property.listingType)}

        {featured && (
          <Chip
            label="Featured"
            size="small"
            sx={{
              bgcolor: "#FF6F00",
              color: "white",
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
            }}
          />
        )}

        <CardMedia
          component="img"
          height="200"
          image={property.images[0] || "/placeholder.svg?height=200&width=300"}
          alt={property.title}
          sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />

        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
          sx={{
            position: "absolute",
            bottom: -20,
            right: 10,
            bgcolor: "white",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "white" },
          }}
        >
          {isFavorite ? <Favorite color="primary" /> : <FavoriteBorder />}
        </IconButton>

        <Box
          sx={{
            position: "absolute",
            bottom: -20,
            left: 10,
            bgcolor: "primary.main",
            color: "white",
            borderRadius: 1,
            px: 1.5,
            py: 0.5,
            fontWeight: "bold",
          }}
        >
          <Typography variant="subtitle2">{formatCurrency(property.price)}</Typography>
        </Box>
      </Box>

      <CardContent sx={{ pt: 3, flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom noWrap sx={{ mt: 1 }}>
          {property.title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {property.location.address}, {property.location.city}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Hotel fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{property.features.bedrooms} bed room</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Bathtub fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{property.features.bathrooms} bath</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SquareFoot fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{property.features.area}sqm</Typography>
          </Box>
        </Box>
      </CardContent>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pb: 2 }}>
        <Typography
          variant="body2"
          component={RouterLink}
          to={`/listings/${property.id}`}
          sx={{ textDecoration: "none", color: "primary.main" }}
        >
          More details →
        </Typography>

        {property.rating && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating value={property.rating} readOnly size="small" precision={0.5} />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {property.rating.toFixed(1)}
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  )
}

export default PropertyCard

