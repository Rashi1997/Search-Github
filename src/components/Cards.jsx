import React from "react";
import RingLoader from "react-spinners/RingLoader";

export default function Cards(props) {
  if (props.error === "no query") {
    return <h1>Type keyword...</h1>;
  } else if (props.error === "error" || props.error) {
    return <h1>No results found</h1>;
  } else if (!props.isLoaded) {
    return <RingLoader size={150} color={"#265458"} loading="true" />;
  } else {
    return props.filtered.length > 0 ? (
      <div className="flowers">{props.filtered.map(props.displayItems)}</div>
    ) : (
      <RingLoader size={150} color={"#265458"} loading="true" />
    );
  }
}
