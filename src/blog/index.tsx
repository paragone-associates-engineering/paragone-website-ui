import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBlogPosts } from "../redux/slices/blog-slice";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  // Paper,
  // CardContent,
  // CardMedia,
  //Button,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { PageBanner } from "../common/banner/page-banner";
import Testimonials from "../common/testimonial";
//import { formatDate } from "./utils";
import { BlogCard } from "../common/blog-card";

const Blog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, totalPages, loading } = useSelector((state: RootState) => state.blog);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    dispatch(fetchBlogPosts(page));
  }, [dispatch, page]);

  return (
    <Box sx={{ width: "100vw" }}>
      <PageBanner title="Blog, News & Insights" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog, News & Insights" }]} />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Typography variant="h4" component="h2" gutterBottom>
              Latest Posts
            </Typography>

            <Grid container spacing={4} sx={{ mt: 2 }}>
              {posts.map((post) => (
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
                    <BlogCard post={post}/>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(value) => setSearchParams({ page: value.toString() })}
                renderItem={(item) => (
                  <PaginationItem component={RouterLink} to={`/blog${item.page === 1 ? "" : `?page=${item.page}`}`} {...item} />
                )}
              />
            </Box>
          </>
        )}

        <Testimonials />
      </Container>
    </Box>
  );
};

export default Blog;
