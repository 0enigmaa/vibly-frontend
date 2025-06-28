import React, { useState } from "react";
import "./searchPost.scss";
import Post from "../../companeta/post/Post";
import { useInfoContext } from "../../context/context";

// Dummy manga posts data


const SearchPost = ({handleClick, handleOneUser}) => {
    const { allPost } = useInfoContext();
  
  const [searchTerm, setSearchTerm] = useState("");

  // Filter manga posts based on search term
  const filteredMangaPosts = allPost.filter((manga) =>
    manga.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-post-container">
      <a className="back_home" href="/"> 
        <i className="fa-solid fa-arrow-left"></i> Back home
      </a> 

      <div id="search-input-box" className="w-75 d-flex align-items-center justify-content-between">
        <h1 className="search-header"> Find Post</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Search by post content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="posts-container row m-0 p-0">
        {filteredMangaPosts.length > 0 ? (
          filteredMangaPosts.map((post) => (
          <div key={post._id} className="col-12 col-sm-12 col-md-6 col-lg-4 p-0"> <Post handleClick={handleClick} handleOneUser={handleOneUser} post={post} /></div>
          ))
        ) : (
          <div className="no-results">No manga posts found</div>
        )}
      </div>
    </div>
  );
};

export default SearchPost;
