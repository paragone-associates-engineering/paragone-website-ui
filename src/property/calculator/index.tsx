/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import { Container, Typography,  Box, Grid, TextField, MenuItem,  Paper,  Divider, Card, CardContent, Select, FormControl, InputLabel, OutlinedInput, Chip} from "@mui/material"
//import { formatCurrency } from "./utils"
//import type { PropertyCalculatorResult } from "../types"
import { PageBanner } from '../../common/banner/page-banner';
import { propertyTypes } from "../data";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_BASE_URL } from "../../services/api"
import CustomButton from "../../common/button";
import toast from "react-hot-toast";
import { LocationAutocomplete } from "./components/location-autosearch";
import { AnimatedWrapper } from "../../common/animations/animated-wrapper";
import { Helmet } from "react-helmet-async";


const formSchema = z.object({
  propertyCategory: z.enum(["residential", "commercial", "industrial", "land"], {
    required_error: "Property category is required",
  }),
  location: z.string().min(1, "Location is required"),
  budget: z.coerce.number().min(1, "Budget is required"),
  sizeOfFamily: z.coerce.number().optional(),
  proximityToKeyLocations: z.coerce.number().min(1, "Proximity is required"),
  preferences: z.array(z.string()).optional(),
  futurePlans: z.string().optional(),
}).refine(data => {
  if (data.propertyCategory === "residential") {
    return typeof data.sizeOfFamily === "number" && data.sizeOfFamily > 0;
  }
  return true;
}, {
  message: "Size of family is required for residential properties",
  path: ["sizeOfFamily"]
});

type FormSchemaType = z.infer<typeof formSchema>;

