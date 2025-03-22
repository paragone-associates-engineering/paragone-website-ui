import type React from "react"
import { styled } from "@mui/material/styles"
import { ToggleButton as MuiToggleButton, type ToggleButtonProps, ToggleButtonGroup as MuiToggleButtonGroup, type ToggleButtonGroupProps } from "@mui/material"

const StyledToggleButton = styled(MuiToggleButton)(({ theme }) => ({

  textTransform: "none",
  fontWeight: 500,
  borderRadius: 4,
  whiteSpace:'nowrap',
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },

  // Selected state styles
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },

  // Disabled state styles
  "&.Mui-disabled": {
    color: theme.palette.text.disabled,
    backgroundColor: theme.palette.action.disabledBackground,
  },
}))


const StyledToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({

  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&:not(:first-of-type)": {
      borderRadius: 4,
    },
    "&:first-of-type": {
      borderRadius: 4,
    },
  },
}))


export const CustomToggleButtonGroup: React.FC<ToggleButtonGroupProps> = (props) => {
  return <StyledToggleButtonGroup {...props} />
}


export const CustomToggleButton: React.FC<ToggleButtonProps> = (props) => {
  return <StyledToggleButton {...props} />
}



