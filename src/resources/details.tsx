
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
  //Divider,
} from "@mui/material"
import {
  AttachMoney as MoneyIcon,
  ArrowBack as ArrowBackIcon,
  Share as ShareIcon,
  GetApp as GetAppIcon,
 
} from "@mui/icons-material"
import { PageBanner } from "../common/banner/page-banner"
import ResourceApplicationForm from "./components/resource-application-form"
import { useAppDispatch, useAppSelector } from "../redux/store/hooks"
import { fetchResourceById, clearSelectedResource, clearError } from "../redux/slices/resources-slice"

const ResourceDetails = () => {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { selectedResource: resource, loading, error } = useAppSelector((state) => state.resources)

  useEffect(() => {
    if (resourceId) {
      dispatch(fetchResourceById(resourceId))
    }

    return () => {
      dispatch(clearSelectedResource())
    }
  }, [dispatch, resourceId])

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })
//   }

  const getPrice = () => {
    if (!resource?.isPaid) return "Free"
    if (resource.price) {
      return `${resource.price.currency} ${resource.price.amount}`
    }
    return "Premium"
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: resource?.title,
        text: resource?.summary,
        url: window.location.href,
      })
    }
  }

  const handleGoBack = () => {
    navigate("/resources")
  }

  

  if (loading) {
    return (
      <Box sx={{ width: "100vw" }}>
        <PageBanner
          title="Resource Details"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Loading..." },
          ]}
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

  if (error || !resource) {
    return (
      <Box sx={{ width: "100vw" }}>
        <PageBanner
          title="Resource Not Found"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Error" }]}
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
            {error || "Resource not found"}
          </Alert>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="contained" onClick={handleGoBack} startIcon={<ArrowBackIcon />}>
              Back to Resources
            </Button>
          </Box>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100vw" }}>
      <PageBanner
        title={resource.title}
        //subtitle={resource.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: resource.title },
        ]}
      />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleGoBack} sx={{ borderRadius: 2 }}>
            Back to Resources
          </Button>
          <Button variant="outlined" startIcon={<ShareIcon />} onClick={handleShare} sx={{ borderRadius: 2 }}>
            Share Resource
          </Button>
         
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
              <CardMedia
                component="img"
                height="500"
                image={resource.image}
                alt={resource.title}
                sx={{ objectFit: "cover" }}
              />

              <Box sx={{ p: 4 }}>
                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                  <Chip
                    label={resource.isPaid ? getPrice() : "Free"}
                    color={resource.isPaid ? "primary" : "success"}
                    icon={resource.isPaid ? <MoneyIcon /> : <GetAppIcon />}
                    sx={{ fontWeight: 600, color: "white", bgcolor: resource.isPaid ? "primary.main" : "success.main" }}
                  />
                  
                 
                </Box>

                <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
                  {resource.title}
                </Typography>

                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                 <p dangerouslySetInnerHTML={{ __html: resource.summary }} />
                </Typography>

                {/* <Divider sx={{ my: 4 }} /> */}

               
               
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <ResourceApplicationForm resource={resource} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ResourceDetails
