import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, CssBaseline, Typography, Button, Menu, MenuItem, Avatar, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, DialogActions } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
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
  color: 'black',
});

function Navbar() {
  const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [preferencesDialogOpen, setPreferencesDialogOpen] = useState(false);
  const [preferences, setPreferences] = useState(() => {
    const savedPrefs = localStorage.getItem("preferences");
    return savedPrefs ? JSON.parse(savedPrefs) : { question1: "", question2: "", question3: "", question4: "" };
  });
  const navigate = useNavigate(); 

  useEffect(() => {
    localStorage.setItem("loggedIn", userLoggedIn);
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }, [userLoggedIn, preferences]);

  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
    navigate('/');
    handleClose();
  };

  const handlePreferencesOpen = () => {
    setPreferencesDialogOpen(true);
    handleClose();
  };

  const handlePreferencesClose = () => {
    setPreferencesDialogOpen(false);
  };

  const handlePreferenceChange = (event) => {
    const newPreferences = { ...preferences, [event.target.name]: event.target.value };
    setPreferences(newPreferences);
  
  };

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
          {!userLoggedIn ? (
            <StyledButton
              onClick={handleLogin}
              variant="contained"
              component={Link}
              to="/calendar"
              sx={{
                backgroundColor: '#FFEEDC',
                '&:hover': { backgroundColor: '#FFEEDC'},
                '&:active': { backgroundColor: '#FFEEDC'},
              }}
            >Log in with Google
            </StyledButton>
          ) : (
            <>
            <Avatar onClick={handleMenu} sx={{ bgcolor: '#081F46', cursor: 'pointer' }}>E</Avatar>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handlePreferencesOpen}>Preferences</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <Dialog 
              open={preferencesDialogOpen}
              onClose={handlePreferencesClose}
              sx={{
                '& .MuiDialog-paper': {
                  width: '80%',
                  maxWidth: '400px',
                }
              }}
            >
              <DialogTitle>Set your preferences</DialogTitle>
              <DialogContent>
                <FormControl fullWidth margin="normal">
                  <InputLabel>When do you want your day to begin?</InputLabel>
                  <Select
                    name="question1"
                    value={preferences.question1}
                    label="When do you want your day to begin?"
                    onChange={handlePreferenceChange}
                  >
                    <MenuItem value="option1">5:00am</MenuItem>
                    <MenuItem value="option2">6:00am</MenuItem>
                    <MenuItem value="option3">7:00am</MenuItem>
                    <MenuItem value="option4">8:00am</MenuItem>
                    <MenuItem value="option5">9:00am</MenuItem>
                    <MenuItem value="option6">10:00am</MenuItem>
                    <MenuItem value="option7">11:00am</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>When do you want your day to end?</InputLabel>
                  <Select
                    name="question2"
                    value={preferences.question2}
                    label="When do you want your day to end?"
                    onChange={handlePreferenceChange}
                  >
                    <MenuItem value="option1">5:00pm</MenuItem>
                    <MenuItem value="option2">6:00pm</MenuItem>
                    <MenuItem value="option3">7:00pm</MenuItem>
                    <MenuItem value="option4">8:00pm</MenuItem>
                    <MenuItem value="option5">9:00pm</MenuItem>
                    <MenuItem value="option6">10:00pm</MenuItem>
                    <MenuItem value="option7">11:00pm</MenuItem>

                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>I want to..</InputLabel> 
                  <Select
                    name="question3"
                    value={preferences.question3}
                    label="Question 3"
                    onChange={handlePreferenceChange}
                  >
                    <MenuItem value="option1">group similar events</MenuItem>
                    <MenuItem value="option2">spread similar events</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>I want to..</InputLabel> 
                  <Select
                    name="question4"
                    value={preferences.question4}
                    label="Question 4"
                    onChange={handlePreferenceChange}
                  >
                    <MenuItem value="option1">group my free time</MenuItem>
                    <MenuItem value="option2">spread my free time</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePreferencesClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </>
          )}
          </ButtonWrapper>
        </Toolbar>
      </NavbarContainer>
    </ThemeProvider>
  );
}

export default Navbar;