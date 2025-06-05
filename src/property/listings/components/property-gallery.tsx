
import type React from "react"
import { useState } from "react"
import { Box, IconButton, Modal, Typography } from "@mui/material"
import { ArrowBack, ArrowForward, Close, FullscreenOutlined } from "@mui/icons-material"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleOpen = (index: number) => {
    setCurrentIndex(index)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1 }}>
        <Box
          sx={{
            flex: 2,
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            cursor: "pointer",
            "&:hover .fullscreen-button": {
              opacity: 1,
            },
          }}
          onClick={() => handleOpen(0)}
        >
          <Box
            component="img"
            src={images[0] || "/placeholder.svg?height=400&width=600"}
            alt={`${title} - Main Image`}
            sx={{
              width: "100%",
              height: { xs: 250, md: 400 },
              objectFit: "cover",
            }}
          />
          <IconButton
            className="fullscreen-button"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              opacity: 0,
              transition: "opacity 0.2s",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <FullscreenOutlined />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: { xs: "row", md: "column" }, gap: 1, overflow: "hidden" }}>
          {images.slice(1, 2).map((image, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                "&:hover .fullscreen-button": {
                  opacity: 1,
                },
              }}
              onClick={() => handleOpen(index + 1)}
            >
              <Box
                component="img"
                src={image || "/placeholder.svg?height=200&width=300"}
                alt={`${title} - Image ${index + 1}`}
                sx={{
                  maxWidth:{xs:'50%',md:'100%'},
                  width: "100%",
                  height: { xs: 120, md: 195 },
                  objectFit: "cover",
                }}
              />
               {images.length > 3 && (
              <IconButton
                className="fullscreen-button"
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  opacity: 0,
                  transition: "opacity 0.2s",
                  "&:hover": {
                    bgcolor: "primary.main",
                  },
                }}
              >
                <FullscreenOutlined />
              </IconButton>
               )}
            </Box>
          ))}

          {images.length > 2 && (
            <Box
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                display: { xs: "none", md: "block" },
              }}
              onClick={() => handleOpen(3)}
            >
              <Box
                component="img"
                src={images[2] || "/placeholder.svg?height=200&width=300"}
                alt={`${title} - Image 2`}
                sx={{
                  width: "100%",
                  height: { xs: 120, md: 190 },
                  objectFit: "cover",
                  filter: "brightness(0.7)",
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
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <Typography variant="h6" color="white">
                  Show all {images.length} photos
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "90%",
            maxWidth: 1000,
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              zIndex: 1,
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <Close />
          </IconButton>

          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={images[currentIndex] || "/placeholder.svg?height=600&width=800"}
              alt={`${title} - Image ${currentIndex + 1}`}
              sx={{
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />

            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": {
                  bgcolor: "primary.main",
                },
              }}
            >
              <ArrowBack />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": {
                  bgcolor: "primary.main",
                },
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>

          <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
            {currentIndex + 1} / {images.length}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default PropertyGallery

