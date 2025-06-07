//import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";

const formSchema = z.object({
  propertyType: z.string().min(1, "Property type is required"),
  location: z.string().min(1, "Location is required"),
  budget: z.string().optional(),
  familySize: z.string().optional(),
  income: z.string().optional(),
  proximity: z.string().optional(),
  loanAmount: z.string().optional(),
  savings: z.string().optional(),
  lifestyle: z.string().optional(),
  futurePlans: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PropertyFormProps {
  onSubmit: (data: FormValues) => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "",
      location: "",
      budget: "",
      familySize: "",
      income: "",
      proximity: "",
      loanAmount: "",
      savings: "",
      lifestyle: "",
      futurePlans: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="propertyType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select {...field}>
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="duplex">Duplex</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select {...field}>
                  <MenuItem value="lagos">Lagos</MenuItem>
                  <MenuItem value="abuja">Abuja</MenuItem>
                  <MenuItem value="port-harcourt">Port Harcourt</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Budget</InputLabel>
                <Select {...field}>
                  <MenuItem value="low">Below ₦50M</MenuItem>
                  <MenuItem value="medium">₦50M - ₦100M</MenuItem>
                  <MenuItem value="high">Above ₦100M</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="familySize"
            control={control}
            render={({ field }) => (
              <TextField fullWidth label="Family Size" {...field} />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="income"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Income"
                {...field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₦</InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="savings"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Savings"
                {...field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₦</InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Calculate
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PropertyForm;
