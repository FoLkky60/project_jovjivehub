import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Feed.css"; // Import CSS file for styling
import { Cookies } from "react-cookie";

function Feed() {
  const [inputText, setInputText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [posts, setPosts] = useState([]);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  const handlePostInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleCommentInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleDateTimeChange = (e) => {
    setPostDateTime(e.target.value);
  };

  const handlePost = async () => {
    if (inputText.trim() !== "" && postDateTime.trim() !== "") {
      const newPost = {
        text: inputText,
        author: "John Doe", 
        profilePic: "./imges/1.jpg", 
        likes: 0,
        comments: [] 
      };
      setPosts([...posts, newPost]);
      setInputText("");
    }
  };

  const handleLike = (postId) => {
    const postIndex = posts.findIndex(post => post.id === postId);
    if (posts[postIndex].liked) {
      return; 
    }
    const updatedPosts = [...posts];
    updatedPosts[postIndex] = { ...updatedPosts[postIndex], likes: updatedPosts[postIndex].likes + 1, liked: true };
    setPosts(updatedPosts);
  };

  const handleCommentButtonClick = (postId) => {
    const post = posts.find(post => post.id === postId);
    if (post) {
      setCurrentPostId(postId);
      setShowCommentPopup(!showCommentPopup); // Toggle the comment popup visibility
    }
  };

//   const handleSubmitComment = () => {
//     const trimmedComment = commentText.trim();
//     if (trimmedComment !== "") {
//       const updatedPosts = posts.map(post => {
//         if (post.id === currentPostId) {
//           return { ...post, comments: [...post.comments, trimmedComment] };
//         }
//         return post;
//       });
//       setPosts(updatedPosts);
      
//       setCommentText(""); 
//     }
//   };

  return (
    <div className="feed-container"> 
     
      <div>                                         
        <input
          value={inputText}
          onChange={handlePostInputChange}
          placeholder="Type your message here..."
          className="message-input"
        />
        <input
          type="datetime-local"
          value={postDateTime}
          onChange={handleDateTimeChange}
          className="datetime-input"
        />
        <button onClick={handlePost} className="post-button">
          Post
        </button>
      </div>
      <div className="post-list"> 
        {posts.map(post => (
          <div key={post.id} className="post"> 
            <div className="post-header"> 
              <img src={post.profilePic} alt="Profile" className="profile-pic" /> 
              <span className="author-name">{post.author}</span> 
            </div>
            <div className="post-content">{post.text}</div> 
            
            <div className="comment-section"> 
              <button onClick={() => handleLike(post.id)} className="like-buttons">
                <span className="material-symbols-outlined">
                    favorite
                </span>
              </button> 
              <button onClick={() => handleCommentButtonClick(post.id)} className="comment-buttons">
                <span className="material-symbols-outlined">
                  add
                </span>
              </button> 
            </div>
              
            
          </div>
        ))}
      </div>

      {/* {showCommentPopup && (
        <div className="comment-popup">
            
          <input
            value={commentText}
            onChange={handleCommentInputChange}
            placeholder="Add a comment..."
            className="comment-input" 
          />
          <button onClick={handleSubmitComment} className="post-buttons">
            <span className="material-symbols-outlined">
                send
            </span>
          </button>
          <ul className="comment-list">
            {posts
              .filter(post => post.id === currentPostId)
              .flatMap(post => post.comments)
              .map((comment, index) => (
                <li key={index} className="comment">{comment}</li> 
                
              ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

export default Feed;
