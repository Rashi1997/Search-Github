import React from "react";
import "fontsource-roboto";
import data from "../data.js";
import Repo from "./Repo";
import Drawer from "./Drawer";
import _ from "lodash";

export default class Filtered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      message: "No results",
      data: [],
      filtered: [],
      cart: 0,
      searchname: "as",
      languagefilter: null,
      topicsfilter: [],
      sort: "",
      bookmark: [],
      countByLanguage: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.resetall = this.resetall.bind(this);
    this.radiochange = this.radiochange.bind(this);
    this.setlanguageInput = this.setlanguageInput.bind(this);
    this.getuniquelanguages = this.getuniquelanguages.bind(this);
    this.getuniquetopics = this.getuniquetopics.bind(this);
    this.settopicInput = this.settopicInput.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
    this.removeBookmark = this.removeBookmark.bind(this);
    this.displayItems = this.displayItems.bind(this);
    this.clearerror = this.clearerror.bind(this);
  }

  componentDidMount() {
    this.fetchSearchResults(this.state.searchname);
  }

  displayItems = (repo) => {
    return (
      <Repo
        repo={repo}
        addBookmark={() => this.addBookmark(repo)}
        removeBookmark={() => this.removeBookmark(repo.node.nameWithOwner)}
        bookmark={this.state.bookmark}
      ></Repo>
    );
  };

  fetchSearchResults = async (query) => {
    console.log(query);
    query = _.replace(query, new RegExp("[\\\\]+"), "\\");
    data(`"${query} in:name,description"`).then(
      (result) => {
        if (result.search.edges.length > 0) {
          console.log(result.search.edges.length);
          this.setState({
            isLoaded: true,
            message: "No results found",
            data: result.search.edges,
            filtered: result.search.edges,
          });
        } else if (query === "") {
          console.log(query);
          this.setState({
            message: "Type keyword...",
            data: [],
            filtered: [],
            error: "no query",
          });
        } else {
          this.setState({
            message: "No results found",
            data: [],
            filtered: [],
            error: "error",
          });
        }
      },
      (error) => {
        this.setState({
          isLoaded: true,
          message: "No results found",
          data: [],
          filtered: [],
          error: "error",
        });
      }
    );
    this.resetall();
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
      let op;
      if (sortoption === "asc") op = "asc";
      else op = "desc";
      console.log(op);
      sortonstars = _.orderBy(
        sortonstars,
        (item) => item.node.stargazers.totalCount,
        op
      );
    }
    if (sortonstars.length !== 0) {
      this.setState({ filtered: sortonstars });
    } else {
      this.setState({ filtered: sortonstars });
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
    this.setState({ searchname: event.target.value, error: null });
    this.fetchSearchResults(event.target.value);
    // this.resetall()
    this.updatedata(
      this.state.topicsfilter,
      this.state.languagefilter,
      this.state.sort
    );
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
    this.updateStatistics(bookmark);
  }
  removeBookmark(nameWithOwner) {
    const bookmark = this.state.bookmark.filter(
      (k) => k.node.nameWithOwner !== nameWithOwner
    );
    this.setState({ bookmark });
    this.updateStatistics(bookmark);
  }
  updateStatistics(bookmark) {
    let counts = new Map();
    bookmark.map((item) => {
      if (item.node.primaryLanguage) {
        let languagecount = counts.get(item.node.primaryLanguage.name);

        counts.set(
          item.node.primaryLanguage.name,
          languagecount ? languagecount + 1 : 1
        );
      }
      return counts;
    });
    console.log(counts);
    let object = {};
    counts.forEach((value, key) => {
      var keys = key.split("."),
        last = keys.pop();
      keys.reduce((r, a) => (r[a] = r[a] || {}), object)[last] = value;
    });
    this.setState({ countByLanguage: object });
  }
  reset(event) {
    this.setState({
      sort: "",
      filtered: this.state.data,
      topicsfilter: [],
      languagefilter: null,
      searchname: "",
    });
    this.fetchSearchResults("");
  }
  resetall(event) {
    this.setState({
      sort: "",
      topicsfilter: [],
      languagefilter: null,
    });
  }
  clearerror() {
    this.setState({
      error: null,
    });
  }
  render() {
    const {
      error,
      isLoaded,
      filtered,
      sort,
      topicsfilter,
      languagefilter,
      countByLanguage,
      message,
    } = this.state;
    return (
      <div className="App">
        <Drawer
          filtered={filtered}
          displayItems={this.displayItems}
          error={error}
          isLoaded={isLoaded}
          message={message}
          searchname={this.state.searchname}
          handleChange={this.handleChange}
          sort={sort}
          topicsfilter={topicsfilter}
          languagefilter={languagefilter}
          settopicInput={this.settopicInput}
          getuniquetopics={this.getuniquetopics}
          setlanguageInput={this.setlanguageInput}
          getuniquelanguages={this.getuniquelanguages}
          radiochange={this.radiochange}
          reset={this.reset}
          countByLanguage={countByLanguage}
          clearerror={this.clearerror}
        />
      </div>
    );
  }
}
