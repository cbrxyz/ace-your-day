import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "./images/Logo.png";

import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "auto",
    margin: "0px",
    backgroundColor: "#081F46",
  },
  navlinks: {
    marginLeft: "auto",
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    height: "auto",
    cursor: "pointer",
    marginLeft: theme.spacing(-8),
    marginRight: theme.spacing(25),
    "& img": {
      width: "auto", // Make the width of the image responsive
      height: "auto", // Allow the height to adjust automatically
      maxHeight: "50px", // Set a maximum height for the logo
    },
  },
  link: {
    textDecoration: "none",
    color: "#081F46",
    fontSize: "20px",
  },
  button: {
    marginRight: theme.spacing(-25),
    backgroundColor: "#FFEEDC",
  },
}));

function Navbar() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className={classes.toolbar}>
        <CssBaseline />
        <Toolbar className={classes.logo}>
          <Typography variant="h4" className={classes.logo}>
            <img src={logo} alt="Logo" height="40" />
          </Typography>
          <Typography variant="h4" className={classes.logo}>
            Ace Your Day
          </Typography>
          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              component={Link}
              to="/calendar"
              className={classes.button}
            >
              Log in with Google
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
