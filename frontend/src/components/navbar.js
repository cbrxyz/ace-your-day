import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, CssBaseline, Typography, Button, Menu, MenuItem, Avatar, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, DialogActions, Link as MuiLink } from "@mui/material";
import { Link, useNavigate,withRouter, BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import logo from "./images/Logo.png";
import profile from "./images/profile.png";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import axios from 'axios';
import Cookies from 'js-cookie';

// Setup CSRF tokens for Axios
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

axios.interceptors.request.use(function (config) {
    const token = Cookies.get('csrftoken');
    config.headers['X-CSRFToken'] = token;
    return config;
}, function (error) {
    return Promise.reject(error);
});

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

const GoogleLoginButton = styled(MuiLink)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  color: '#757575',
  padding: '8px 24px',
  borderRadius: '4px',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  cursor: 'pointer',
});

const GoogleIconWrapper = styled('div')({
  marginRight: '10px',
});

function Navbar() {
  const location = useLocation();
  console.log('Current path:', location.pathname);

  function getCSRFToken() {
    const csrfTokenElement = document.querySelector('input[name="csrfmiddlewaretoken"]');
    return csrfTokenElement ? csrfTokenElement.value : null;
  }

  axios.defaults.withCredentials = true;
  console.log(document.cookie);
  // console.log(document.cookie.split('; ').find(row=> row.startsWith('csrftoken=')).split('=')[1]);

  const queryParams = new URLSearchParams(window.location.search);
  const accessToken = queryParams.get('access_token');
  console.log(accessToken);
  // let accessToken = document.cookie.split('; ').find(row=> row.startsWith('access_token=')).split('=')[1];
  // console.log(accessToken);
  //

  let config = {
    withCredentials: true,
    headers: {
      'accept': "application/json",
      'authorization': `Bearer ${accessToken}`,
      'X-CSRFToken': getCSRFToken(),
    }
  }
  // let response = axios.get("/api/users", config).then((res) => console.log(res));
  // axios.get('/api/users', config)
  //   .then(response => console.log(response))
  //   .catch(error => console.error(error));
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [preferencesDialogOpen, setPreferencesDialogOpen] = useState(false);
  const [preferences, setPreferences] = useState(() => {
    const savedPrefs = localStorage.getItem("preferences");
    console.log("Retrieved preferences from local storage:", savedPrefs);
    return savedPrefs ? JSON.parse(savedPrefs) : { question1: "", question2: "", question3: "", question4: "" };
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("loggedIn", userLoggedIn);
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }, [userLoggedIn, preferences]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = async () => {
    try {
        // Call the backend to log out
        await axios.post('http://localhost:8000/logout');
        console.log("Logged out from backend");
    } catch (error) {
        console.error("Error logging out from backend:", error);
    }

    // Clear client-side storage
    Cookies.remove('access_token');  // Assuming this is your OAuth token
    Cookies.remove('csrftoken');  // CSRF token might as well be cleared
    localStorage.removeItem("userSession");
    sessionStorage.clear();

    setUserLoggedIn(false);
    handleClose();
    navigate('/');
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
          {location.pathname == "/" ? (
            console.log(userLoggedIn),
            console.log("user is not logged in yet"),
            <GoogleLoginButton
              component={Link}
              to="http://localhost:8000/login"
            >
              <GoogleIconWrapper>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Font_Awesome_5_brands_github-square.svg/800px-Font_Awesome_5_brands_github-square.svg.png" alt="Google icon" style={{ width: '20px' }} />
            </GoogleIconWrapper>
              <Typography variant="button" style={{ fontWeight: 'bold' }}>Sign in with Github</Typography>
            </GoogleLoginButton>
          ) : (console.log(userLoggedIn),console.log("user is logged in"), <>
            <LogoImage onClick={handleMenu} src={profile} alt="Profile" height="40" />
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
                    <MenuItem value="5:00am">5:00am</MenuItem>
                    <MenuItem value="6:00am">6:00am</MenuItem>
                    <MenuItem value="7:00am">7:00am</MenuItem>
                    <MenuItem value="8:00am">8:00am</MenuItem>
                    <MenuItem value="9:00am">9:00am</MenuItem>
                    <MenuItem value="10:00am">10:00am</MenuItem>
                    <MenuItem value="11:00am">11:00am</MenuItem>
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
                    <MenuItem value="5:00pm">5:00pm</MenuItem>
                    <MenuItem value="6:00pm">6:00pm</MenuItem>
                    <MenuItem value="7:00pm">7:00pm</MenuItem>
                    <MenuItem value="8:00pm">8:00pm</MenuItem>
                    <MenuItem value="9:00pm">9:00pm</MenuItem>
                    <MenuItem value="10:00pm">10:00pm</MenuItem>
                    <MenuItem value="11:00pm">11:00pm</MenuItem>

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
                    <MenuItem value="group similar events">group similar events</MenuItem>
                    <MenuItem value="spread similar events">spread similar events</MenuItem>
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
                    <MenuItem value="group my free time">group my free time</MenuItem>
                    <MenuItem value="spread my free time">spread my free time</MenuItem>
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
