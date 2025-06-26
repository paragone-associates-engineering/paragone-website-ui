import { Card, CardContent, CardMedia, Skeleton, Box } from "@mui/material"

const ResourceCardSkeleton = () => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <CardMedia>
        <Skeleton variant="rectangular" height={200} />
      </CardMedia>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Skeleton variant="text" height={32} width="80%" sx={{ mb: 1 }} />
        <Skeleton variant="text" height={20} width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="text" height={16} width="100%" sx={{ mb: 1 }} />
        <Skeleton variant="text" height={16} width="90%" sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Skeleton variant="text" height={20} width="40%" />
          <Skeleton variant="text" height={20} width="30%" />
        </Box>

        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Skeleton variant="rounded" height={24} width={60} />
          <Skeleton variant="rounded" height={24} width={80} />
        </Box>

        <Skeleton variant="rectangular" height={40} width="100%" sx={{ borderRadius: 2 }} />
      </CardContent>
    </Card>
  )
}

export default ResourceCardSkeleton
