import type React from "react"
import { useState } from "react"
import { Box, Typography, IconButton } from "@mui/material"
import { PlayCircle } from "@mui/icons-material"

interface PropertyVideoProps {
  videoUrl: string
  thumbnailUrl?: string
}

const PropertyVideo: React.FC<PropertyVideoProps> = ({ videoUrl, thumbnailUrl }) => {
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    setPlaying(true)
  }

  const getEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/)
    const videoId = match?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : ""
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Video
      </Typography>

      <Box sx={{ position: "relative", borderRadius: 2, overflow: "hidden", mb: 4 }}>
        {playing ? (
          <Box
            component="iframe"
            src={getEmbedUrl(videoUrl)}
            title="Property video"
            sx={{ 
              width: "100%",
              height: { xs: 315, md: 500 },
              border: "1px solide #ddd",
              borderRadius:3,
              aspectRatio: "16/9" 
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={thumbnailUrl || "/placeholder.svg?height=400&width=600"}
              alt="Video thumbnail"
              sx={{
                width: "100%",
                height: { xs: 240, md: 400 },
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.3)",
              }}
            >
              <IconButton
                onClick={handlePlay}
                sx={{
                  color: "white",
                  "& svg": {
                    fontSize: { xs: 60, md: 80 },
                  },
                }}
              >
                <PlayCircle />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default PropertyVideo