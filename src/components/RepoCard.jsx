import React, { Component } from "react";
import {
  Card,
  Typography,
  Box,
  CardHeader,
  Avatar,
  CardContent,
  IconButton,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { GoRepoForked, GoStar, GoLinkExternal } from "react-icons/go";

class Repo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }
  unique(repo, bookmark) {
    return (
      bookmark.filter((book) => {
        if (book.node.nameWithOwner === repo.nameWithOwner) return book;
      }).length > 0
    );
  }
  changeDate = (date) => {
    const today = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return today.toLocaleDateString(undefined, options);
  };
  render() {
    const repos = this.props.repo.node;
    const bookmark = this.props.bookmark;
    return (
      <Card
        style={{
          width: 300,
          margin: 10,
          boxShadow: "1px 2px 1px 1px #9E9E9E",
          backgroundColor: "#F4F7F2",
        }}
      >
        <CardHeader
          avatar={
            <a href={repos.owner.url} target="_blank" rel="noreferrer">
              <Avatar
                aria-label="avatar"
                src={repos.owner.avatarUrl}
                className="avatar"
              ></Avatar>
            </a>
          }
          action={
            <Box alignSelf="center">
              {this.unique(repos, bookmark) ? (
                <IconButton
                  aria-label="delete"
                  onClick={this.props.removeBookmark}
                  style={{ color: "#265458" }}
                >
                  <BookmarkIcon fontSize="large" />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="delete"
                  onClick={this.props.addBookmark}
                  style={{ color: "#265458" }}
                >
                  <BookmarkBorderIcon fontSize="large" />
                </IconButton>
              )}
            </Box>
          }
          title={
            <div>
              <Typography
                variant="h6"
                style={{ margin: 10, wordBreak: "break-word" }}
              >
                {repos.name}
              </Typography>

              <a href={repos.url} target="_blank" rel="noreferrer">
                <GoLinkExternal size={24} />
              </a>
            </div>
          }
          subheader={
            <div>
              <Typography
                variant="subtitle1"
                style={{ margin: 10, wordBreak: "break-word" }}
              >
                {this.changeDate(repos.updatedAt)}
                <br></br>
              </Typography>
              <Chip
                size="small"
                style={{
                  margin: 2,
                  color: "white",
                  backgroundColor: "#667765",
                }}
                icon={<GoRepoForked size={16} style={{ color: "white" }} />}
                label={repos.forkCount}
                color="default"
              />
              <Chip
                size="small"
                color="default"
                style={{
                  margin: 2,
                  color: "white",
                  backgroundColor: "#667765",
                }}
                icon={<GoStar color="yellow" size={16} />}
                label={repos.stargazers.totalCount}
              />
              {repos.primaryLanguage ? (
                <Chip
                  size="small"
                  color="secondary"
                  style={{
                    margin: 2,
                    color: "white",
                    backgroundColor: "#265458",
                  }}
                  label={repos.primaryLanguage.name}
                />
              ) : (
                ""
              )}
            </div>
          }
        />
        <CardContent>
          <Typography
            align="left"
            variant="body1"
            color="textSecondary"
            component="p"
          >
            {repos.description}
          </Typography>
        </CardContent>
        <Box style={{ margin: 10 }}>
          {repos.repositoryTopics.nodes.length > 0 ? (
            <Typography
              align="justify"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              Topics:
            </Typography>
          ) : (
            ""
          )}
          {repos.repositoryTopics.nodes.map((item) => {
            return (
              <Chip
                size="small"
                color="default"
                style={{
                  margin: 2,
                  color: "white",
                  backgroundColor: "#E34633",
                }}
                label={item.topic.name}
              />
            );
          })}
        </Box>
      </Card>
    );
  }
}

export default Repo;
