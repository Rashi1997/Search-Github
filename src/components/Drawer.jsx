import React from 'react';
import clsx from 'clsx';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import Search from "@material-ui/icons/Search";
import Filter1 from "@material-ui/icons/Filter1";
import Filter2 from "@material-ui/icons/Filter2";
import Dashboard from "@material-ui/icons/Dashboard";
import Sort from "@material-ui/icons/Sort";
import RotateLeft from "@material-ui/icons/RotateLeft";
import MailIcon from '@material-ui/icons/Mail';
import Cards from "./Cards";
import Bookmarks from "./Bookmarks";
import { ListItemSecondaryAction } from '@material-ui/core';

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: "#265458",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
            <MenuIcon />
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
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
      <Link href="#" onClick={handleDrawerOpen} >
        <List style={{backgroundColor:"#D2D8D0"}}>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
          <ListItem>
            <ListItemIcon><Search style={{color: "#265458"}}/></ListItemIcon>
            <ListItemText 
            primary=  {<TextField
                id="standard-basic"
                placeholder="Search keyword"
                value={props.searchname}
                style={{ width: 200 }}
                variant="outlined"
                onChange={props.handleChange}
                size="small"
              />}>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon><Filter1 style={{color: "#265458"}}/></ListItemIcon>
            <ListItemText 
            primary=  {
              <div>
              <Chip
                variant="outlined"
                label="topics"
                size="small"
                style={{backgroundColor: "#E34633", color: "white", margin: 5}}
              /><Autocomplete
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
                  <Chip
                    label={option}
                    size="small"
                    style={{backgroundColor: "#E34633", color: "white"}}
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
            /></div>}>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon><Filter2 style={{color: "#265458"}}/></ListItemIcon>
            <ListItemText 
            primary=  {
              <div>
              <Chip
                variant="outlined"
                label="language"
                size="small"
                style={{backgroundColor: "#265458", color: "white", margin: 5}}
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
              </div>}>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon><Sort style={{color: "#265458"}}/></ListItemIcon>
            <ListItemText 
            primary=  {
              <div>
              <InputLabel style={{margin: 5}}>Sort by stars</InputLabel>
              <FormControl
                  size="small">
                <Select
                  variant="outlined"
                  style={{width: 200}}
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
              </div>}>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon><RotateLeft style={{color: "#265458"}}/></ListItemIcon>
            <ListItemText style={{marginLeft: 45}}
            primary=  {
              <Button variant="contained" color="secondary" onClick={props.reset}
            style={{backgroundColor:"#265458"}}>
              Reset
            </Button>
            }>
            </ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List style={{backgroundColor:"#D2D8D0"}}>
          <ListItem>
            <ListItemIcon><Dashboard style={{color: "#265458"}}/></ListItemIcon>
            <ListItemText style={{marginLeft: 25}}
            primary=  {
            <Bookmarks countByLanguage={props.countByLanguage} />
            }>
            </ListItemText>
          </ListItem>
        </List>
      </Link>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Cards
          clearerror={props.clearerror}
          filtered={props.filtered} displayItems={props.displayItems} error={props.error} isLoaded={props.isLoaded}/>
      </main>
    </div>
  );
}