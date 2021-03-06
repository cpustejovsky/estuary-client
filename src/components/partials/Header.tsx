import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import NoteHeader from "./NoteHeader";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Link,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Hidden,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { User } from "../../models/User"

const useStyles = makeStyles((theme) => ({
  menuContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  menuItems: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.up("md")]: {
      color: "white",
      "& a": {
        color: "white",
      },
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

interface Props {
  user: User,
}

export default function Header(props: Props) {
  const { user } = props
  let loc = useLocation().pathname;
  let notesPage = loc.includes("notes") && !loc.includes("organize");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderAuth = () => {
    if (user) {
      return (
        //TODO: add breakpoints and mediaqueries to change properties based on mobile or desktop
        <div className={classes.menuItems} style={{ width: "100%", justifyContent: "flex-end" }}>
          <MenuItem component={RouterLink} to="/user">
            {user.FirstName}
          </MenuItem>
          <MenuItem component={Link} underline="none" href="/api/logout">
            Log Out
          </MenuItem>
        </div>
      );
    } else {
      return (
        <div className={classes.menuItems} style={{ width: "100%", justifyContent: "flex-end" }}>
          <MenuItem component={RouterLink} to="/login">
            Log in
          </MenuItem>
          <MenuItem component={RouterLink} to="/signup">
            Sign Up
          </MenuItem>
        </div>
      );
    }
  };
  const renderMenu = (mobile = false) => {
    return (
      <div className={classes.menuItems}>
        <MenuItem component={RouterLink} to="/about" onClick={handleClose}>
          About
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/free-writes"
          onClick={handleClose}
        >
          Free Writes
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/notes/in-tray"
          onClick={handleClose}
        >
          Notes
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/projects/list"
          onClick={handleClose}
        >
          Projects
        </MenuItem>
        {mobile ? <hr style={{ width: "100%" }} /> : null}
        {renderAuth()}
      </div>
    );
  };
  return (
    <AppBar position="sticky" id="header" style={{ width: "100vw" }}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          component={RouterLink}
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            paddingRight: "20px",
            justifySelf: "center",
          }}
          variant="h6"
        >
          Estuary
        </Typography>
        <Hidden mdUp>
          <IconButton
            style={{ margin: "0" }}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <IconButton onClick={handleClick} >
              <MenuIcon style={{color: "white"}} aria-haspopup="true" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {renderMenu(true)}
            </Menu>
          </IconButton>
        </Hidden>
        <Hidden smDown>
            <div className={classes.menuContainer}>{renderMenu()}</div>
        </Hidden>
      </Toolbar>
      {notesPage ? <NoteHeader /> : null}
    </AppBar>
  );
}
