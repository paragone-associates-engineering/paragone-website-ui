import { BlogPost } from "../redux/slices/blog-slice";
import { Box, Typography, Paper } from "@mui/material";
import { format } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const postDate = new Date(post.datePosted);
  const formattedMonth = format(postDate, "MMM"); 
  const formattedDay = format(postDate, "dd"); 

  return (
    <Box 
      sx={{ 
        position: "relative",
       // height: 600, 
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ position: "relative", height:'300px', flex: '0 0 auto' }}>
        <img 
          src={post.images[0]} 
          alt={post.title} 
          style={{ 
            width: "100%", 
            borderRadius: "10px",
            height:'100%',
            objectFit:'cover',
            objectPosition: 'top'
          }} 
        />
        
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: 250, 
            right: 20,
            backgroundColor: "white",
            borderRadius: 2,
            textAlign: "center",
            px: 2,
            py: 0.5,
            minWidth: 50,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
          }}
        >
          <Typography variant="body2">{formattedMonth}</Typography>
          <Typography variant="h5" color="primary" fontWeight="bold">{formattedDay}</Typography>
        </Paper>
      </Box>

     
      <Box sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', mt: 2, minHeight: 0 }}>
        <Typography 
          variant="body1" 
          color="primary" 
          sx={{ 
            fontSize:'14px', 
            fontWeight: "medium", 
            textTransform:"capitalize",  
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: '0 0 auto',
            //height: '2.5em', 
            lineHeight: 1.4
          }}
        >
          {post.header}
        </Typography>
        
       <Typography 
  variant="h5" 
  color="text.main" 
  fontSize='20px' 
  fontWeight={700} 
  sx={{ 
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1.5,
    maxHeight: '3em',
    mt: 0
  }}
>
  {post.title.length > 60 ? post.title.substring(0, 60) + '...' : post.title}
</Typography>
      </Box>
    </Box>
  );
};