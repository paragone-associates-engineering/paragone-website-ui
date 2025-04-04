import type React from "react"
import { Box, Typography} from "@mui/material"
//import PropertyCard from "../../../common/property-card"
import { ApiProperty } from '../../../types/properties';
//import { propertiesData } from "../../../constant"
interface RelatedPropertiesProps {
  properties: ApiProperty[]
  title?: string
}

const RelatedProperties: React.FC<RelatedPropertiesProps> = ({ title = "Checkout related properties" }) => {
  return (
    <Box sx={{ py: 1, bgcolor: "background.default", maxWidth:'1200px', margin:'auto',px:{xs:5, md:2} }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        {title}
      </Typography>

      {/* <Grid container spacing={4} sx={{ mt: 2 }}>
        {propertiesData.slice(0, 3).map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid> */}
    </Box>
  )
}

export default RelatedProperties

