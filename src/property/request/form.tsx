import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, TextField,Select, MenuItem, FormControl, Typography } from "@mui/material";
import { propertyRequestFormSchema } from "../../schema/contact"; 
import { z } from "zod";
import { CustomToggleButton, CustomToggleButtonGroup } from "../../common/toggle-button";
import { API_BASE_URL } from "../../services/api";
import axios from "axios";
import toast from "react-hot-toast";
import CustomButton from "../../common/button";
import { propertyTypes } from "../../constant";

type PropertyRequestFormData = z.infer<typeof propertyRequestFormSchema>;

function RequestForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
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
      reset()
      //console.log('success', data);
    } catch (error) {
      toast.error("Submission failed. Try again!");
      console.log('error', error)
    }
  };

 // console.log('bbb', list)
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

      <Grid container spacing={2}>
        
        <Grid item xs={12} sm={6}>
           <Typography variant='h6' sx={{mb:1}}>First Name</Typography>
          <TextField fullWidth placeholder="First name" {...register("name.first")} error={!!errors.name?.first} helperText={errors.name?.first?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{mb:1}}>Last Name</Typography>
          <TextField fullWidth placeholder="Last name" {...register("name.lastName")} error={!!errors.name?.lastName} helperText={errors.name?.lastName?.message} />
        </Grid>

       
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{mb:1}}>Email</Typography>
          <TextField fullWidth placeholder="Email" type="email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{mb:1}}>Phone number</Typography>
          <TextField fullWidth placeholder="Phone number" {...register("phoneNumber")} error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />
        </Grid>

       
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{mb:1}}>Property Type</Typography>
                          <FormControl fullWidth error={!!errors.propertyType}>
                                                  
                                                  <Controller
                                                    name="propertyType"
                                                    control={control}
                                                    render={({ field }) => (
                                                      <Select {...field} labelId="property-type-label" displayEmpty>
                                                        {propertyTypes.map(opt => (
                                                         <MenuItem key={opt.value || "placeholder"} sx={{display: listingType == 'short-stay' && opt.value === "commercial" ? "none" : "block"}} value={opt.value}>
                                                           {opt.label}
                                                         </MenuItem>
                                                       ))}
                                                      </Select>
                                                    )}
                                                  />
                                                </FormControl>
                                                {errors.propertyType && <Typography color="error">{errors.propertyType.message}</Typography>}
                          </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{mb:1}}>Location</Typography>
                            <TextField
                                                  fullWidth
                                                  placeholder="Location"
                                                  {...register("location")}
                                                  error={!!errors?.location}
                                                  helperText={errors?.location?.message}
                                                />
                                               
                          </Grid>

        
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{mb:1}}>Lowest price</Typography>
  <TextField
    fullWidth
    placeholder="Add Price"
    type="number"
     inputProps={{ min: 0 }}
    {...register("lowestPrice", {
      setValueAs: (value) => (value === "" ? undefined : Number(value)),
    })}
    error={!!errors.lowestPrice}
    helperText={errors.lowestPrice?.message}
  />
</Grid>
<Grid item xs={12} sm={6}>
  <Typography variant='h6' sx={{mb:1}}>Highest price</Typography>
  <TextField
    fullWidth
   placeholder="Add Price"
    type="number"
     inputProps={{ min: 0 }}
    {...register("highestPrice", {
      setValueAs: (value) => (value === "" ? undefined : Number(value)),
    })}
    error={!!errors.highestPrice}
    helperText={errors.highestPrice?.message}
  />
</Grid>

        
        <Grid item xs={12}>
          <Typography variant='h6' sx={{mb:1}}>Contact method</Typography>
          <FormControl fullWidth error={!!errors.contactMethod}>
            
                                                      <Controller
                                                        name="contactMethod"
                                                        control={control}
                                                        render={({ field }) => (
                                                          <Select {...field} labelId="conatct-method-label" displayEmpty>
                                                            <MenuItem value='' disabled>Select Method</MenuItem>
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
          <Typography variant='h6' sx={{mb:1}}>Additional comments</Typography>
          <TextField fullWidth placeholder="Additional Comments" multiline rows={4} {...register("additionalComment")} />
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
