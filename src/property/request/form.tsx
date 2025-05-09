import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, TextField,Select, InputLabel, MenuItem, FormControl, Typography } from "@mui/material";
//import { propertyTypes, locations, contactMethods } from "../data";
import { propertyRequestFormSchema } from "../../schema/contact"; 
import { z } from "zod";
import { CustomToggleButton, CustomToggleButtonGroup } from "../../common/toggle-button";
import { API_BASE_URL } from "../../services/api";
import axios from "axios";
import toast from "react-hot-toast";
import CustomButton from "../../common/button";

type PropertyRequestFormData = z.infer<typeof propertyRequestFormSchema>;

function RequestForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PropertyRequestFormData>({
    resolver: zodResolver(propertyRequestFormSchema),
    defaultValues: {
      name: { first: "", lastName: "" },
      email: "",
      phoneNumber: "",
      propertyType: "",
      additionalComment: "",
      location:"",
      contactMethod:"Any",
      listingType:"buy"
      
    },
  });

  const listingType = watch("listingType") || 'buy';

  const handleListingTypeChange = (_: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue) setValue("listingType", newValue as "buy" | "rent" | "short-stay", { shouldValidate: true });
  };

  const onSubmit = async (data: PropertyRequestFormData) => {
    try {
      await axios.post(`${API_BASE_URL}/form/property-request`, data);
      toast.success("Form submitted successfully!");
      console.log('success', data);
    } catch (error) {
      toast.error("Submission failed. Try again!");
      console.log('error', error)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
     
      <Box sx={{ mb: 3 }}>
        <CustomToggleButtonGroup
          value={listingType}
          exclusive
          onChange={handleListingTypeChange}
          aria-label="property purpose"
          fullWidth
        >
          <CustomToggleButton value="buy" aria-label="buy property">
            Buy
          </CustomToggleButton>
          <CustomToggleButton value="rent" aria-label="rent property">
            Rent
          </CustomToggleButton>
          <CustomToggleButton value="short-stay" aria-label="short stay">
            Short stay
          </CustomToggleButton>
        </CustomToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="First name" {...register("name.first")} error={!!errors.name?.first} helperText={errors.name?.first?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Last name" {...register("name.lastName")} error={!!errors.name?.lastName} helperText={errors.name?.lastName?.message} />
        </Grid>

       
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Email" type="email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Phone number" {...register("phoneNumber")} error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />
        </Grid>

       
        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth error={!!errors.propertyType}>
                                                  <InputLabel id="property-type-label" sx={{backgroundColor: 'white'}}>Property Type</InputLabel>
                                                  <Controller
                                                    name="propertyType"
                                                    control={control}
                                                    render={({ field }) => (
                                                      <Select {...field} labelId="property-type-label">
                                                        <MenuItem value="residential">Residential</MenuItem>
                                <MenuItem value="commercial">Commercial</MenuItem>
                                <MenuItem value="mixed-use">Mixed-use</MenuItem>
                                <MenuItem value="industrial">Industrial</MenuItem>
                                                      </Select>
                                                    )}
                                                  />
                                                </FormControl>
                                                {errors.propertyType && <Typography color="error">{errors.propertyType.message}</Typography>}
                          </Grid>
        
        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={!!errors.location}>
                                                  <InputLabel id="location-label" sx={{backgroundColor: 'white'}}>Location</InputLabel>
                                                  <Controller
                                                    name="location"
                                                    control={control}
                                                    render={({ field }) => (
                                                      <Select {...field} labelId="location-label">
                                                        <MenuItem value="lagos">Lagos</MenuItem>
                                <MenuItem value="abuja">Abuja</MenuItem>
                                <MenuItem value="ph">Port Harcourt</MenuItem>
                                <MenuItem value="ibadan">Ibadan</MenuItem>
                                                      </Select>
                                                    )}
                                                  />
                                                </FormControl>
                                                {errors.location && <Typography color="error">{errors.location.message}</Typography>}
                          </Grid>

        
        <Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="Lowest Price"
    type="number"
    {...register("lowestPrice", {
      setValueAs: (value) => (value === "" ? undefined : Number(value)),
    })}
    error={!!errors.lowestPrice}
    helperText={errors.lowestPrice?.message}
  />
</Grid>
<Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="Highest Price"
    type="number"
    {...register("highestPrice", {
      setValueAs: (value) => (value === "" ? undefined : Number(value)),
    })}
    error={!!errors.highestPrice}
    helperText={errors.highestPrice?.message}
  />
</Grid>

        
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.contactMethod}>
            <InputLabel id="address-label" sx={{backgroundColor: 'white'}}>Contact Method</InputLabel>
                                                      <Controller
                                                        name="contactMethod"
                                                        control={control}
                                                        render={({ field }) => (
                                                          <Select {...field} labelId="conatct-method-label">
                                                            <MenuItem value="Any">Any</MenuItem>
                                    <MenuItem value="email">Email</MenuItem>
                                    <MenuItem value="phone">Phone</MenuItem>
                                    <MenuItem value="whatsapp">WhatsApp</MenuItem>
                                                          </Select>
                                                        )}
                                                      />
                                                    </FormControl>
                                                    {errors.contactMethod && <Typography color="error">{errors.contactMethod.message}</Typography>}
          
        </Grid>

     
        <Grid item xs={12}>
          <TextField fullWidth label="Additional Comments" multiline rows={4} {...register("additionalComment")} />
        </Grid>

       
        <Grid item xs={12}>
          <CustomButton isLoading={isSubmitting} sx={{width:'100%'}}>
            Send Request
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
}

export default RequestForm;
