import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";


class Form extends Component {

  changeDate = (date) => {
    const today = new Date(date);
    const options = {  year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  }
  render() {
    const filtered = this.props.filtered
    const sort = this.props.sort
    const languagefilter = this.props.languagefilter
    const topicsfilter = this.props.topicsfilter
    const searchname = this.props.searchname
    return (
      <form onSubmit={this.handleSubmit}>
            <TextField
              id="standard-basic"
              placeholder="Search keyword"
              value={searchname}
              variant="outlined"
              onChange={this.props.handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              size="small"
            />
            <br></br>
            <br></br>
            {filtered[0] ? (
              <Autocomplete
                multiple
                size="small"
                value={topicsfilter}
                onChange={(event, newInputValue) => {
                  this.props.settopicInput(newInputValue);
                }}
                options={this.props.getuniquetopics(filtered)}
                getOptionLabel={(option) => option}
                style={{ width: 300 }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      size="small"
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
            ) : (
              ""
            )}
<br></br>
            {filtered[0] ? (
              <Autocomplete
                size="small"
                value={languagefilter}
                onChange={(event, newInputValue) => {
                  this.props.setlanguageInput(newInputValue);
                }}
                options={this.props.getuniquelanguages(filtered)}
                getOptionLabel={(option) => option}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Search Languages"
                  />
                )}
              />
            ) : (
              ""
            )}
            <br></br>
            {filtered[0] ? (
              <FormControl component="fieldset">
                <FormLabel component="legend">Sort by stars</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={sort}
                  onChange={this.props.radiochange}
                >
                  <FormControlLabel
                    value="asc"
                    control={<Radio />}
                    label="asc"
                  />
                  <FormControlLabel
                    value="desc"
                    control={<Radio />}
                    label="desc"
                  />
                </RadioGroup>
              </FormControl>
            ) : (
              ""
            )}
            <br></br>
            {filtered[0] ? (
              <Button variant="contained" color="secondary" onClick={this.props.reset}
              style={{backgroundColor:"#E34633"}}>
                Reset
              </Button>
            ) : (
              ""
            )}
          </form>
    );
  }
}

export default Form;