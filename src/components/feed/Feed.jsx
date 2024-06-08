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
  const [userData, setUserData] = useState(null);
  const [authorNames, setAuthorNames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const cookie = new Cookies();
      const uid = cookie.get("UID");
      if (uid) {
        try {
          const response = await axios.get(
            "http://localhost:5001/api/getUserDataByID",
            {
              params: { UID: uid },
              headers: { "Content-Type": "application/json" },
            }
          );
          setUserData(response.data.userDate);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchData();
  }, []);

  const getNamebyId = async (uid) => {
    if (uid) {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/getUserDataByID",
          {
            params: { UID: uid },
            headers: { "Content-Type": "application/json" },
          }
        );
        return response.data.userDate.username;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return "Anonymous"; // Return a default value in case of error
      }
    }
    return "Anonymous"; // Return a default value if no UID is provided
  };

  useEffect(() => {
    const fetchPostsAndAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/getAllposts");
        const sortedPosts = response.data.sort(
          (a, b) => new Date(b.createDate) - new Date(a.createDate)
        );
        setPosts(sortedPosts);

        const authorIds = [...new Set(sortedPosts.map(post => post.author))];
        const authorNamesTemp = {};

        for (const id of authorIds) {
          authorNamesTemp[id] = await getNamebyId(id);
        }

        setAuthorNames(authorNamesTemp);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPostsAndAuthors();
  }, []);

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
        author: userData._id || "Anonymous",
        profilePic: "./imges/1.jpg",
        dateTime: postDateTime,
      };
      setPosts([...posts, newPost]);
      setInputText("");
    }
  };

  const handleLike = async (postId, date ,author ) => {
    console.log(postId, date, 'user',userData._id, 'post onw',author);

    try {
      // const newMeet = {
      //   postId, meetDate:date,userData._id, author,
      // }
      const response = await axios.post(
        `http://localhost:5001/api/posts/${postId}/like`,

      );
      const updatedPosts = posts.map((post) =>
        post._id === postId ? response.data : post
      );
      const sortedPosts = updatedPosts.sort(
        (a, b) => new Date(b.createDate) - new Date(a.createDate)
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error liking post:", error);
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

  const handleAddComment = async () => {
    if (commentText.trim() !== "") {
      try {
        const response = await axios.post(
          `http://localhost:5001/api/posts/${currentPostId}/comments`,
          { text: commentText, author: userData?.username || "Anonymous" }
        );
        const updatedPosts = posts.map((post) =>
          post._id === currentPostId ? response.data : post
        );
        const sortedPosts = updatedPosts.sort(
          (a, b) => new Date(b.createDate) - new Date(a.createDate)
        );
        setPosts(sortedPosts);
        setCommentText("");
        setShowCommentPopup(false);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

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
        {posts.map((post) => (
          <div key={post._id} className="post">
            <div className="post-header">
              <img
                src={post.profilePic}
                alt="Profile"
                className="profile-pic"
              />
              <span className="author-name">
                {authorNames[post.author] || "Loading..."}
              </span>
            </div>
            <div className="post-content">{post.text}</div>
            <div className="post-datetime">{post.dateTime}</div>
            <div className="comment-section">
              <button
                onClick={() => handleLike(post._id, post.dateTime, post.author)}
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
