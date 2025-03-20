import { PaletteOptions } from "@mui/material/styles";

const palette: PaletteOptions = {
  primary: {
    main: "#FFB000", 
  },
  secondary: {
    main: "#EFF3F5",
  },
  background: {
    default: "#fff",
    paper: "#fff",
  },
  text: {
    primary: "#333",
    secondary: "#666",
  },
  custom: {
    border: "#ddd", 
  },
} as PaletteOptions & { custom: { border: string } }; 

export default palette;
