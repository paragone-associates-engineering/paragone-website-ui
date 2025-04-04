import { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material"
import { formatCurrency } from "./utils"
import type { PropertyCalculatorResult } from "../types"
import { PageBanner } from '../../common/banner/page-banner';
import { propertyTypes, locations, budgetOptions } from "../data";

const PropertyCalculator = () => {
  const [propertyType, setPropertyType] = useState("")
  const [location, setLocation] = useState("")
  const [budget, setBudget] = useState("")
  const [familySize, setFamilySize] = useState("")
  const [income, setIncome] = useState("")
  const [loanAmount, setLoanAmount] = useState("")
  const [savings, setSavings] = useState("")
  const [proximity, setProximity] = useState("")
  const [lifestyle, setLifestyle] = useState("")
  const [futurePlans, setFuturePlans] = useState("")

  const [calculationResult, setCalculationResult] = useState<PropertyCalculatorResult | null>(null)
  const [isCalculated, setIsCalculated] = useState(false)

  const handleCalculate = () => {
    setCalculationResult({
      recommendedValueRange: {
        min: 25000000,
        max: 30000000,
      },
      estimatedDownPayment: 6000000,
      savingsShortfall: 1000000,
      timeToSave: {
        months: 5,
        savingsRate: 200000,
      },
      monthlyLoanRepayment: 280000,
      propertyRecommendation: "4-bedroom house in suburban Lagos",
      proximityScore: {
        distance: 15,
        description: "parks and schools, meeting the user's proximity requirement",
      },
    })

    setIsCalculated(true)
  }

  return (
    <Box sx={{width:'100vw'}}>  
     <PageBanner 
     title="Property Calculator" 
     breadcrumbs={[{ label: "Home", href: "/" }, { label: "Property Calculator" }]} />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="overline" color="primary" gutterBottom>
            Property calculator
          </Typography>
          <Typography variant="h3" component="h1" gutterBottom>
            Make informed decisions with our property calculator
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems='center' justifyContent='center'>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 3, backgroundColor: "background.paper", borderRadius: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Property Investment Calculator
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="property-type-label">Property type</InputLabel>
                    <Select
                      labelId="property-type-label"
                      value={propertyType}
                      onChange={(e: SelectChangeEvent) => setPropertyType(e.target.value)}
                      label="Property type"
                    >
                      {propertyTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="location-label">Location</InputLabel>
                    <Select
                      labelId="location-label"
                      value={location}
                      onChange={(e: SelectChangeEvent) => setLocation(e.target.value)}
                      label="Location"
                    >
                      {locations.map((loc) => (
                        <MenuItem key={loc.id} value={loc.id}>
                          {loc.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="budget-label">Budget</InputLabel>
                    <Select
                      labelId="budget-label"
                      value={budget}
                      onChange={(e: SelectChangeEvent) => setBudget(e.target.value)}
                      label="Budget"
                    >
                      {budgetOptions.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.range}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Size of family"
                    variant="outlined"
                    size="small"
                    value={familySize}
                    onChange={(e) => setFamilySize(e.target.value)}
                    placeholder="Enter family size"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Income"
                    variant="outlined"
                    size="small"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="Enter income"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₦</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="proximity-label">Proximity to key locations</InputLabel>
                    <Select
                      labelId="proximity-label"
                      value={proximity}
                      onChange={(e: SelectChangeEvent) => setProximity(e.target.value)}
                      label="Proximity to key locations"
                    >
                      <MenuItem value="5km">Within 5km</MenuItem>
                      <MenuItem value="10km">Within 10km</MenuItem>
                      <MenuItem value="15km">Within 15km</MenuItem>
                      <MenuItem value="20km">Within 20km</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Loan availability"
                    variant="outlined"
                    size="small"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="Enter amount"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₦</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Savings"
                    variant="outlined"
                    size="small"
                    value={savings}
                    onChange={(e) => setSavings(e.target.value)}
                    placeholder="Enter amount"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₦</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="lifestyle-label">Lifestyle preferences</InputLabel>
                    <Select
                      labelId="lifestyle-label"
                      value={lifestyle}
                      onChange={(e: SelectChangeEvent) => setLifestyle(e.target.value)}
                      label="Lifestyle preferences"
                    >
                      <MenuItem value="urban">Urban</MenuItem>
                      <MenuItem value="suburban">Suburban</MenuItem>
                      <MenuItem value="rural">Rural</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Future Plans"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={futurePlans}
                    onChange={(e) => setFuturePlans(e.target.value)}
                    placeholder="Write comments here"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleCalculate} size="large">
                    Calculate
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            {isCalculated && calculationResult && (
              <Card elevation={0} sx={{ height: "100%", backgroundColor: "background.paper", borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Calculator results
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Recommended Property Value Range
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {formatCurrency(calculationResult.recommendedValueRange.min)} to{" "}
                      {formatCurrency(calculationResult.recommendedValueRange.max)}
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Estimated Down Payment Required
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {formatCurrency(calculationResult.estimatedDownPayment)}{" "}
                      <Typography component="span" variant="caption" color="text.secondary">
                        (20% of property value)
                      </Typography>
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Savings Shortfall
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {formatCurrency(calculationResult.savingsShortfall)}
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Time to Save Shortfall
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {calculationResult.timeToSave.months} months{" "}
                      <Typography component="span" variant="caption" color="text.secondary">
                        (at a monthly savings rate of {formatCurrency(calculationResult.timeToSave.savingsRate)})
                      </Typography>
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Monthly Loan Repayment
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Approximately {formatCurrency(calculationResult.monthlyLoanRepayment)}{" "}
                      <Typography component="span" variant="caption" color="text.secondary">
                        (for a 10-year loan at 10% interest)
                      </Typography>
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Property Suggestion
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {calculationResult.propertyRecommendation}{" "}
                      <Typography component="span" variant="caption" color="primary">
                        (View Map)
                      </Typography>
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Proximity Score
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Within {calculationResult.proximityScore.distance} km{" "}
                      <Typography component="span" variant="caption" color="text.secondary">
                        ({calculationResult.proximityScore.description})
                      </Typography>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default PropertyCalculator

