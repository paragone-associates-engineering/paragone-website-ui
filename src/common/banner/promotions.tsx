
import { useEffect, useMemo } from "react"
import { Box, Typography, Skeleton, useTheme, useMediaQuery } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks"
import { fetchAds } from "../../redux/slices/ads-slice"

import "swiper/swiper-bundle.css"


interface PromotionBannersProps {
  location: "top" | "bottom"
  autoplayDelay?: number
  variant?: "standard" | "large" | "compact"
}

const PromotionBanners = ({ location, autoplayDelay = 5000, variant = "standard" }: PromotionBannersProps) => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down("sm"))
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"))

  const dispatch = useAppDispatch()
  const { ads, loading, error } = useAppSelector((state) => state.ads || { ads: [], loading: false, error: null })

  // Improved responsive banner heights
  const getBannerHeight = () => {
    switch (variant) {
      case "large":
        if (isXs) return 220
        if (isSm) return 260
        if (isMd) return 300
        return 350
      case "compact":
        if (isXs) return 140
        if (isSm) return 160
        if (isMd) return 180
        return 200
      case "standard":
      default:
        if (isXs) return 180
        if (isSm) return 220
        if (isMd) return 260
        return 300
    }
  }

  const bannerHeight = getBannerHeight()

  // Get responsive slides per view
  const getSlidesPerView = () => {
    if (isXs) return 1
    if (isSm) return 1.2
    if (isMd) return 1.5
    return 2
  }

  const slidesPerView = getSlidesPerView()

  useEffect(() => {
      dispatch(fetchAds())
  }, [dispatch])

  // Divide ads between top and bottom locations
  const { topAds, bottomAds } = useMemo(() => {
    if (!ads || ads.length === 0) {
      return { topAds: [], bottomAds: [] }
    }

    const midPoint = Math.ceil(ads.length / 2)
    return {
      topAds: ads.slice(0, midPoint),
      bottomAds: ads.slice(midPoint),
    }
  }, [ads])

  const displayAds = location === "top" ? topAds : bottomAds

  if (error) {
    console.error("Ads error:", error)
    return null
  }

  if (loading) {
    return (
      <Box sx={{ mt: 5 }}>
        <Swiper spaceBetween={20} slidesPerView={slidesPerView} style={{ height: bannerHeight }}>
          {[1, 2].map((item) => (
            <SwiperSlide key={`skeleton-${item}`}>
              <Skeleton variant="rectangular" width="100%" height={bannerHeight} sx={{ borderRadius: 2 }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    )
  }

  if (!displayAds || displayAds.length === 0) {
    return null
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        centeredSlides={displayAds.length === 1}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={displayAds.length > 1}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          600: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        style={{
          height: bannerHeight,
          paddingBottom: "40px",
        }}
      >
        {displayAds.map((ad) => (
          <SwiperSlide key={ad.id}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                height: bannerHeight,
                backgroundColor: "grey.100",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <Box
                component="img"
                src={ad.image}
                alt={ad.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                }}
              />
              {ad.title && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 1.5, sm: 2, md: 2.5 },
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                  }}
                >
                  <Typography
                    variant={isXs ? "body2" : isSm ? "body1" : "subtitle1"}
                    color="white"
                    fontWeight="bold"
                    textTransform="capitalize"
                    sx={{
                      textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                    }}
                  >
                    {ad.title}
                  </Typography>
                </Box>
              )}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default PromotionBanners
