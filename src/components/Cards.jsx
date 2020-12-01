import React from "react";
import RingLoader from "react-spinners/RingLoader";
import Repo from "./RepoCard";

/**
 * This component loads the cards for each repository
 * in the filtered state or the bookmarks. This component
 * is reused both in Bookmarks.jsx and Drawer.jsx components.
 * It also checks for error from API call and the isLoaded 
 * state before displaying cards.
 * 
 * States: 
 * 
 * Props: 
 *         bookmark
 *         filtered
 *         addBookmark
 *         removeBookmark
 *         error
 *         isLoaded
 *
 * Child Components: 
 *        RepoCard.jsx
 */
export default function Cards(props) {
  const displayItems = (repo) => {
    return (
      <Repo
        repo={repo}
        addBookmark={() => props.addBookmark(repo)}
        removeBookmark={() => props.removeBookmark(repo.node.nameWithOwner)}
        bookmark={props.bookmark}
      ></Repo>
    );
  };
  if (props.error === "no query") {
    return <h1>Type keyword...</h1>;
  } 
  else if (props.type === "bookmarks") {
    return props.filtered.length > 0 ? (
      <div className="flowers">{props.filtered.map(displayItems)}</div>
    ) : "";
  } else if (props.error === "error" || props.error) {
    return <h1>No results found</h1>;
  } else if (!props.isLoaded) {
    return <RingLoader size={150} color={"#265458"} loading="true" />;
  } else {
    return props.filtered.length > 0 ? (
      <div className="flowers">{props.filtered.map(displayItems)}</div>
    ) : (
      <RingLoader size={150} color={"#265458"} loading="true" />
    );
  }
}
