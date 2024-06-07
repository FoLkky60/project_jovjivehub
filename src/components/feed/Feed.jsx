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
  const [postDateTime, setPostDateTime] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getAllposts");
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

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
        profilePic: "./images/1.jpg",
        dateTime: postDateTime,
      };
      try {
        const response = await axios.post(
          "http://localhost:5000/api/posts",
          newPost
        );
        setPosts([...posts, response.data]);
        setInputText("");
        setPostDateTime("");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/like`
      );
      const updatedPosts = posts.map((post) =>
        post.id === postId ? response.data : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentButtonClick = (postId) => {
    if (currentPostId === postId && showCommentPopup) {
      setShowCommentPopup(false); // Close comment popup if the same post button is clicked again
    } else {
      setCurrentPostId(postId); // Set current post ID for commenting
      setShowCommentPopup(true); // Show comment popup when button is clicked
    }
  };

  const handleAddComment = async () => {
    if (commentText.trim() !== "") {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/posts/${currentPostId}/comments`,
          { text: commentText, author: "Jane Doe" }
        );
        const updatedPosts = posts.map((post) =>
          post.id === currentPostId ? response.data : post
        );
        setPosts(updatedPosts);
        setCommentText("");
        setShowCommentPopup(false);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <div className="feed-container">
      <div className="create-post-container">
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
        {posts.map((post) => (
          <div key={post._id} className="post">
            <div className="post-header">
              <img
                src={post.profilePic}
                alt="Profile"
                className="profile-pic"
              />
              <span className="author-name">{post.author}</span>
            </div>
            <div className="post-content">{post.text}</div>
            <div className="post-datetime">{post.dateTime}</div>
            <div className="comment-section">
              <button
                onClick={() => handleLike(post._id)}
                className="like-buttons"
              >
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button
                onClick={() => handleCommentButtonClick(post._id)}
                className="comment-buttons"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            {showCommentPopup && currentPostId === post._id && (
              <div className="comment-popup">
                <input
                  value={commentText}
                  onChange={handleCommentInputChange}
                  placeholder="Type your comment here..."
                  className="comment-input"
                />
                <button
                  onClick={handleAddComment}
                  className="add-comment-button"
                >
                  Add Comment
                </button>
              </div>
            )}
            <div className="comments-list">
              {post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <span className="comment-author">{comment.author}</span>:{" "}
                  {comment.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
