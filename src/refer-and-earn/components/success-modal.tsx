import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { CheckCircle, Close } from "@mui/icons-material";
import CustomButton from "../../common/button";

interface ThankYouModalProps {
  open: boolean;
  onClose: () => void;
}

const ThankYouModal = ({ open, onClose }: ThankYouModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 2,
          padding: 2,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey.500",
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <DialogContent sx={{ textAlign: "center", py: 4 }}>
        <CheckCircle
          sx={{
            fontSize: 80,
            color: "success.main",
            mb: 2,
          }}
        />
        
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          Thank You!
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 1, color: "text.secondary" }}>
          Your referral form has been submitted successfully. Kindly check your email to get started
        </Typography>
        
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <CustomButton onClick={onClose} sx={{ px: 6, py: 1 }}>
          Close
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ThankYouModal;