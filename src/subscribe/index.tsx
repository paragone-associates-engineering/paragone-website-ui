import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  List,
  ListItem,
} from "@mui/material";
import { PageBanner } from "../common/banner/page-banner";
import Testimonials from "../common/testimonial";
import CustomButton from "../common/button";
import SectionTitle from "../common/section-title";
import { SellAsCompanyForm } from "./subscribe-form";
import CallMadeIcon from "@mui/icons-material/CallMade";
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import { formatCurrency } from "./utils/format-currency";
import Loader from "../common/loader";

export interface PackageDetail {
  title: string;
  amount?: number;
  _id?: string;
}
export interface Package {
  _id?: string;
  id: string;
  name: string;
  level: string;
  price: number;
  duration: string;
  details: PackageDetail[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export default function SubscribePage() {
  const [selectedPkg, setSelectedPkg] = useState("");
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getPackages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Package[]>(
        `${API_BASE_URL}/form/get-partner-packages`
      );
      setPackages(response?.data || []);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err?.response?.data?.message || "Failed to load packages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);
  //console.log('packgae', packages)
  const getColorClass = (level: string) => {
    switch (level.toLowerCase()) {
      case "starter":
        return "#D5F7F6";
      case "professional":
        return "#FFF1C5";
      case "commercial":
        return "#DEE3FF";
      case "large":
        return "#FEDEFF";
      default:
        return "#F9F9F9";
    }
  };
  return (
    <Box sx={{ width: "100vw" }}>
      <PageBanner
        title="Sell as a Company"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Sell as a Company" },
        ]}
      />
      <Container sx={{ py: 5 }}>
        <SectionTitle
          subtitle="Sell as a Company"
          title="  Gain unmatched exposure for your properties"
          centered={true}
          marginBottom={6}
        />

        {isLoading && <Loader />}

        <Grid container spacing={3} justifyContent="center">
          {packages.map((pkg, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box
                p={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: `${getColorClass(pkg.level)}`,
                  height: "500px",
                }}
                borderRadius={2}
              >
                <Typography variant="h6">{pkg?.name}</Typography>
                <Typography variant="h5" gutterBottom>
                  {formatCurrency(pkg.price)}
                </Typography>

                <List sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "700" }}
                    gutterBottom
                  >
                    What’s Included
                  </Typography>
                  {pkg.details.map((pkgItem, i) => (
                    <ListItem key={i}>
                      {`• ${pkgItem.title} ${
                        pkgItem.amount ? pkgItem.amount : ""
                      }`}
                    </ListItem>
                  ))}
                </List>
                <a href="#subscribe-form">
                  <CustomButton
                    onClick={() => setSelectedPkg(pkg.name)}
                    variant="outline"
                    sx={{
                      borderColor: "primary.main",
                      color: "text.primary",
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    Subscribe <CallMadeIcon />
                  </CustomButton>
                </a>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box component="section" id="subscribe-form">
        <SellAsCompanyForm selectedPkg={selectedPkg} />
      </Box>
      <Testimonials />
    </Box>
  );
}
