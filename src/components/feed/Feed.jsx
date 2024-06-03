import React, { useState } from "react";
import './Feed.css'; // Import CSS file for styling

function Feed() {
  const [inputText, setInputText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [posts, setPosts] = useState([]);
  const [showCommentPopup, setShowCommentPopup] = useState(false); 
  const [currentPostId, setCurrentPostId] = useState(null);

  const handlePostInputChange = (e) => {
    setInputText(e.target.value);
  };

//   const handleCommentInputChange = (e) => {
//     setCommentText(e.target.value);
//   };

  const handlePost = () => {
    if (inputText.trim() !== "") {
      const newPost = {
        id: Math.random().toString(36).substring(7),
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
    if (currentPostId === postId && showCommentPopup) {
      setShowCommentPopup(false); // Close comment popup if the same post button is clicked again
    } else {
      setCurrentPostId(postId); // Set current post ID for commenting
      setShowCommentPopup(true); // Show comment popup when button is clicked
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
        <button onClick={handlePost} className="post-button">Post</button> 
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
