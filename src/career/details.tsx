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
import { jobData } from "./data"
import JobApplication from "./apply"
import { useDispatch, useSelector } from "react-redux";
import { fetchJobDetails } from "../redux/slices/job-slice"; 
import { RootState, AppDispatch } from "../redux/store";
import { useParams } from "react-router-dom";
const JobDetail = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { jobDetails, loading } = useSelector((state: RootState) => state.jobs);


  useEffect(() => {
    if (jobId) dispatch(fetchJobDetails(jobId));
  }, [dispatch, jobId]);

  if (loading) return <Typography>Loading...</Typography>;
  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner title={jobDetails?.title || ''} breadcrumbs={[{ label: "Home", href: "/" }, { label: 'Careers', href:'/careers'}, {label:`${jobData.title}`} ]} />
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
                  <TableCell>{jobData.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    Department
                  </TableCell>
                  <TableCell>{jobData.department}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    Location
                  </TableCell>
                  <TableCell>{jobData.location}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    General job description
                  </TableCell>
                  <TableCell>{jobData.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                   Duties and Responsibilities
                  </TableCell>
                  <TableCell>{jobData.description}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    Required Skills
                  </TableCell>
                  <TableCell>
                  <Typography variant="h6" sx={{mb:5, font:'bold'}} component="h2" gutterBottom>
                 SKILLS/ATTRIBUTES
          </Typography>
                    {jobData.description}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    Education and Experience
                  </TableCell>
                  <TableCell>
                  <Typography variant="h6"  sx={{mb:5, font:'bold'}} component="h2" gutterBottom>
                  Education and Experience
          </Typography>
                    {jobData.description}
                    </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Duties and Responsibilities
          </Typography>

          <Paper elevation={0} sx={{ p: 3, backgroundColor: "background.paper", borderRadius: 2 }}>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {jobData.duties.map((duty, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  {duty}
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            SKILLS/ATTRIBUTES
          </Typography>

          <Paper elevation={0} sx={{ p: 3, backgroundColor: "background.paper", borderRadius: 2 }}>
            <Grid container spacing={2}>
              {jobData.skills.map((skill, index) => (
                <Grid item xs={12} key={index}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {skill.title}:
                  </Typography>
                  <Typography variant="body2">{skill.description}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            EDUCATION/EXPERIENCE REQUIREMENTS
          </Typography>

          <Paper elevation={0} sx={{ p: 3, backgroundColor: "background.paper", borderRadius: 2 }}>
            {/* <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Educational Background:
                </Typography>
                <Typography variant="body2" paragraph>
                  {jobData.education.educational}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Experience:
                </Typography>
                <Typography variant="body2" paragraph>
                  {jobData.education.experience}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  HR Certification:
                </Typography>
                <Typography variant="body2" paragraph>
                  {jobData.education.certification}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Preferred:
                </Typography>
                <Typography variant="body2">{jobData.education.preferred}</Typography>
              </Grid>
            </Grid> 
          </Paper>
        </Box> */}

        <Box sx={{ my: 4 }}>
          <Typography variant="body2">
            Interested candidates should submit their CVs to:{" "}
            <Typography component="span" fontWeight="bold">
              {jobData.email}
            </Typography>{" "}
            before {jobData.deadline}.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
            Note: Only qualified candidates will be contacted.
          </Typography>
        </Box>

        <Box sx={{ my: 8 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
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

            <Grid item xs={12} md={7}>
              <Typography variant="h4" component="h2" gutterBottom>
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

