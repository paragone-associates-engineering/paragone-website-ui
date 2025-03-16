import { Box, Card, CardContent, Typography, CardActions } from '@mui/material';
import {  OutboundOutlined } from '@mui/icons-material';
import CustomButton from './button';
//import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  actionText?: string;
  actionLink?: string;
  actionVariant?:"solid" | "outline";
  elevation?: number;
}

const ServiceCard = ({
  title,
  description,
  imageSrc,
  actionText = 'Learn More',
  actionLink = '#',
  actionVariant = 'solid',      
  elevation = 0,
}: ServiceCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        background:"#fff",
        boxShadow: elevation ? undefined : 'none',
        border: elevation ? 'none' : '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          '& .card-image': {
            transform: 'scale(1.1)',
          },
        },
      }}
      elevation={elevation}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box
          className="card-image"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
            transition: 'transform 0.3s ease',
          }}
        >
          <img
            src={imageSrc}
            alt={title}
            style={{
              width: 80,
              height: 80,
              objectFit: 'cover',
              //borderRadius: '50%',
            }}
          />
        </Box>
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 600,
            mb: 2,
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textAlign: 'center',
            mb: 2,
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
    <CustomButton href={actionLink} variant={actionVariant} endIcon={OutboundOutlined}>{actionText}</CustomButton>
        {/* <Button
          color="primary"
          href={actionLink}
          endIcon={<ArrowForward fontSize="small" />}
          sx={{
            fontWeight: 600,
            '&:hover': {
              bgcolor: 'rgba(255, 193, 7, 0.08)',
            },
          }}
        >
          {actionText}
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
