import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#fcf8f2',
        borderTop: '1px solid #e5e7eb',
        py: 4,
        mt: 12,
        boxShadow: 'inset 0 1px 4px #e5e7eb',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          © {new Date().getFullYear()} Rao Vặt. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;