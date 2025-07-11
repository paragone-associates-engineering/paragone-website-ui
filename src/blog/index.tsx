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
  Pagination,
  PaginationItem,
  styled,
} from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { PageBanner } from "../common/banner/page-banner";
import Testimonials from "../common/testimonial";
import { BlogCard } from "../common/blog-card";
import Empty from "../common/empty";
import { format } from "date-fns"
import { AnimatedWrapper } from "../common/animations/animated-wrapper";
import Loader from "../common/loader";
import { Helmet } from "react-helmet-async";

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
const Blog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, totalPages, loading } = useSelector((state: RootState) => state.blog);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
      if (page > 1) {
      searchParams.set("page", page.toString())
    }
    else {
      searchParams.delete("page")
    }
    dispatch(fetchBlogPosts(page));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);
 const heroBlog = posts?.length > 0 ? posts[0] : undefined;
 const formatDate =
   heroBlog && "datePosted" in heroBlog && heroBlog.datePosted
     ? format(new Date(heroBlog.datePosted), "yyyy MMMM dd")
     : "";

  return (
     <>
         <Helmet>
                         <title>Blog, News & Insights | Paragone Signature & Associates</title>
                      <meta name="description" content='Paragone Signature is a property management, investment, and development company, offering end-to-end services along the real estate value chain, from management to joint-venture investments.' />
                       </Helmet>
    <Box sx={{ width: "100vw" }}>
      <PageBanner title="Blog, News & Insights" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog, News & Insights" }]} />
 {posts?.length > 0 && (
 <Container maxWidth="lg" sx={{ py: 6 }}>
  <Grid container spacing={6} alignItems="flex-start">
    <Grid item xs={12} md={6}>
      <AnimatedWrapper animation='slideLeft'>
        <Box
          component="img"
          src={heroBlog && typeof heroBlog !== "boolean" && heroBlog.images?.[0] || "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741897467/luca-bravo-ujhKqutt3f0-unsplash_2_je4yff.png"}
          alt="Modern workspace desk with laptop and mouse"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: 2,
            maxHeight: 280,
            objectFit: 'cover',
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        />
      </AnimatedWrapper>
    </Grid>
    <Grid item xs={12} md={6}>
      <AnimatedWrapper>
        <Typography variant="subtitle1" fontWeight={400} fontSize={12} gutterBottom>
          {formatDate}
        </Typography>
        {heroBlog && typeof heroBlog !== "boolean" && (
          <>
            <Box
              dangerouslySetInnerHTML={{
                __html:
                  heroBlog.content.length > 500
                    ? heroBlog.content.slice(0, 500) + "..."
                    : heroBlog.content,
              }}
              sx={{
                "& p": {
                  my: 1.5,
                  lineHeight: 1.7,
                  textAlign: "justify",
                },
              }}
            />
            {heroBlog.content.length > 500 && (
              <Box mt={2}>
                <Typography
                  component={RouterLink}
                  to={`/blog/${heroBlog.id}`}
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 600,
                    "&:hover": { textDecoration: "underline" },
                    cursor: "pointer",
                  }}
                >
                  Read more
                </Typography>
              </Box>
            )}
          </>
        )}
      </AnimatedWrapper>
    </Grid>
  </Grid>
</Container>
          )}
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {loading ? (
          <Loader/>
        ) : (
          <>
            <Typography variant="h3" fontWeight={700} component="h2" gutterBottom>
              Latest Posts
            </Typography>
{posts?.length === 0 && (
 <Empty text="No Blog Post Yet. Please Check Back."/>
)}
            <Grid container spacing={2} sx={{ mt: 2 }}>
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
{posts.length > 10 && (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <StyledPagination
                count={totalPages}
                page={page}
                onChange={(value) => setSearchParams({ page: value.toString() })}
                renderItem={(item) => (
                  <PaginationItem component={RouterLink} to={`/blog${item.page === 1 ? "" : `?page=${item.page}`}`} {...item} />
                )}
              />
            </Box>
)}
          </>
        )}

        <Testimonials />
      </Container>
    </Box>
    </>
  );
};

export default Blog;
