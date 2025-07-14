

import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  Chip,
  Button,
  Alert,
  Skeleton,
  Divider,
} from "@mui/material"
import {
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
  Share as ShareIcon,
  Event as EventTypeIcon,
} from "@mui/icons-material"
import { PageBanner } from "../../common/banner/page-banner"
import EventApplicationForm from "../components/event-application-form"
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks"
import { fetchEventById, clearSelectedEvent, clearError } from "../../redux/slices/events-slice"

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { selectedEvent: event, loading, error } = useAppSelector((state) => state.events)

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventById(eventId))
    }

    return () => {
      dispatch(clearSelectedEvent())
    }
  }, [dispatch, eventId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPrice = () => {
    if (!event?.isPaid) return "Free"

    const price = event.price?.inPerson || event.price?.virtual
    if (price) {
      return `${price.currency} ${price.amount}`
    }
    return "Paid"
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.summary,
        url: window.location.href,
      })
    }
  }

  const handleGoBack = () => {
    navigate("/events")
  }

  if (loading) {
    return (
      <Box sx={{ width: "100vw" }}>
        <PageBanner
          title="Event Details"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: "Loading..." }]}
        />
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card sx={{ borderRadius: 3, mb: 3 }}>
                <Skeleton variant="rectangular" height={400} />
                <Box sx={{ p: 4 }}>
                  <Skeleton variant="text" height={40} width="80%" />
                  <Skeleton variant="text" height={20} width="60%" sx={{ mt: 2 }} />
                  <Box sx={{ mt: 3 }}>
                    <Skeleton variant="text" height={16} width="100%" />
                    <Skeleton variant="text" height={16} width="90%" />
                    <Skeleton variant="text" height={16} width="95%" />
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton variant="rectangular" height={600} sx={{ borderRadius: 3 }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    )
  }

  if (error || !event) {
    return (
      <Box sx={{ width: "100vw" }}>
        <PageBanner
          title="Event Not Found"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: "Error" }]}
        />
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => dispatch(clearError())}>
                Dismiss
              </Button>
            }
          >
            {error || "Event not found"}
          </Alert>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="contained" onClick={handleGoBack} startIcon={<ArrowBackIcon />}>
              Back to Events
            </Button>
          </Box>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100vw" }}>
      <PageBanner
        title={event.title}
        //subtitle={event.summary}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: event.title }]}
      />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleGoBack} sx={{ borderRadius: 2 }}>
            Back to Events
          </Button>
          <Button variant="outlined" startIcon={<ShareIcon />} onClick={handleShare} sx={{ borderRadius: 2 }}>
            Share Event
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
              <CardMedia
                component="img"
                height="400"
                image={event.image}
                alt={event.title}
                sx={{ objectFit: "cover" }}
              />

              <Box sx={{ p: 4 }}>
                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                  <Chip
                    label={event.isPaid ? getPrice() : "Free"}
                    color={event.isPaid ? "primary" : "success"}
                    icon={event.isPaid ? <MoneyIcon /> : undefined}
                    sx={{ fontWeight: 600, color: 'white' }}
                  />
                  <Chip
                    label={event.eventType == "inPerson" ? "In Person" : event.eventType}
                    variant="outlined"
                    icon={<EventTypeIcon />}
                    sx={{ textTransform: "capitalize" }}
                  />
                  {/* <Chip
                    label={event.status}
                    color={event.status === "active" ? "success" : "default"}
                    variant="outlined"
                    sx={{ textTransform: "capitalize" }}
                  /> */}
                </Box>

                <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
                  {event.title}
                </Typography>

                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                  {event.summary}
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <CalendarIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Event Date
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {formatDate(event.expirationDate)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <LocationIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Location
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {event.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <PersonIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Organizer
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                         Paragone Signature & Associates
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <EventTypeIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Event Type
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ textTransform: "capitalize" }}>
                          {event.eventType == "inPerson" ? "In Person" : event.eventType}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

{/*                 {event.link && !event.isPaid && (
                  <Box sx={{ mt: 4 }}>
                    <Button
                      variant="outlined"
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ borderRadius: 2,'&:hover':{bgcolor:'primary.main', color:'white'} }}
                    >
                      Visit Event 
                    </Button>
                  </Box>
                )} */}
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <EventApplicationForm event={event} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default EventDetails
