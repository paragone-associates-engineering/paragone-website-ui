import {
  Box,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
//import { ManagementFormData } from "../types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {managementFormSchema,ManagementFormSchema} from "../../schema/contact";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../services/api";
import CustomButton from "../../common/button";
import { propertyTypes } from "../../constant";
const PropertyManagementForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ManagementFormSchema>({
    resolver: zodResolver(managementFormSchema),
    defaultValues: {
      name: { first: "", lastName: "" },
      email: "",
      phoneNumber: "",
      propertyType: "",
      additionalComment: "",
      propertyLocation: "",
      // contactMethod: "Any",
      // contactTime: new Date().toISOString(),
      // sellDate: new Date().toISOString(),
    },
  });

  const onSubmit = async (data: ManagementFormSchema) => {
    try {
      await axios.post(`${API_BASE_URL}/form/create-property-management`, data);
      toast.success("Form submitted successfully!");
      reset();
      //console.log('suscess', data);
    } catch (error) {
      toast.error("Submission failed. Try again!");
      console.log("error", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={1.5}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{mb:1}}>First name</Typography>
          <TextField
            fullWidth
            placeholder="First name"
            {...register("name.first")}
            error={!!errors.name?.first}
            helperText={errors.name?.first?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{mb:1}}>Last name</Typography>
          <TextField
            fullWidth
            placeholder="Last name"
            {...register("name.lastName")}
            error={!!errors.name?.lastName}
            helperText={errors.name?.lastName?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{mb:1}}>Email address</Typography>
          <TextField
            fullWidth
           placeholder="Email address"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{mb:1}}>Phone number</Typography>
          <TextField
            fullWidth
            placeholder="Phone number"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{mb:1}}>Property type</Typography>
          <FormControl fullWidth error={!!errors.propertyType}>
            
            <Controller
              name="propertyType"
              control={control}
              render={({ field }) => (
                <Select {...field} labelId="property-type-label" displayEmpty>
                  {propertyTypes.map((opt) => (
                    <MenuItem
                      key={opt.value || "placeholder"}
                      value={opt.value}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          {errors.propertyType && (
            <Typography color="error">{errors.propertyType.message}</Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{mb:1}}>Property location</Typography>
          <TextField
            fullWidth
            placeholder="Location"
            {...register("propertyLocation")}
            error={!!errors?.propertyLocation}
            helperText={errors?.propertyLocation?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' sx={{mb:1}}>Additional comments</Typography>
          <TextField
            fullWidth
            //name="message"
            multiline
            rows={4}
            {...register("additionalComment")}
            error={!!errors.additionalComment}
            helperText={errors.additionalComment?.message}
            placeholder="Write your message here"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomButton isLoading={isSubmitting} sx={{ width: 150 }}>
            Send Message
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyManagementForm;
