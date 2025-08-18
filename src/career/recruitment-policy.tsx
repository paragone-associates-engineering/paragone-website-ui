
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import { Shield, Info, CheckCircle } from '@mui/icons-material';
import { PageBanner } from '../common/banner/page-banner';

const RecruitmentConsentPage = () => {
  return (
    <Box sx={{width:'100vw'}}>
          <PageBanner title='Recruitment Policy' breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers", href:'/careers' },  { label: "Recruitment Policy" }]}  />
    
          
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
    
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Shield sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            RECRUITMENT CONSENT & DATA PROTECTION NOTICE
          </Typography>
          <Chip 
            label="Paragone Signature & Associates (PSA)" 
            color="primary" 
            variant="outlined" 
            sx={{ mt: 1 }}
          />
        </Box>

        
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" paragraph>
            At Paragone Signature & Associates (PSA), we are committed to conducting our recruitment 
            process with integrity, transparency, and respect for your privacy.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 'medium' }}>
            By proceeding with your application, you acknowledge and consent to the following:
          </Typography>
        </Box>

        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
            Purpose of Data Collection
          </Typography>
          <Typography variant="body1" paragraph>
            As part of our recruitment process, we will collect and process certain personal and professional 
            information to assess your suitability for the role you applied for and to communicate with you 
            during this process.
          </Typography>
          <Typography variant="body1" paragraph>
            This may include information such as your name, contact details, employment and academic 
            history, references, relevant certifications, identification documents, and any other details 
            necessary to evaluate your candidacy.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            How We Collect Data
          </Typography>
          <Typography variant="body1" paragraph>
            Your information may be collected directly from you (through your CV, application form, or 
            interviews), or indirectly from third parties such as referees, professional institutions, or publicly 
            available sources, where appropriate.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Use of Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            Your data will be used strictly for recruitment purposes, including application evaluation, 
            communication, reference checks, and where necessary, background verification. If your 
            application is successful, the information may form part of your employment record.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Confidentiality and Data Sharing
          </Typography>
          <Typography variant="body1" paragraph>
            All data you provide will be handled in strict confidence. However, it may be shared with 
            relevant internal teams, third-party service providers (e.g., recruitment or background check 
            partners), or regulatory authorities — but only where necessary, and always in line with 
            applicable data protection laws.
          </Typography>
          <Typography variant="body1" paragraph>
            Some of these parties may be located outside Nigeria, and where this is the case, we ensure 
            appropriate safeguards are in place to protect your data.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Data Retention
          </Typography>
          <Typography variant="body1" paragraph>
            If your application is unsuccessful, we may retain your information for a limited period for 
            future job opportunities, unless you request otherwise. If hired, your data will be retained as 
            part of your employment profile.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

    
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Your Rights
          </Typography>
          <Typography variant="body1" gutterBottom>
            You have the right to:
          </Typography>
          <List sx={{ pl: 2, listStyleType: 'disc' }}>
            <ListItem disablePadding>
              <ListItemText 
                primary="(i) Access the personal information we hold about you"
                sx={{ '& .MuiListItemText-primary': { fontSize: '0.95rem' } }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primary="(ii) Request corrections or updates to your data"
                sx={{ '& .MuiListItemText-primary': { fontSize: '0.95rem' } }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primary="(iii) Withdraw your consent at any stage of the process"
                sx={{ '& .MuiListItemText-primary': { fontSize: '0.95rem' } }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primary="(iv) Request deletion or restrict the use of your data"
                sx={{ '& .MuiListItemText-primary': { fontSize: '0.95rem' } }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primary="(v) Object to the processing of your information in certain circumstances"
                sx={{ '& .MuiListItemText-primary': { fontSize: '0.95rem' } }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primary="(vi) Request transfer of your data where applicable"
                sx={{ '& .MuiListItemText-primary': { fontSize: '0.95rem' } }}
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        
        <Box sx={{ mb: 2, p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            <CheckCircle sx={{ mr: 1, verticalAlign: 'middle' }} />
            Acknowledgement & Consent
          </Typography>
          <Typography variant="body1" paragraph>
            By submitting your application, you confirm that you understand and accept the above, and you 
            consent to Paragone Signature & Associates collecting, processing, and storing your personal 
            data in accordance with relevant privacy laws and the purpose of recruitment.
          </Typography>
          <Typography variant="body1">
            You also acknowledge that you have read and understood our Privacy Policy (See our Privacy 
            Policy), which further explains how your data is managed and protected.
          </Typography>
        </Box>

        
        <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="body2" color="text.secondary">
            © Paragone Signature & Associates (PSA) - Recruitment & Data Protection Notice
          </Typography>
        </Box>
      </Paper>
    </Container>
    </Box>
  );
};

export default RecruitmentConsentPage;