/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Property } from "./types";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { propertyTypes } from "../constant";
import { LandmarksInput } from "./landmark-input";

interface PropertyFormProps {
  property: Property;
  index: number;
  onUpdate: (index: number, property: Property) => void;
  onRemove: (index: number) => void;
}

//const PROPERTY_TYPES = ['Apartment', 'House', 'Land', 'Commercial'];

export const PropertyForm = ({
  property,
  index,
  onUpdate,
  onRemove,
}: PropertyFormProps) => {
  const handleChange = (field: keyof Property, value: any) => {
    onUpdate(index, { ...property, [field]: value });
  };

  const handleFileChange = (
    field: "propertyDocuments" | "propertyImages",
    files: FileList | null
  ) => {
    if (files) {
      handleChange(field, Array.from(files));
    }
  };

  //   const handleLandmarkChange = (landmarkIndex: number, field: keyof Landmarks, value: string) => {
  //     const newLandmarks = [...(property.landmarks || [])];
  //     newLandmarks[landmarkIndex] = { ...newLandmarks[landmarkIndex], [field]: value };
  //     handleChange('landmarks', newLandmarks);
  //   };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Property {index + 1}</Typography>
        <IconButton onClick={() => onRemove(index)} color="error">
          <DeleteIcon />
        </IconButton>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
           <Typography variant="h6" sx={{ mb: 1, mt:2 }} gutterBottom>
                Property name
                </Typography>
          <TextField
            fullWidth
           placeholder="Property Name"
            value={property.propertyName}
            onChange={(e) => handleChange("propertyName", e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
           <Typography variant="h6" sx={{ mb: 1, mt:2 }} gutterBottom>
                Property type
                </Typography>
          <FormControl fullWidth>
            <Select
              value={property.propertyType}
              onChange={(e) => handleChange("propertyType", e.target.value)}
              required
              displayEmpty
            >
              {propertyTypes.map((opt) => (
                <MenuItem key={opt.value || "placeholder"} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
           <Grid container spacing={2}>
        <Grid item xs={12} sm={6} sx={{marginLeft:3, mt:2}}>
           <LandmarksInput
  landmarks={property.landmarks}
  onChange={(landmarks) => onUpdate(index, { ...property, landmarks })}
  //error={errors[`properties.${index}.landmarks`]}
/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography variant="h6" sx={{ mb: 1, mt:2 }} gutterBottom>
                Location
                </Typography>
          <TextField
            fullWidth
            placeholder="Location"
            value={property.location}
            onChange={(e) => handleChange("location", e.target.value)}
            required
          />
        </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 1, mt:2 }} gutterBottom>
                Property documents<span style={{color:'#FF004F'}}>*</span>
                </Typography>
          <Button
            component="label"
            variant="outlined"
            fullWidth
            //startIcon={<CloudUploadIcon />}
            sx={{
              bgcolor: "white",
              height: 55,
              mb: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <CloudUploadIcon />
            <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
              {" "}
              Upload Documents{" "}
            </Typography>
            <input
              type="file"
              hidden
              multiple
              onChange={(e) =>
                handleFileChange("propertyDocuments", e.target.files)
              }
              required
            />
          </Button>
          {property.propertyDocuments.length > 0 && (
            <Typography variant="caption" display="block">
              {property.propertyDocuments.length} documents selected
            </Typography>
          )}
        </Grid>
        
        <Grid item xs={12}>
           <Typography variant="h6" sx={{ mb: 1, mt:2 }} gutterBottom>
                Property description
                </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
           placeholder=" Property Description"
            value={property.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 1, mt:2 }} gutterBottom>
                Property images<span style={{color:'#FF004F'}}>*</span>
                </Typography>
          <Button
            component="label"
            variant="outlined"
            fullWidth
            //startIcon={<CloudUploadIcon />}
            sx={{
              bgcolor: "white",
              height: 55,
              mb: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <CloudUploadIcon />
            <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
              {" "}
              Upload Images{" "}
            </Typography>
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={(e) =>
                handleFileChange("propertyImages", e.target.files)
              }
            />
          </Button>
          {property.propertyImages.length > 0 && (
            <Typography variant="caption" display="block">
              {property.propertyImages.length} images selected
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
