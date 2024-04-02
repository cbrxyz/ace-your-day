import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "./images/Logo.png";

import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

const theme = createTheme();

const NavbarContainer = styled(AppBar)({
  backgroundColor: '#081F46',
});

const LogoImage = styled('img')({
  width: 'auto',
  height: 'auto',
  maxHeight: '50px',
});

const TitleContainer = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  justifyContent: 'center',
});

const ButtonWrapper = styled('div')({
  marginLeft: 'auto',
});

const StyledButton = styled(Button)({
  color: 'black', // Set the text color to black
});

function Navbar() {
  return (
    <ThemeProvider theme={theme}>
      <NavbarContainer position="static">
        <CssBaseline />
        <Toolbar>
          <LogoImage src={logo} alt="Logo" height="40" />
          <TitleContainer variant="h4">
            Ace Your Day
          </TitleContainer>
          <ButtonWrapper>
            <StyledButton
              variant="contained"
              component={Link}
              to="/calendar"
              sx={{
                backgroundColor: '#FFEEDC',
                '&:hover': {
                  backgroundColor: '#FFEEDC',
                },
                '&:active': {
                  backgroundColor: '#FFEEDC',
                },
              }}
            >
              Log in with Google
            </StyledButton>
          </ButtonWrapper>
        </Toolbar>
      </NavbarContainer>
    </ThemeProvider>
  );
}

export default Navbar;
