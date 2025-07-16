
import type React from "react"

import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, IconButton, Tooltip } from "@mui/material"
import {
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Share as ShareIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import type { Event } from "../../types/events"

interface EventCardProps {
  event: Event
}

const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getPrice = () => {
    if (!event.isPaid) return "Free"

    const price = event.price?.inPerson || event.price?.virtual
    if (price) {
      return `${price.currency} ${price.amount}`
    }
    return "Paid"
  }

  const handleViewDetails = () => {
    navigate(`/events/${event.id}`)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.summary,
        url: window.location.origin + `/events/${event.id}`,
      })
    }
  }

 
  return (
    <Card
      sx={{
        height: "100%",
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
         // height="200"
          image={event.image}
          alt={event.title}
          sx={{
            width: "100%",
            height: 300,
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
         
          <Tooltip title="Share event">
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
            label={event.isPaid ? getPrice() : "Free"}
            color={event.isPaid ? "primary" : "success"}
            size="small"
            icon={event.isPaid ? <MoneyIcon /> : undefined}
            sx={{
              bgcolor: event.isPaid ? "primary.main" : "success.main",
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
            fontWeight: 600,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.5,
          }}
        >
          {event.summary}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CalendarIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              {formatDate(event.expirationDate)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationIcon fontSize="small" color="action" />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 120,
              }}
            >
              {event.location}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Chip label={event.eventType == "inPerson" ? "In Person" : event.eventType} size="small" variant="outlined" sx={{ textTransform: "capitalize" }} />
          
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleViewDetails}
          sx={{
            mt: "auto",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            py: 1.5,
          }}
        >
          View Details & Apply
        </Button>
      </CardContent>
    </Card>
  )
}

export default EventCard
