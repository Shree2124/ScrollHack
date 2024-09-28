import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box 
            sx={{
                padding: 1,
                backgroundColor: 'rgb(31 41 55 / 1)', // Light background color
                marginTop: 'auto', // Ensure it stays at the bottom
                textAlign: 'center',
                boxShadow: 1,
                position: 'fixed', // Fix the footer at the bottom
                bottom: 0,
                width: '100%',
                overflow:'hidden'
            }}
        >
            <Typography variant="body2" color="white">
                © {new Date().getFullYear()} LMS. All rights reserved.
            </Typography>
            <Typography variant="body2" color="white">
                <Link href="#" color="inherit">
                    Privacy Policy
                </Link>
                {' | '}
                <Link href="#" color="inherit">
                    Terms of Service
                </Link>
            </Typography>
        </Box>
    );
};

export default Footer;
