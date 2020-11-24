import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import {Card, Typography, Link, Box, CardActions, CardHeader, Avatar, CardContent, IconButton } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { GoRepoForked, GoStar, GoLinkExternal, GoBookmark} from "react-icons/go";
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
      <Card style={{  margin: 10}}>
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
            <IconButton aria-label="delete" onClick={this.props.removeBookmark}>
              <BookmarkIcon fontSize="large" />
            </IconButton>
            :
            <IconButton aria-label="delete" onClick={this.props.addBookmark}>
              <BookmarkBorderIcon fontSize="large" />
            </IconButton>
            }
            </Box>}
        title={
          <Typography variant="h6" style={{margin: 10}}>
            {repos.name}
            <Link href={repos.url}>
              <GoLinkExternal size={16}/>          
            </Link> 
          </Typography>
        }
        subheader={
          <div>

          {this.changeDate(repos.updatedAt)}<br></br>
        <Chip
        size="small"
        style={{margin: 2}}
        icon={<GoRepoForked size={24} />}
        label={repos.forkCount}
        color="default"
      />
      <Chip
        size="small"
        color="default"
        style={{margin: 2}}
        icon={<GoStar color="yellow" size={24} />}
        label={repos.stargazers.totalCount}
      />{(repos.primaryLanguage)?
      <Chip
        size="small"
        color="secondary"
        style={{margin: 2}}
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
        <Typography align="justify" variant="body1" color="textSecondary" component="p">
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
        style={{margin: 2}}
        label={item.topic.name}
      />
      })}
      </Box>
    </Card>
    );
  }
}

export default Repo;