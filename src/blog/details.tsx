
import { useEffect } from "react"
import { Container, Typography, Box, Grid, IconButton, useTheme, useMediaQuery } from "@mui/material"
import { Link as RouterLink, useParams } from "react-router-dom"
import { Facebook, LinkedIn, Instagram } from "@mui/icons-material"
import { format } from "date-fns"
import { PageBanner } from "../common/banner/page-banner"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { fetchBlogPostDetails } from "../redux/slices/blog-slice"
import { Helmet } from "react-helmet-async"
import Loader from "../common/loader"

const BlogDetail = () => {
  const { postId } = useParams<{ postId: string }>()
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.up("md"))
  const dispatch = useDispatch<AppDispatch>()
  const { posts, postDetails, loading } = useSelector((state: RootState) => state.blog)
  const postUrl = encodeURIComponent(`https://www.paragonesignature.com/blog/${postId}`)

  useEffect(() => {
    if (postId) dispatch(fetchBlogPostDetails(postId))
  }, [dispatch, postId])

  if (loading) return <Loader/>

  const formatDate = postDetails?.datePosted
    ? format(new Date(postDetails.datePosted), "yyyy MMMM dd")
    : "Date unavailable"

    interface GetPlainTextFromHTML {
      (html: string): string
    }

    const getPlainTextFromHTML: GetPlainTextFromHTML = (html) => {
      if (!html) return ""
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = html
      return tempDiv.textContent || tempDiv.innerText || ""
    }

  const metaDescription = postDetails?.content 
    ? getPlainTextFromHTML(postDetails.content).slice(0, 160) + "..."
    : "Read this insightful blog post from Paragone Signature."
  const relatedPosts = posts?.slice(0, 5)
  const hasRelatedPosts = relatedPosts && relatedPosts.length > 0

  return (
    <Box sx={{ width: "100vw" }}>
      {postDetails && (
        <Helmet>
          <title>{postDetails.title} | Paragone Signature Blog</title>
          <meta name="description" content={metaDescription} />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={postUrl} />
          <meta property="og:title" content={postDetails.title} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:image" content={postDetails.images?.[0]} />
          <meta property="og:site_name" content="Paragone Signature & Associates" />
          
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={postUrl} />
          <meta property="twitter:title" content={postDetails.title} />
          <meta property="twitter:description" content={metaDescription} />
          <meta property="twitter:image" content={postDetails.images?.[0]} />
          
          {/* LinkedIn */}
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          
          {/* Additional meta tags */}
          <meta name="author" content="Paragone Signature & Associates" />
          <meta property="article:published_time" content={postDetails.datePosted} />
        </Helmet>
      )}
      <PageBanner
        title={postDetails?.title || "Blog, News & Insights"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog, News & Insights", href: "/blog" },
          { label: `${postDetails?.title}` },
        ]}
      />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={hasRelatedPosts ? 9 : 12}>
            <Typography variant="overline" color="text.secondary">
              {formatDate}
            </Typography>

            <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 1,fontWeight:700, borderBottom:'1px solid #DDDDDD', pb:1 }}>
              {postDetails?.title}
            </Typography>

            <Box sx={{ mt: 5 }}>
              {postDetails?.content && (
                <Box
                  sx={{
                    position: 'relative',
                    "& p": {
                      my: 2,
                      lineHeight: 1.7,
                      textAlign: "justify",
                    },
                    "& p:first-of-type": {
                      mt: 0,
                    },
                  }}
                >
                 
                  <Box
                    component="img"
                    src={postDetails?.images[0]}
                    alt={postDetails?.title}
                    sx={{
                      width: "100%",
                      height: "auto",
                      maxHeight:'auto',
                      borderRadius: 2,
                      objectFit: "contain",
                      objectPosition: 'top',
                      mb: 2,
                      ...(medium && {
                        width: "45%",
                        maxWidth: "400px",
                        float: "left",
                        mr: 3,
                        mb: 2,
                      }),
                    }}
                    />
                      
                    
                  <Box
                    dangerouslySetInnerHTML={{ __html: postDetails?.content }}
                    sx={{
                      "& p": {
                        my: 1.5,
                        lineHeight: 1.7,
                        textAlign: "justify",
                      },
                       "& h2": {
                        my: 1.5,
                        lineHeight: 1.2,
                        fontSize:{xs:20, md:24},
                        textAlign: "justify",
                      },
                      "& li": {
                        mx: 1.5,
                        mt:1,
                        lineHeight: 1.2,
                      },
                      "& p:first-of-type": {
                        mt: 0,
                      },
                     px:1.3,
                      "&::after": {
                        content: '""',
                        display: "table",
                        clear: "both",
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

            <Box sx={{ mt: 4, display: "flex", alignItems: "center", clear: "both", px:2 }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                Follow us on:
              </Typography>

              <IconButton
                aria-label="share on facebook"
                size="small"
                component="a"
                href="https://www.facebook.com/paragonesignature?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook />
              </IconButton>
 <IconButton
                aria-label="share on instagram"
                size="small"
                component="a"
                href="https://www.instagram.com/paragonesignatureltd?igsh=MWc2bXBjczNveHF5eg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram/>
              </IconButton>
              <IconButton
                aria-label="share on linkedin"
                size="small"
                component="a"
                href="https://www.linkedin.com/company/paragone-signature-associates/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {hasRelatedPosts && (
            <Grid item xs={12} md={3}>
              <Box sx={{ position: "sticky", top: 20 }}>
                <Typography variant="h6" fontSize={18} fontWeight={700} sx={{borderBottom:'1px solid #DDDDDD', pb:1, mt:5}} component="h2" gutterBottom>
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
                          objectPosition: 'top',
                          borderRadius: 1,
                          objectFit: "contain",
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
          )}
        </Grid>
      </Container>
    </Box>
  )
}

export default BlogDetail
