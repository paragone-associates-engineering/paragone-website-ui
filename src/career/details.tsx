import { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material"
import { PageBanner } from "../common/banner/page-banner"
//import { jobData } from "./data"
import JobApplication from "./apply"
import { useDispatch, useSelector } from "react-redux";
import { fetchJobDetails } from "../redux/slices/job-slice"; 
import { RootState, AppDispatch } from "../redux/store";
import { useParams } from "react-router-dom";
import Loader from "../common/loader";
import dayjs from "dayjs";

import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);
const JobDetail = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { jobDetails, loading } = useSelector((state: RootState) => state.jobs);


  useEffect(() => {
    if (jobId) dispatch(fetchJobDetails(jobId));
  }, [dispatch, jobId]);

  //console.log(jobDetails)
  
  const formatted = dayjs(`${jobDetails?.applicationEndDate}`).format('dddd, MMMM Do, YYYY');

  if (loading) return <Loader />;
  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner title={jobDetails?.title || ''} breadcrumbs={[{ label: "Home", href: "/" }, { label: 'Careers', href:'/careers'}, {label:`${jobDetails?.title}`} ]} />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          We are hiring: {jobDetails?.title}
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Job details
          </Typography>

          <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: "background.paper", borderRadius: 2 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ width: "30%", fontWeight: "bold", color: "primary.main" }}
                  >
                    Job title
                  </TableCell>
                  <TableCell>{jobDetails?.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    Department
                  </TableCell>
                  <TableCell>{jobDetails?.department}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    Location
                  </TableCell>
                  <TableCell>{jobDetails?.location}</TableCell>
                </TableRow>
               <TableRow>
  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
    General Description
  </TableCell>
  <TableCell dangerouslySetInnerHTML={{ __html: jobDetails?.description || "" }}></TableCell>
</TableRow>

<TableRow>
  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
    Duties and Responsibilities
  </TableCell>
  <TableCell dangerouslySetInnerHTML={{ __html: jobDetails?.duties || "" }}></TableCell>
</TableRow>

<TableRow>
  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
    Required Skills
  </TableCell>
  <TableCell>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }} component="h2" gutterBottom>
      SKILLS/ATTRIBUTES
    </Typography>
    <div dangerouslySetInnerHTML={{ __html: jobDetails?.skills || "" }}></div>
  </TableCell>
</TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                     Experience
                  </TableCell>
                  <TableCell>
                  <Typography variant="h6"  sx={{font:'bold'}} component="h2" gutterBottom>
                   Experience
          </Typography>
           <div dangerouslySetInnerHTML={{ __html: jobDetails?.experience || "" }}></div>
                    
                    </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    Education 
                  </TableCell>
                  <TableCell>
                  <Typography variant="h6"  sx={{font:'bold'}} component="h2" gutterBottom>
                  Education
          </Typography>
                    {jobDetails?.education}
                    </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

       

        <Box sx={{ my: 4 }}>
          <Typography variant="body2">
            Interested candidates should submit their CVs to:{" "}
            <Typography component="span" fontWeight="bold">
             recruitment.paragonesignature@gmail.com
            </Typography>{" "}
           {formatted !== 'Invalid Date' && (`before ${formatted}.`)}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
            Note: Only qualified candidates will be contacted.
          </Typography>
        </Box>

        <Box sx={{ my: 8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741899341/img_xizehs.png"
                alt="Modern desk with plant"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" marginLeft={0} gutterBottom>
                Apply Now
              </Typography>

              <JobApplication />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default JobDetail

