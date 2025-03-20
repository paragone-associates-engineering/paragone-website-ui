"use client"

import { Container, Typography, Box, Grid, IconButton } from "@mui/material"
import { Link as RouterLink, useParams } from "react-router-dom"
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material"
import { formatDate } from "./utils"
import { PageBanner } from '../common/banner/page-banner';

interface BlogPost {
  id: string
  title: string
  date: string
  content: string
  image: string
  author?: string
}

interface RelatedPost {
  id: string
  title: string
  date: string
  image: string
}

const BlogDetail = () => {

  const { postId } = useParams<{ postId: string }>()

  
  const blogPost: BlogPost = {
    id: postId || "default-post",
    title: "Ex qui dolor commodo occaecat est vuptate",
    date: "2024-03-14",
    content: `
      <p>Since its launch on 2/13/24, OpenAI's new generative video tool, Sora, has been making waves. In the AI community and beyond, people have been stunned by the cinematic quality, realism, "camera" angles, and movement that Sora is capable of. AI's vulnerability to "hallucinations" means the details are not yet perfect, but it won't be long before the average consumer isn't able to tell the difference between AI and reality on their screen. This is going to make for a wild ride, sharing their art with the world. What's possible when people can communicate visually what previously only existed in their heads.</p>
      
      <p>Right now, the loudest concerns about Sora are coming from the entertainment industry.</p>
      
      <p>Tyler Perry, for instance, has indefinitely paused an $800M project to expand his Atlanta, GA film studio due to Sora's release. He was so stunned at the quality of Sora's videos, that he expects he will no longer need to build or travel to locations for filming in the near future. While that appears to him as a business owner, as an actor and filmmaker, he is deeply concerned for the film industry, stating, "Jobs are going to be lost." And while it's true that some industries will be forever changed, and some jobs will be rendered unnecessary, there will also be an abundance of creation, and the opportunity to tell stories in new ways, as well as access to new paradigms that will benefit us all in incredible, unimaginable ways.</p>
      
      <p>Picture this—every storyteller, every unknown creator out there without access to a film studio, suddenly armed with a tool like Sora to bring their visions to life, sharing their art with the world. What's possible when people can communicate visually what previously only existed in their heads using text-based prompts is a complete game-changer! Disruption can certainly hurt, but it can also create innovation. For instance, the audience for foreign language films was small. Now, things like real-time language translation and lip-syncing are making foreign films more accessible. Sometimes, what's thought of as a barrier, like a language barrier, can still be a net positive for the world, sharing their art with the world. What's possible when people can communicate visually what previously only existed in their heads.</p>
      
      <p>Take real estate, for example. While AI can't currently generate a video tour of an existing home, it can help bring imagination to life in renderings of new homes. As the CEO of a company with a media arm, I'm also interested in AI's ability to generate b-roll and background imagery to minimize the need for extra hours and effort spent shooting on location. And for an everyday real estate agent, when Sora is coupled with script generation using programs like ChatGPT or Claude, creating a video tour of a home that doesn't exist yet is possible. Suddenly, what's traditionally been a time-consuming, hours-to-shoot task, could potentially soon be done in a matter of minutes. In the real estate industry, our lives have become overrun by endless tools demanding we keep our focus on screens rather than in the field with clients and communities where our efforts are best spent.</p>
      
      <p>Of course, we can't ignore that as a society, we face numerous vulnerabilities resulting from AI. Biases embedded in the models are a given, deepfake content is capable of defaming people and unfairly influencing public opinion, and there is no established method to spot real content from AI-generated materials.</p>
      
      <p>But here's the thing: AI has no point of view or understanding of context; it's us, together, who are generating the data it depends upon to reason. We are the operators and have the collective responsibility to harness AI for good, and I see a million ways that we can do that. As the CEO of a company that is innovating in the AI space, our values are baked into every decision we make. We disrupt for good, never losing sight of the people and communities around us. We create for tomorrow, bringing the future to today. We amplify together in order to succeed together. We are, and will always be, relentless in pursuit of reaching goals as tenacious seekers of knowledge, sharing their art with the world. What's possible when people can communicate visually what previously only existed in their heads.</p>
    `,
    image: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741276751/Copy_of_SPH_5744_1_hybb4f.png",
  }

 
  const relatedPosts: RelatedPost[] = [
    {
      id: "related-1",
      title: "It is a long established fact that a reader will be distracted by the",
      date: "2024-03-14",
      image: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741899944/Copy_of_SPH_5767_1_mabgwv.png",
    },
    {
      id: "related-2",
      title: "It is a long established fact that a reader will be distracted by the",
      date: "2024-03-14",
      image: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741276755/Copy_of_SPH_5818_1_aztbzk.png",
    },
    {
      id: "related-3",
      title: "It is a long established fact that a reader will be distracted by the",
      date: "2024-03-14",
      image: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741899900/SPH_1010_1_nasenh.png",
    },
    {
      id: "related-4",
      title: "It is a long established fact that a reader will be distracted by the",
      date: "2024-03-14",
      image: "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741899893/Copy_of_Copy_of_SPH_4798_1_vwbn1u.png",
    },
  ]

  return (
    <Box sx={{width:'100vw'}}>
         <PageBanner title='Blog' currentPage="Blog" />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="overline" color="text.secondary">
              {formatDate(blogPost.date, "YYYY MMMM DD, YYYY")}
            </Typography>

            <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 1 }}>
              {blogPost.title}
            </Typography>

            <Box
              component="img"
              src={blogPost.image}
              alt={blogPost.title}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                my: 3,
              }}
            />

            <Box
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
              sx={{
                "& p": {
                  mb: 2,
                  lineHeight: 1.7,
                },
              }}
            />

            <Box sx={{ mt: 4, display: "flex", alignItems: "center" }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                Share post:
              </Typography>
              <IconButton aria-label="share on facebook" size="small">
                <Facebook />
              </IconButton>
              <IconButton aria-label="share on twitter" size="small">
                <Twitter />
              </IconButton>
              <IconButton aria-label="share on linkedin" size="small">
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
                      src={post.image}
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
                        {formatDate(post.date, "YYYY MMMM DD, YYYY")}
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

