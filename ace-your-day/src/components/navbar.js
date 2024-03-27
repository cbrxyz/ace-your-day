import React from "react";
import {
  AppBar,
  makeStyles,
  Toolbar,
  CssBaseline,
  Typography,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "./images/Logo.png";

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
    marginRight: theme.spacing(45),
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
    backgroundColor: "#FFEEDC",
  },
}));

function Navbar() {
  const classes = useStyles();
  
  return (
    <AppBar position="static" className={classes.toolbar}>
      <CssBaseline />
      <Toolbar className="logo">
        <Typography variant="h4" className={classes.logo}>
          <img src={logo} alt="Logo" height="40" />
        </Typography>
        <Typography variant="h4" className={classes.logo}>
          Ace Your Day
        </Typography>
        <div className={classes.buttonWrapper}>
          {/* Replace this button for Google Log In */}
          <Button
            variant="contained"
            component={Link}
            to="/calendar"
            className="button">
            Log in with Google
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;