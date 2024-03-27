import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "./images/Logo.png";


const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#081F46",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navlinks: {
    marginLeft: "auto",
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    height: "auto",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    marginLeft: "auto",
    backgroundColor: "#FFEEDC",
  },
  button: {
    backgroundColor: "#FFEEDC",
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
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
            className={classes.button}>
            Log in with Google
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;