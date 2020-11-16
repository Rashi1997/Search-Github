import './App.css';
import React from "react";
import 'fontsource-roboto';
import axios from 'axios';
import {Card, Typography, Link } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
// import data from './data.js';
import { GoRepoForked, GoStar, GoLinkExternal} from "react-icons/go";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: null,
      isLoaded: false,
      data: [],
      cart: 0,
      searchname: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchSearchResults("");
  }

  displayItems = (repo) => {
    return <Card style={{width:300, margin: 10}}>
      <Typography variant="h5" style={{margin: 10}}>
        {repo.name}
        <Link href={repo.html_url}>
          <GoLinkExternal size={24}/>          
        </Link> 
      </Typography>
      <Chip
        size="small"
        style={{margin: 10}}
        icon={<GoRepoForked size={24} />}
        label={repo.forks_count}
        color="default"
      />
      <Chip
        size="small"
        color="default"
        style={{margin: 10}}
        icon={<GoStar color="yellow" size={24} />}
        label={repo.stargazers_count}
      />
      
      <Typography style={{margin: 10}}>
        {repo.description}
      </Typography>
      
    </Card>
  }

  fetchSearchResults = async (query) => {
    if(query){
      const repoUrl = `https://api.github.com/search/repositories?q=${query}+in:name,description&sort=stars&order=desc`;
      axios.get(repoUrl).then((response) => {
        const repos = response.data.items
        this.setState({
          isLoaded: true,
          data: repos
        });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
      })
    }
    else {

      this.setState({
        isLoaded: true,
        data: []
      });
    }
    // data(`"${query} in:name,description"`)
    //   .then(
    //     (result) => {
    //       this.setState({
    //         isLoaded: true,
    //         data: result.search.edges
    //       });
    //     },
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )
  }

  handleChange(event) {
    this.setState({searchname: event.target.value});
    this.fetchSearchResults(event.target.value);
  }
  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <h1 className="App">Loading...</h1>;
    } else {
      return (
        <div className="App">
          <Typography variant="h4">Look for top 10 GitHub repositories!</Typography>
          <form onSubmit={this.handleSubmit}>
            <label>
              Keyword:
              <input type="text" value={this.state.searchname} onChange={this.handleChange} />
            </label>
          </form>
          <div className="flowers">
            {data.map(this.displayItems)}
          </div>
        </div>
      );
    }
  }
}