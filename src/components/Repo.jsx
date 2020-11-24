import React, { Component } from "react";
import {Card, Typography, Link, Box, CardHeader, Avatar, CardContent, IconButton } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { GoRepoForked, GoStar, GoLinkExternal} from "react-icons/go";
const repoImages = require('repo-images')

class Repo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }
  componentDidMount() {
    this.fetchImages();
  }
  unique(repo, bookmark) {
    return bookmark.filter((book)=> {
      if(book.node.nameWithOwner===repo.nameWithOwner)
    return book }).length>0

  }
  fetchImages() {
    repoImages(this.props.repo.node.nameWithOwner).then(imagesList => {
      // an array of image objects
      this.setState({images: imagesList})
    })
  }
  changeDate = (date) => {
    const today = new Date(date);
    const options = {  year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  }
  render() {
    const repos = this.props.repo.node;
    const bookmark = this.props.bookmark;
    return (
      <Card style={{ width: 250,  margin: 10, boxShadow: "1px 2px 1px 1px #9E9E9E", backgroundColor: "#D2D8D0"}}>
        <CardHeader
        avatar={
          <Link href={repos.owner.url}>
            <Avatar aria-label="avatar" src={repos.owner.avatarUrl} className='avatar'>
            </Avatar>
          </Link>
        }
        action={
          <Box alignSelf="center">
            {(this.unique(repos,bookmark))?
            <IconButton aria-label="delete" onClick={this.props.removeBookmark}
            style={{color: "#265458"}}>
              <BookmarkIcon fontSize="large" />
            </IconButton>
            :
            <IconButton aria-label="delete" onClick={this.props.addBookmark}
            style={{color: "#265458"}}>
              <BookmarkBorderIcon fontSize="large" />
            </IconButton>
            }
            </Box>}
        title={ 
          <div>
          <Typography variant="title" style={{margin: 10, wordBreak: "break-word"}}>
            {repos.name}
          </Typography>

          <Link href={repos.url}>
          <GoLinkExternal size={16}/>          
          </Link> 
          </div>
        }
        subheader={
          <div>
            <Typography variant="subtitle2" style={{margin: 10, wordBreak: "break-word"}}>
          {this.changeDate(repos.updatedAt)}<br></br>
          </Typography>
        <Chip
        size="small"
        style={{margin: 2, color: "white", backgroundColor: "#667765"}}
        icon={<GoRepoForked size={16} style={{color: "white"}}/>}
        label={repos.forkCount}
        color="default"
      />
      <Chip
        size="small"
        color="default"
        style={{margin: 2, color: "white", backgroundColor: "#667765"}}
        icon={<GoStar color="yellow" size={16}/>}
        label={repos.stargazers.totalCount}
      />{(repos.primaryLanguage)?
      <Chip
        size="small"
        color="secondary"
        style={{margin: 2, color: "white", backgroundColor: "#265458"}}
        label={repos.primaryLanguage.name}
      />:""}
      </div>}
      />
      {/* {(this.state.images[0])?
        <img src={`${repos.url}/blob/master/${this.state.images[0].path}?raw=true`}
      alt="repo"
      width="300" style={{marginbottom: 10}}
      height="170"></img>:""} */}
      <CardContent>
        <Typography align="left" variant="subtitle2" color="textSecondary" component="p">
        {repos.description}
        </Typography>
      </CardContent >
      <Box style={{margin: 10}}>
        {(repos.repositoryTopics.nodes.length>0)?<Typography align="justify" variant="body2" color="textSecondary" component="p">
        Topics:
        </Typography>:""}
      {repos.repositoryTopics.nodes.map((item)=>{
        return <Chip
        size="small"
        color="default"
        style={{margin: 2, color: "white", backgroundColor: "#E34633"}}
        label={item.topic.name}
      />
      })}
      </Box>
    </Card>
    );
  }
}

export default Repo;