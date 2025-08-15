
import type React from "react"

import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, IconButton, Tooltip } from "@mui/material"
import {
  Share as ShareIcon,
  Download as DownloadIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import type { Resource } from "../types"

interface ResourceCardProps {
  resource: Resource
  showButton?: boolean
}

const ResourceCard = ({ resource, showButton=true }: ResourceCardProps) => {
  const navigate = useNavigate()

  const getPrice = () => {
    if (!resource.isPaid) return "Free"
    if (resource.price) {
      return `${resource.price.currency} ${resource.price.amount}`
    }
    return "Paid"
  }

  const handleViewDetails = () => {
    navigate(`/resources/${resource.id}`)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        //text: resource.summary,
        url: window.location.origin + `/resources/${resource.id}`,
      })
    }
  }

 

  return (
    <Card
      sx={{
        height: '100%',
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
      onClick={handleViewDetails}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={resource.image}
          alt={resource.title}
          sx={{
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            display: "flex",
            gap: 1,
          }}
        >
         
          <Tooltip title="Share resource">
            <IconButton
              size="small"
              onClick={handleShare}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.9)",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
              }}
            >
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
          }}
        >
          <Chip
  label={resource.isPaid ? getPrice() : "Free"}
  color={resource.isPaid ? "primary" : "success"}
  size="small"
  icon={!resource.isPaid ? <DownloadIcon /> : undefined}
  sx={{
    bgcolor: resource.isPaid ? "primary.main" : "success.main",
    color: "white",
    fontWeight: 600,
  }}
/>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {resource.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp:2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.5,
          }}
        >
          <p dangerouslySetInnerHTML={{ __html: resource.summary }} />
        </Typography>

        {showButton && (
<Button
          variant="contained"
          fullWidth
          onClick={handleViewDetails}
          disabled={!resource.isActive}
          sx={{
            mt: "auto",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            py: 1.5,
          }}
        >
          {resource.isPaid ? "Get Premium Resource" : "Download Free Resource"}
        </Button>
        )}

        
      </CardContent>
    </Card>
  )
}

export default ResourceCard
