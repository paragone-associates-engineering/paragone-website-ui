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
    <Box sx={{ position: "relative" }}>
      <img src={post.images[0]} alt={post.title} style={{ width: "100%", borderRadius: "10px",height:240, objectFit:'cover' }} />
      
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: 200,
          right: 20,
          backgroundColor: "white",
          borderRadius: 2,
          textAlign: "center",
          px: 2,
          py:0.5,
          minWidth: 50,
          
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Typography variant="body2">{formattedMonth}</Typography>
        <Typography variant="h5" color="primary" fontWeight="bold">{formattedDay}</Typography>
      </Paper>

      <Typography variant="body1" color="primary" sx={{ mt: 2, fontSize:'14px', fontWeight: "medium", textTransform:"capitalize" }}>
        {post.header}
      </Typography>
      <Typography variant="h5" color="text.main" fontSize='20px' fontWeight={700}>{post.title}</Typography>
    </Box>
  );
};
