
import { Dialog, DialogContent, Typography, Button, Box } from "@mui/material"
import { CheckCircle as CheckIcon, Email as EmailIcon } from "@mui/icons-material"

interface SuccessModalProps {
  open: boolean
  onClose: () => void
  resourceTitle: string
  userEmail: string
}

const SuccessModal = ({ open, onClose, resourceTitle, userEmail }: SuccessModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogContent sx={{ textAlign: "center", py: 4 }}>
        <CheckIcon sx={{ fontSize: 80, color: "success.main", mb: 3 }} />

        <Typography variant="h4" gutterBottom fontWeight={700} color="success.main">
          Request Submitted Successfully!
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          {resourceTitle}
        </Typography>

        <Box
          sx={{
            bgcolor: "grey.50",
            borderRadius: 2,
            p: 3,
            mb: 3,
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 2 }}>
            <EmailIcon color="primary" />
            <Typography variant="subtitle1" fontWeight={600}>
              Check Your Email
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            We've sent the resource download link to:
          </Typography>
          <Typography variant="body1" fontWeight={600} color="primary.main">
            {userEmail}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
          The download link will be delivered to your email within the next few minutes. Please check your spam folder
          if you don't see it in your inbox.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Browse More Resources
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessModal
