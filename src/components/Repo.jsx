import React, { Component } from "react";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {Card, Typography, Link, Box, CardMedia } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { GoRepoForked, GoStar, GoLinkExternal} from "react-icons/go";


class Repo extends Component {

  changeDate = (date) => {
    const today = new Date(date);
    const options = {  year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  }
  render() {
    const repos = this.props.repo.node;
    return (
      <Card style={{width:300, margin: 10}}>
      <Typography variant="h4" style={{margin: 10}}>
        {repos.name}
      </Typography>
      <Typography variant="h8" style={{margin: 10}}>
        <Link href={repos.url}>
        {repos.nameWithOwner}
          <GoLinkExternal size={16}/>          
        </Link> 
      </Typography>

      <br></br>
      <Chip
        size="small"
        style={{margin: 10}}
        icon={<GoRepoForked size={24} />}
        label={repos.forkCount}
        color="default"
      />
      <Chip
        size="small"
        color="default"
        style={{margin: 10}}
        icon={<GoStar color="yellow" size={24} />}
        label={repos.stargazers.totalCount}
      />
      <br></br>
      <Typography variant="h5" style={{margin: 10}}>
        {repos.description}
      </Typography>
      <Typography variant="h8" style={{margin: 10}}>
        <Box fontWeight="fontWeightBold">
        {(repos.primaryLanguage)?repos.primaryLanguage.name:""}
        
        </Box>
      </Typography>
      <Typography variant="h7" style={{margin: 10}}>
        <Box fontWeight="fontWeightLight" fontFamily="Monospace">
      By: <Link href={repos.owner.url}><img src={repos.owner.avatarUrl} alt="card-img" height="30" width="30"></img></Link>
        </Box>
      </Typography>
      <Typography variant="h7" style={{margin: 10}}>
        <Box fontWeight="fontWeightLight" fontFamily="Monospace">
         Last updated: {this.changeDate(repos.updatedAt)}
        </Box>
      </Typography>
      
    </Card>
    );
  }
}

export default Repo;