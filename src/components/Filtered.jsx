import React from "react";
import "fontsource-roboto";
import data from "../data.js";
import Drawer from "./Drawer";
import _ from "lodash";
 
/**
 * This component does the Github API call and does
 * the filtering/sorting. It also has props and methods
 *  to aggregate bookmarks.
 * 
 * States: 
 *        error
 *        isLoaded
 *        data
 *        filtered
 *        searchname
 *        languagefilter
 *        topicsfilter
 *        sort
 *        bookmark
 *        countByLanguageTopics
 * 
 * Props: 
 * 
 * Child Components: 
 *        Drawer.jsx
 */
export default class Filtered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /** error while loading data. */
      error: null,
      /** boolean for whether the  API has loaded data. */
      isLoaded: false,
      /** state to store the repository data */
      data: [],
      /** state to store the filtered repository */
      filtered: [],
      /** storing the search keyword */
      searchname: "as",
      /** state to store the selected language filter */
      languagefilter: null,
      /** state to store the selected topics filters */
      topicsfilter: [],
      /** state to store the selected sort filter */
      sort: "",
      /** state to store the bookmarked repositories */
      bookmark: [],
      /** state to store aggregate of language and topics
       *  totals in bookmarks */
      countByLanguageTopics: {},
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
  }

  componentDidMount() {
    this.fetchSearchResults(this.state.searchname);
  }

  fetchSearchResults = async (query) => {
    query = _.replace(query, new RegExp("[\\\\]+"), "\\");
    data(`"${query} in:name,description"`).then(
      (result) => {
        if (result.search.edges.length > 0) {
          this.setState({
            isLoaded: true,
            data: result.search.edges,
            filtered: result.search.edges,
          });
        } else if (query === "") {
          this.setState({
            data: [],
            filtered: [],
            error: "no query",
          });
        } else {
          this.setState({
            data: [],
            filtered: [],
            error: "error",
          });
        }
      },
      (error) => {
        this.setState({
          isLoaded: true,
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
        let languagecount = counts.get(item.node.primaryLanguage.name.toLowerCase());

        counts.set(
          item.node.primaryLanguage.name.toLowerCase(),
          languagecount ? languagecount + 1 : 1
        );
      }
      if(item.node.repositoryTopics){
        let topic = item.node.repositoryTopics.nodes
        topic.map((item)=>item.topic.name).forEach((topic)=>{
          let languagecount = counts.get(topic.toLowerCase());

        counts.set(
          topic.toLowerCase(),
          languagecount ? languagecount + 1 : 1
        );
      })
      }
      return counts;
    });
    let object = {};
    counts.forEach((value, key) => {
      var keys = key.split("."),
        last = keys.pop();
      keys.reduce((r, a) => (r[a] = r[a] || {}), object)[last] = value;
    });
    this.setState({ countByLanguageTopics: object });
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
  render() {
    const {
      error,
      isLoaded,
      filtered,
      sort,
      topicsfilter,
      languagefilter,
      countByLanguageTopics,
      bookmark
    } = this.state;
    return (
      <div className="App">
        <Drawer
          searchname={this.state.searchname}
          handleChange={this.handleChange}
          topicsfilter={topicsfilter}
          settopicInput={this.settopicInput}
          getuniquetopics={this.getuniquetopics}
          filtered={filtered}
          languagefilter={languagefilter}
          setlanguageInput={this.setlanguageInput}
          getuniquelanguages={this.getuniquelanguages}
          sort={sort}
          radiochange={this.radiochange}
          reset={this.reset}
          addBookmark={this.addBookmark}
          removeBookmark={this.removeBookmark}
          bookmark={bookmark}
          countByLanguageTopics={countByLanguageTopics}
          error={error}
          isLoaded={isLoaded}
        />
      </div>
    );
  }
}
