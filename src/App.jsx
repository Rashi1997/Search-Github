import "./App.css";
import React from "react";
import "fontsource-roboto";
import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Box
} from "@material-ui/core";
import data from "./data.js";
import Repo from "./components/Repo";
import Form from "./components/Form";
import _ from "lodash";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      filtered: [],
      cart: 0,
      searchname: "as",
      languagefilter: null,
      topicsfilter: [],
      sort: "",
      bookmark: [],
      countByLanguage: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.radiochange = this.radiochange.bind(this);
    this.setlanguageInput = this.setlanguageInput.bind(this);
    this.getuniquelanguages = this.getuniquelanguages.bind(this);
    this.getuniquetopics = this.getuniquetopics.bind(this);
    this.settopicInput = this.settopicInput.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
    this.removeBookmark = this.removeBookmark.bind(this);
  }

  componentDidMount() {
    this.fetchSearchResults(this.state.searchname);
  }

  displayItems = (repo) => {
    return <Repo repo={repo} addBookmark={()=>this.addBookmark(repo)}
    removeBookmark={()=>this.removeBookmark(repo.node.nameWithOwner)} bookmark={this.state.bookmark}></Repo>;
  };

  fetchSearchResults = async (query) => {
    data(`"${query} in:name,description"`).then(
      (result) => {
        this.setState({
          isLoaded: true,
          data: result.search.edges,
          filtered: result.search.edges,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  };

  getuniquelanguages(data) {
    if (data) {
      const d = _.map(data, "node").map((key, value) => {
        return _.pickBy(key, _.identity);
      });
      let picked = d.map((obj) => _.pick(obj, ["primaryLanguage"]));
      const list = _.compact(
        picked.map((rp) => {
          if (rp.primaryLanguage !== undefined) {
            return rp.primaryLanguage.name;
          }
          return null;
        })
      );
      return _.uniq(_.flatten(list));
    } else {
      return [];
    }
  }
  getuniquetopics(data) {
    if (data) {
      let picked = _.map(data, "node").map((obj) =>
        _.pick(obj, ["repositoryTopics"])
      );
      const list = picked.map((rp) =>
        _.map(_.map(rp.repositoryTopics.nodes, "topic"), "name")
      );
      return _.uniq(_.flatten(list));
    } else {
      return [];
    }
  }
  updatedata(topicsfilter, languagefilter, sortoption) {
    // const topicsfilter = this.state.topicsfilter
    let filteredOnTopics = this.state.data;
    if (topicsfilter.length > 0) {
      let picked = _.map(this.state.data, "node").map((obj) =>
        _.pick(obj, ["repositoryTopics"])
      );
      const lists = picked.map((rp) =>
        _.map(_.map(rp.repositoryTopics.nodes, "topic"), "name")
      );
      const merged = lists.map((item) => _.intersection(topicsfilter, item));
      filteredOnTopics = this.state.data.filter(
        (key, value) => merged[value].length > 0
      );
    }
    let filteredOnLanguage = filteredOnTopics;
    if (languagefilter != null) {
      filteredOnLanguage = filteredOnTopics.filter((item) => {
        return (
          item.node.primaryLanguage &&
          item.node.primaryLanguage.name === languagefilter
        );
      });
    }
    let sortonstars = filteredOnLanguage;
    if (sortoption) {
      sortonstars = _.orderBy(
        sortonstars,
        (item) => item.node.stargazers.totalCount,
        sortoption
      );
    }
    if (sortonstars.length !== 0) {
      this.setState({ filtered: sortonstars });
    } else {
      this.setState({ filtered: this.state.data });
    }
  }
  settopicInput(newInputValue) {
    this.setState({ topicsfilter: newInputValue });
    this.updatedata(newInputValue, this.state.languagefilter, this.state.sort);
  }

  setlanguageInput(newInputValue) {
    this.setState({ languagefilter: newInputValue });
    this.updatedata(this.state.topicsfilter, newInputValue, this.state.sort);
  }
  handleChange(event) {
    this.setState({ searchname: event.target.value });
    this.fetchSearchResults(event.target.value);
  }
  radiochange = (event) => {
    this.setState({ sort: event.target.value });
    this.updatedata(
      this.state.topicsfilter,
      this.state.languagefilter,
      event.target.value
    );
  };
  addBookmark(repo) {
    const bookmark = [...this.state.bookmark, repo];
    this.setState({ bookmark });
    this.updateStatistics(bookmark)
  }
  removeBookmark(nameWithOwner) {
    const bookmark = this.state.bookmark.filter(k => k.node.nameWithOwner !== nameWithOwner);
    this.setState({ bookmark });
    this.updateStatistics(bookmark)
  }
  updateStatistics(bookmark) {
    let counts = new Map()
    bookmark.map((item)=> {
      if(item.node.primaryLanguage)
      {
        let languagecount = counts.get(item.node.primaryLanguage.name)
      
        counts.set(item.node.primaryLanguage.name, languagecount ? languagecount+1 : 1)
      }
      return counts
    })
    console.log(counts)
    let object = {};
    counts.forEach((value, key) => {
      var keys = key.split('.'),
          last = keys.pop();
      keys.reduce((r, a) => r[a] = r[a] || {}, object)[last] = value;
  });
    this.setState({countByLanguage: object})
  }
  reset(event) {
    this.setState({
      sort: "",
      filtered: this.state.data,
      topicsfilter: [],
      languagefilter: null,
      searchname: ""
    });
    this.fetchSearchResults("");
  }
  render() {
    const {
      error,
      isLoaded,
      filtered,
      sort,
      topicsfilter,
      languagefilter,
      searchname,
      countByLanguage
    } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <h1 className="App">Loading...</h1>;
    } else {
      return (
        <div className="App">
          <Typography variant="h3">
            Look for top GitHub repositories!
          </Typography>
          <Form
            filtered={filtered}
            sort={sort}
            topicsfilter={topicsfilter}
            languagefilter={languagefilter}
            searchname={searchname}
            handleChange={this.handleChange}
            settopicInput={this.settopicInput}
            getuniquetopics={this.getuniquetopics}
            setlanguageInput={this.setlanguageInput}
            getuniquelanguages={this.getuniquelanguages}
            radiochange={this.radiochange}
            reset={this.reset}
          />
          <br></br>
          <Typography variant="h5">
          Statistics in Bookmarks:
          </Typography>
          <br></br>
          <TableContainer className="table" component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Language</TableCell>
                  <TableCell align="center">Count</TableCell>
                </TableRow>
              </TableHead>
              
                {(Object.keys(countByLanguage).length)? Object.keys(countByLanguage).map((key) => (
                  <TableBody>
                  <TableRow key={key}>
                    <TableCell align="center">{key}</TableCell>
                    <TableCell align="center">{countByLanguage[key]}</TableCell>
                  </TableRow>
                  </TableBody>
              )):
                <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>
                  <Typography align="center">
                    Nothing found in Bookmarks
                  </Typography>
                  </TableCell>
                </TableRow>
                </TableBody>}
            </Table>
          </TableContainer>
          <div className="flowers">{filtered.map(this.displayItems)}</div>
        </div>
      );
    }
  }
}
