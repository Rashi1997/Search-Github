import React from "react";
import clsx from "clsx";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Search from "@material-ui/icons/Search";
import Filter1 from "@material-ui/icons/Filter1";
import Filter2 from "@material-ui/icons/Filter2";
import Dashboard from "@material-ui/icons/Dashboard";
import Sort from "@material-ui/icons/Sort";
import RotateLeft from "@material-ui/icons/RotateLeft";
import Cards from "./Cards";
import Bookmarks from "./Bookmarks";
 
/**
 * This component loads the sidebar and the 
 * form. The bookmarks and repository cards are loaded
 * as child components.
 * 
 * States: 
 *        open
 * 
 * Props: 
 *         searchname
 *         handleChange
 *         topicsfilter
 *         settopicInput
 *         getuniquetopics
 *         filtered
 *         languagefilter
 *         setlanguageInput
 *         getuniquelanguages
 *         sort
 *         radiochange
 *         reset
 *         addBookmark
 *         removeBookmark
 *         bookmark
 *         countByLanguageTopics
 *         error
 *         isLoaded
 *
 * Child Components: 
 *        Cards.jsx
 *        Bookmarks.jsx
 */
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#265458",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  /** state of the sidebar - open */
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" noWrap>
            Look for top GitHub repositories!
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon fontSize="large" />
            ) : (
              <ChevronLeftIcon fontSize="large" />
            )}
          </IconButton>
        </div>
        <Divider />
        <List style={{ backgroundColor: "#D2D8D0" }}>
          <ListItem>
            <ListItemIcon>
              <Link href="#" onClick={handleDrawerOpen}>
                <Search style={{ color: "#265458" }} fontSize="large" />
              </Link>
            </ListItemIcon>
            <ListItemText
              primary={
                <TextField
                  id="standard-basic"
                  placeholder="Search keyword"
                  value={props.searchname}
                  style={{ width: 200 }}
                  variant="outlined"
                  onChange={props.handleChange}
                  size="small"
                />
              }
            ></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Link href="#" onClick={handleDrawerOpen}>
                <Filter1 style={{ color: "#265458" }} fontSize="large" />
              </Link>
            </ListItemIcon>
            <ListItemText
              primary={
                <div>
                  <Chip
                    variant="outlined"
                    label="topics"
                    size="small"
                    style={{
                      backgroundColor: "#E34633",
                      color: "white",
                      margin: 5,
                    }}
                  />
                  <Autocomplete
                    multiple
                    size="small"
                    value={props.topicsfilter}
                    onChange={(event, newInputValue) => {
                      props.settopicInput(newInputValue);
                    }}
                    options={props.getuniquetopics(props.filtered)}
                    getOptionLabel={(option) => option}
                    getOptionSelected={(option, value) => option === value}
                    style={{ width: 200 }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip key={option}
                          label={option}
                          size="small"
                          style={{ backgroundColor: "#E34633", color: "white" }}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Search Topics"
                      />
                    )}
                  />
                </div>
              }
            ></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Link href="#" onClick={handleDrawerOpen}>
                <Filter2 style={{ color: "#265458" }} fontSize="large" />
              </Link>
            </ListItemIcon>
            <ListItemText
              primary={
                <div>
                  <Chip
                    variant="outlined"
                    label="language"
                    size="small"
                    style={{
                      backgroundColor: "#265458",
                      color: "white",
                      margin: 5,
                    }}
                  />
                  <Autocomplete
                    size="small"
                    value={props.languagefilter}
                    onChange={(event, newInputValue) => {
                      props.setlanguageInput(newInputValue);
                    }}
                    options={props.getuniquelanguages(props.filtered)}
                    getOptionLabel={(option) => option}
                    getOptionSelected={(option, value) => option === value}
                    style={{ width: 200 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Search Languages"
                      />
                    )}
                  />
                </div>
              }
            ></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Link href="#" onClick={handleDrawerOpen}>
                <Sort style={{ color: "#265458" }} fontSize="large" />
              </Link>
            </ListItemIcon>
            <ListItemText
              primary={
                <div>
                  <InputLabel style={{ margin: 5 }}>Sort by stars</InputLabel>
                  <FormControl size="small">
                    <Select
                      variant="outlined"
                      style={{ width: 200 }}
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={props.sort}
                      onChange={props.radiochange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"asc"}>Asc Sort</MenuItem>
                      <MenuItem value={"desc"}>Desc Sort</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              }
            ></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Link href="#" onClick={handleDrawerOpen}>
                <RotateLeft style={{ color: "#265458" }} fontSize="large" />
              </Link>
            </ListItemIcon>
            <ListItemText
              style={{ marginLeft: 45 }}
              primary={
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={props.reset}
                  style={{ backgroundColor: "#265458" }}
                >
                  Reset
                </Button>
              }
            ></ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List style={{ backgroundColor: "#D2D8D0" }}>
          <ListItem>
            <ListItemIcon>
              <Link href="#" onClick={handleDrawerOpen}>
                <Dashboard style={{ color: "#265458" }} fontSize="large" />
              </Link>
            </ListItemIcon>
            <ListItemText
              style={{ marginLeft: 25 }}
              primary={<Bookmarks 
                addBookmark={props.addBookmark}
                removeBookmark={props.removeBookmark} bookmark={props.bookmark} countByLanguageTopics={props.countByLanguageTopics} />}
            ></ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Cards
          bookmark={props.bookmark}
          filtered={props.filtered}
          addBookmark={props.addBookmark}
          removeBookmark={props.removeBookmark}
          error={props.error}
          isLoaded={true}
        />
      </main>
    </div>
  );
}
