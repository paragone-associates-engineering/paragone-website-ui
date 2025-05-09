
import { useEffect } from "react";
import { Container, Typography, Box, Grid, IconButton } from "@mui/material"
import { Link as RouterLink, useParams } from "react-router-dom"
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material"
import { format } from "date-fns";
import { PageBanner } from '../common/banner/page-banner';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBlogPostDetails } from "../redux/slices/blog-slice";

const BlogDetail = () => {

  const { postId } = useParams<{ postId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { posts, postDetails, loading } = useSelector((state: RootState) => state.blog);
  const postUrl = encodeURIComponent(`https://paragonesignature.netlify.app/blog/${postId}`);

  useEffect(() => {
    if (postId) dispatch(fetchBlogPostDetails(postId));
  }, [dispatch, postId]);

  if (loading) return <Typography>Loading...</Typography>;

  const formatDate = postDetails?.datePosted
    ? format(new Date(postDetails.datePosted), "yyyy MMMM dd") 
    : "Date unavailable";


  const relatedPosts = posts
    // ?.filter((post) => post?.id !== postId)
    ?.slice(0, 5); 
//console.log(posts)
 
  return (
    <Box sx={{width:'100vw'}}>
         <PageBanner title='Blog' breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog", href:'/blog' }, { label:"Details"}]}    />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="overline" color="text.secondary">
              {formatDate}
            </Typography>

            <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 1 }}>
              {postDetails?.title}
            </Typography>

            <Box
              component="img"
              src={postDetails?.images[0]}
              alt={postDetails?.title}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                my: 3,
              }}
            />

            {postDetails?.content && (
              <Box
                dangerouslySetInnerHTML={{ __html: postDetails.content }}
                sx={{
                  "& p": {
                    mb: 2,
                    lineHeight: 1.7,
                  },
                }}
              />
            )}

<Box sx={{ mt: 4, display: "flex", alignItems: "center" }}>
  <Typography variant="body2" sx={{ mr: 2 }}>
    Share post:
  </Typography>

  <IconButton
    aria-label="share on facebook"
    size="small"
    component="a"
    href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Facebook />
  </IconButton>

  <IconButton
    aria-label="share on twitter"
    size="small"
    component="a"
    href={`https://twitter.com/intent/tweet?url=${postUrl}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Twitter />
  </IconButton>

  <IconButton
    aria-label="share on linkedin"
    size="small"
    component="a"
    href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <LinkedIn />
  </IconButton>
</Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: 20 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                More Insights For You
              </Typography>

              <Box sx={{ mt: 3 }}>
                {relatedPosts.map((post) => (
                  <Box
                    key={post.id}
                    component={RouterLink}
                    to={`/blog/${post.id}`}
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                      "&:hover": {
                        "& h3": {
                          color: "primary.main",
                        },
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={post?.images[0]}
                      alt={post.title}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 1,
                        objectFit: "cover",
                        mr: 2,
                      }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {/* {formatDate} */}
                      </Typography>
                      <Typography variant="subtitle2" component="h3" sx={{ transition: "color 0.3s ease" }}>
                        {post.title}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default BlogDetail

