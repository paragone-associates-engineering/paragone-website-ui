import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
//import { ManagementFormData } from "../types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GetInTouchFormSchema,
  getInTouchFormSchema,
} from "../../schema/contact";
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
  } = useForm<GetInTouchFormSchema>({
    resolver: zodResolver(getInTouchFormSchema),
    defaultValues: {
      name: { first: "", lastName: "" },
      email: "",
      phoneNumber: "",
      propertyType: "",
      additionalComment: "",
      address: "",
      contactMethod: "Any",
      contactTime: new Date().toISOString(),
      sellDate: new Date().toISOString(),
    },
  });

  const onSubmit = async (data: GetInTouchFormSchema) => {
    try {
      await axios.post(`${API_BASE_URL}/form/connect-with-us`, data);
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First name"
            {...register("name.first")}
            error={!!errors.name?.first}
            helperText={errors.name?.first?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last name"
            {...register("name.lastName")}
            error={!!errors.name?.lastName}
            helperText={errors.name?.lastName?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email address"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone number"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.propertyType}>
            <InputLabel
              id="property-type-label"
              sx={{ backgroundColor: "white" }}
            >
              Property Type
            </InputLabel>
            <Controller
              name="propertyType"
              control={control}
              render={({ field }) => (
                <Select {...field} labelId="property-type-label">
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
          <TextField
            fullWidth
            label="Location"
            {...register("address")}
            error={!!errors?.address}
            helperText={errors?.address?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Additional comments"
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
