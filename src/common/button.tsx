import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { SvgIconComponent } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface CustomButtonItems {
  variant?: "solid" | "outline";
  isLoading?: boolean;
  startIcon?: SvgIconComponent;
  endIcon?: SvgIconComponent;
  href?: string;
  type?: "submit" | "button" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

const CustomButton = ({
  variant = "solid",
  isLoading = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  href,
  type = "submit",
  children,
  disabled = false,
  sx,
  onClick,
}: CustomButtonItems) => {
  const buttonStyles: SxProps<Theme> = {
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 1,
    fontFamily: "Space Grotesk",
    padding: "10px 16px",
    ...(variant === "outline"
      ? { borderColor: "#DDDDDD", color: "inherit" }
      : { backgroundColor: "primary.main", color: "white", 
        '&:hover': {
          bgcolor: '#F29100',
          } }),
    ...sx,
  };

  const buttonContent = isLoading ? (
    <CircularProgress size={24} color="inherit" />
  ) : (
    children
  );

  return href ? (
    <Button
      component={Link}
      to={href}
      variant={variant === "solid" ? "contained" : "outlined"}
      disabled={isLoading || disabled}
      startIcon={!isLoading && StartIcon ? <StartIcon /> : null}
      endIcon={!isLoading && EndIcon ? <EndIcon /> : null}
      sx={buttonStyles}
    >
      {buttonContent}
    </Button>
  ) : (
    <Button
      variant={variant === "solid" ? "contained" : "outlined"}
      disabled={isLoading || disabled}
      onClick={onClick}
      type={type}
      startIcon={!isLoading && StartIcon ? <StartIcon /> : null}
      endIcon={!isLoading && EndIcon ? <EndIcon /> : null}
      sx={buttonStyles}
    >
      {buttonContent}
    </Button>
  );
};

export default CustomButton;
