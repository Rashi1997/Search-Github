import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ReactWordcloud from "react-wordcloud";
import Cards from "./Cards";

export default function Bookmarks(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  const countFormat = (countByLanguage) => {
    let objects = [];
    Object.keys(countByLanguage).forEach((key) => {
      objects.push({ "text": key, "value": countByLanguage[key] });
    });
    return objects
  };
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [20, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

const size = [500, 200];
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{ backgroundColor: "#265458", color: "white" }}
      >
        BookMarks
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Bookmark Stats
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box display="flex" flexDirection="column"  alignItems="stretch" padding={1}>
              <Box alignSelf="center">
                {Object.keys(props.countByLanguage).length ? (
                  <ReactWordcloud
                    options={options}
                    size={size}
                    words={countFormat(props.countByLanguage)}
                  />
                ) : (
                  "Nothing in Bookmarks"
                )}
              </Box>
              <Box>
                <Cards
                  bookmark={props.bookmark}
                  filtered={props.bookmark}
                  addBookmark={props.addBookmark}
                  removeBookmark={props.removeBookmark}
                  type = "bookmarks"
                  isLoaded={true}
                />
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
