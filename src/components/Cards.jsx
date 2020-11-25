import React from 'react';


export default function Cards(props) {
  if(props.error==="no query"){
    return <h1>Type keyword to display cards...</h1>;
  }
  else if (props.error==="error" || props.error) {
    return <h1>No results found</h1>;
  } 
  else if (!props.isLoaded) {
    return <h1 className="App">Loading...</h1>
  } else {
  return (
    
    (props.filtered.length>0)?<div className="flowers">{props.filtered.map(props.displayItems)}</div>:<h1 className="App">Loading...</h1>
  );
}
}