import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Pagination,
  PaginationItem,
 
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { PageBanner } from '../common/banner/page-banner';
import { formatDate } from "./utils"
import Testimonials from "../common/testimonial"
import { featuredPost, latestPosts } from "./data";

const Blog = () => {
 
  return (
    <Box sx={{width:'100vw'}}>
     <PageBanner title='Blog' currentPage="Blog" />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{ textDecoration: "none", color: "inherit", display: "block" }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={featuredPost.image}
                alt={featuredPost.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="primary" gutterBottom>
                {formatDate(featuredPost.date)}
              </Typography>
              <Typography variant="h4" component="h1" gutterBottom>
                {featuredPost.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {featuredPost.excerpt}
              </Typography>
              <Button variant="text" color="primary" sx={{ fontWeight: "bold", pl: 0 }}>
                Read more...
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Latest Posts
          </Typography>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            {latestPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
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
                  }}
                  component={RouterLink}
                  to={`/blog/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia component="img" height="200" image={post.image} alt={post.title} />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "primary.main",
                        color: "white",
                        borderRadius: 1,
                        px: 1.5,
                        py: 0.5,
                      }}
                    >
                      <Typography variant="caption" fontWeight="bold">
                        {formatDate(post.date, "MMM DD")}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {post.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={4}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  component={RouterLink}
                  to={`/blog${item.page === 1 ? "" : `?page=${item.page}`}`}
                  {...item}
                />
              )}
            />
          </Box>
        </Box>

       <Testimonials />
      </Container>
    </Box>
  )
}

export default Blog