const PropertyCalculator = () => {
  const [calculationResult, setCalculationResult] = useState<any[]>([]);
  const [isCalculated, setIsCalculated] = useState(false)
  const [allPreferences, setAllPreferences] = useState<any[]>([]);
const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch, 
    reset,
  control,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location:  "",
      propertyCategory: "residential",
      preferences: [],
      futurePlans: "",
      proximityToKeyLocations: 5
    }
  });

  const watchCategory = watch("propertyCategory")

  const filteredPreferences = allPreferences.filter(
    (pref) => pref.propertyCategory.toLowerCase() === watchCategory.toLowerCase()
  );
  
  const preferencesMap = Object.fromEntries(
    allPreferences.map((pref) => [pref.id, pref.name])
  );
  useEffect(() => {
    axios.get(`${API_BASE_URL}/listings/get-preferences`)
      .then(res => setAllPreferences(res.data))
      .catch(err => console.error("Failed to load preferences", err));
  }, []);
  
  useEffect(() => {
    setSelectedPreferences([]);
  }, [watchCategory]);

  const onSubmit = async (data: FormSchemaType) => {
    if (data.budget === 0) {
      setCalculationResult([]);
      setIsCalculated(false);
      return;
    }
    
    const formData = {
      ...data,
      budget: data.budget,
      preferences: selectedPreferences,
      sizeOfFamily: watchCategory === "residential" ? data.sizeOfFamily : undefined,
      
    };
    
    setIsCalculated(false);
    setCalculationResult([]);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/form/property-calculator`, formData);
      setCalculationResult(response.data?.results || null);
      //console.log('results', response.data?.results)
      setIsCalculated(true);
      toast.success('Details calculated successfully')
       reset();
    } catch (error) {
      setCalculationResult([]);
      toast.error('Sorry we could not calculate your property request')
      console.log(error)
    } 
  };

 // console.log('calculate', calculationResult)
  return (
     <>
             <Helmet>
                             <title>Property Calculator | Paragone Signature & Associates</title>
                          {/* <meta name="description" content='Paragone Signature is a property management, investment, and development company, offering end-to-end services along the real estate value chain, from management to joint-venture investments.' /> */}
                           </Helmet>
    <Box sx={{ width: '100%' }}>
      <PageBanner 
        title="Property Calculator" 
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Property Calculator" }]} 
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography  color="primary" gutterBottom>
            Property calculator
          </Typography>
          <Typography variant="h3" component="h1" sx={{fontWeight:700, fontSize:28}} gutterBottom>
            Make informed decisions with our property calculator
          </Typography>
        </Box>
        </Container>
        <Box sx={{bgcolor:'secondary.main'}}>
  <Container maxWidth='lg'>
        <Grid container spacing={4} justifyContent="center" sx={{ pt:6, py:8, borderBottom:'1px solid #DDDDDD'}}>
      
         
          <Grid item xs={12} md={8}>
             <AnimatedWrapper>
          <Typography variant="h5" sx={{mb:5, fontWeight:700}} gutterBottom>
                Property Investment Calculator
                </Typography>
                </AnimatedWrapper>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{mb:1}}>
                      Property Category
                    </Typography>
                    <TextField 
                      fullWidth 
                      size="small" 
                      placeholder="Property Category" 
                      select 
                      {...register("propertyCategory")}
                      error={!!errors.propertyCategory} 
                      helperText={errors.propertyCategory?.message}
                    >
                      {propertyTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{mb:1}}>
                      Property Location
                    </Typography>
                    <LocationAutocomplete control={control}   errors={!!errors.location} />
                    
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{mb:1}}>
                      Budget
                    </Typography>
                    <TextField 
                      fullWidth 
                      size="small" 
                      placeholder="Budget" 
                      type="number" 
                      {...register("budget")}
                      error={!!errors.budget} 
                      helperText={errors.budget?.message} 
                    />
                  </Grid>

                  {watchCategory === "residential" && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{mb:1}}>
                        Size of Family
                      </Typography>
                      <TextField 
                        fullWidth 
                        size="small" 
                        placeholder="Size of Family" 
                        type="number" 
                        {...register("sizeOfFamily")}
                        error={!!errors.sizeOfFamily} 
                        helperText={errors.sizeOfFamily?.message} 
                      />
                    </Grid>
                  )}

                  <Grid item xs={12}  sm={watchCategory === "residential" ? 12 : 6}>
                    <Typography variant="h6" sx={{mb:1}}>
                      Proximity
                    </Typography>
                    <TextField 
                      fullWidth 
                      size="small" 
                      placeholder="Proximity to key locations (in km)" 
                      select 
                      {...register("proximityToKeyLocations")}
                      error={!!errors.proximityToKeyLocations} 
                      helperText={errors.proximityToKeyLocations?.message} 
                      
                    >
                      <MenuItem value={5}>Within 5km</MenuItem>
                      <MenuItem value={10}>Within 10km</MenuItem>
                      <MenuItem value={15}>Within 15km</MenuItem>
                      <MenuItem value={20}>Within 20km</MenuItem>
                    </TextField>
                  </Grid>

                  {/* <Grid item xs={12} sm={watchCategory === "residential" ? 6 : 12}>
                    <Typography variant="h6" sx={{mb:1}}>
                      Preferences
                    </Typography>
                    <TextField 
                      fullWidth 
                      size="small" 
                      placeholder="Preferences (comma separated)" 
                      {...register("preferences")}
                      error={!!errors.preferences} 
                      helperText={errors.preferences?.message || "Enter preferences separated by commas"} 
                    />
                  </Grid> */}
<Grid item xs={12}>
<Typography variant="h6" sx={{mb:1}}>
                      Preferences
                    </Typography>
<FormControl fullWidth size="small" error={!!errors.preferences}>
  <InputLabel id="preferences-label">Preferences</InputLabel>
  <Select
    labelId="preferences-label"
    multiple
    value={selectedPreferences}
    onChange={(e) => setSelectedPreferences(Array.isArray(e.target.value) ? e.target.value : [e.target.value])}
    input={<OutlinedInput label="Preferences" />}
    renderValue={(selected) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5,}}>
        {selected.map((value) => (
          <Chip key={value} label={preferencesMap[value]} />
        ))}
      </Box>
    )}
    
  >
    {filteredPreferences.map((pref) => (
      <MenuItem key={pref.id} value={pref.id}>
        {pref.name}
      </MenuItem>
    ))}
  </Select>
  <Typography variant="caption" color="error">
    {errors.preferences?.message}
  </Typography>
</FormControl>
</Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{mb:1}}>
                      Future Plans
                    </Typography>
                    <TextField 
                      fullWidth 
                      size="small" 
                      placeholder="Future Plans" 
                      multiline 
                      rows={4} 
                      {...register("futurePlans")}
                      error={!!errors.futurePlans} 
                      helperText={errors.futurePlans?.message} 
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CustomButton isLoading={isSubmitting} sx={{width:'100%'}}>
                      Calculate
                    </CustomButton>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            {isCalculated && calculationResult?.length > 0 && (
              <Card elevation={0} sx={{ height: "100%", borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Calculator results
                  </Typography>

                  {/* <Typography variant="subtitle2" color="text.secondary">
                    Recommended Property Value Range
                  </Typography>
                  <Typography variant="h6">
                    {formatCurrency(calculationResult?.recommendedValueRange?.min)} to {formatCurrency(calculationResult?.recommendedValueRange?.max)}
                  </Typography>

                  <Divider sx={{ my: 2 }} /> */}

                  {/* <Typography variant="subtitle2" color="text.secondary">
                    Estimated Down Payment Required
                  </Typography> */}
                  {/* <Typography variant="h6">
                    {formatCurrency(calculationResult?.estimatedDownPayment)}
                    <Typography component="span" variant="caption" color="text.secondary">
                      (20% of property value)
                    </Typography>
                  </Typography> */}
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Property Suggestion
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {/* {calculationResult?.propertyRecommendation}{" "} */}
                    <Typography component="span" variant="caption" color="primary">
                      (Show property details)
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
            )}
            
            {isCalculated && calculationResult?.length === 0 && (
              <Box>
                <Typography variant="h5" marginTop={3} marginBottom={3} gutterBottom>
                    Calculator results
                  </Typography>
              
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="body1" gutterBottom>
                  We could not calculate your expected property. Please request for a property for your desired choice.
                </Typography>
                <CustomButton href="/property-request" sx={{mt:3, }}>Show More</CustomButton>
              </Paper>
              </Box>
            )}
          </Grid>
         
        
        </Grid>
          </Container>
    </Box>
    </Box>
   
    </>
  )
}

export default PropertyCalculator;