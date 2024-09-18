import {
  Box,
  Container,
  Divider,
  InputLabel,
  Link,
  Stack,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import * as React from 'react';
// import FacebookIcon from "@mui/icons-material/GitHub";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import TwitterIcon from "@mui/icons-material/X";
// import SitemarkIcon from "./SitemarkIcon";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      Delightfully commerce for everyone
    </Typography>
  );
}

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          background: '#fafafa',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              {/* <SitemarkIcon /> */}
              <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                Join the newsletter
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Subscribe for weekly updates. No spams ever!
              </Typography>
              <InputLabel htmlFor="email-newsletter">Email</InputLabel>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField
                  id="email-newsletter"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  fullWidth
                  aria-label="Enter your email address"
                  placeholder="Your email address"
                  slotProps={{
                    htmlInput: {
                      autoComplete: 'off',
                      'aria-label': 'Enter your email address',
                    },
                  }}
                  sx={{ width: '250px' }}
                />

                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 10,
                    background: 'black',
                    color: 'white',
                    textTransform: 'capitalize',
                    flexShrink: 0,
                  }}
                >
                  Subscribe
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Product
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              Apparel
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Accessories
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Company
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              Features
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Pricing
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Contact Us
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Link color="text.secondary" variant="body2" href="#">
              © 2024 Your Next Store
            </Link>

            <Copyright />
          </div>
          {/* <Stack direction="row" spacing={1} useFlexGap sx={{ justifyContent: "left", color: "text.secondary" }}>
            <IconButton color="inherit" size="small" href="https://github.com/mui" aria-label="GitHub" sx={{ alignSelf: "center" }}>
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" size="small" href="https://x.com/MaterialUI" aria-label="X" sx={{ alignSelf: "center" }}>
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" size="small" href="https://www.linkedin.com/company/mui/" aria-label="LinkedIn" sx={{ alignSelf: "center" }}>
              <LinkedInIcon />
            </IconButton>
          </Stack> */}
        </Box>
      </Container>
    </React.Fragment>
  );
}
