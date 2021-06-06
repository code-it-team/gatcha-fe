import {
  AppBar,
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "@reach/router";
import { useState } from "react";
import { _ROUTES } from "src/constants";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
}));

// ########################################################
// #################   Main Component    ##################
// ########################################################
const Header = () => {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navMenu = [
    {
      title: "Home",
      icon: <HomeIcon />,
      path: _ROUTES.home,
    },
    {
      title: "Edit Answers",
      icon: <EditIcon />,
      path: _ROUTES.edit,
    },
  ];
  const toggleDrawer = (open) => (event) => {
    setIsDrawerOpen(open);
  };

  const list = () => (
    <List>
      {navMenu.map(({ title, icon, path }) => (
        <Link key={title} to={path} className={classes.link}>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        </Link>
      ))}
    </List>
  );

  return (
    <AppBar position="static" component="header" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          <Avatar
            className={classes.avatar}
            src="/assets/code-it-logo.png"
            variant="rounded"
          />
          <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
