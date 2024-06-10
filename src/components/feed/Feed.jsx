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
  const [likedPosts, setLikedPosts] = useState({});

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

  useEffect(() => {
    const fetchPostsAndLikes = async () => {
      try {
        const postsResponse = await axios.get(
          "http://localhost:5001/api/getAllposts"
        );
        const sortedPosts = postsResponse.data.sort(
          (a, b) => new Date(b.createDate) - new Date(a.createDate)
        );
        setPosts(sortedPosts);

        if (userData) {
          // console.log(userData);
          const likesResponse = await axios.get(
            "http://localhost:5001/api/getUserLikes",
            {
              params: { userId: userData._id },
              headers: { "Content-Type": "application/json" },
            }
          );
          // console.log("Likes response:", likesResponse);
          const likes = likesResponse.data.reduce((acc, like) => {
            // console.log(acc, like);
            acc[like._id] = true;
            return acc;
          }, {});
          setLikedPosts(likes);
          // console.log("Likes:", likes);
        }
      } catch (error) {
        console.error("Error fetching posts or likes:", error);
      }
    };

    fetchPostsAndLikes();
  }, [userData]);

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
        author: userData.username || "Anonymous",
        authorId: userData._id,
        profilePic: "./imges/prof.png",
        dateTime: postDateTime,
      };
      try {
        const response = await axios.post(
          "http://localhost:5001/api/posts",
          newPost
        );
        const updatedPosts = [response.data, ...posts];
        const sortedPosts = updatedPosts.sort(
          (a, b) => new Date(b.createDate) - new Date(a.createDate)
        );
        setPosts(sortedPosts);
        setInputText("");
        setPostDateTime("");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const handleLike = async (postId, date, authorId, member) => {
    try {
      const newMeet = {
        // postId: postId,
        // hostId: authorId,
        // memberId: member,
        // MeetdateTime: date,
        userId: member, // Ensure userId is included in the request body
      };
      // console.log(newMeet);

      // Toggle the like status in the database
      await axios.post(
        `http://localhost:5001/api/posts/${postId}/toggleLike`,
        newMeet
      );

      // Toggle the like status in the frontend state
      setLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [postId]: !prevLikedPosts[postId],
      }));

      try {
        console.log(likedPosts[postId]);
        if (!likedPosts[postId]) {
          const newMeet = {
            postId: postId,
            hostId: authorId,
            memberId: member,
            MeetdateTime: date,
            userId: member, // Ensure userId is included in the request body
          };

          const response = await axios.post(
            `http://localhost:5001/api/posts/${postId}/joins/`,
            newMeet
          );
          console.log("add");
        } else {
          const delMeet = {
            postId: postId,
            memberId: member,
          };
          const response = await axios.post(
            `http://localhost:5001/api/posts/${postId}/joins/del`,
            delMeet
          );
          console.log("del");
        }
      } catch (error) {
        console.error("Error liking post:", error);
      }
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
          `http://localhost:5001/api/posts/${currentPostId}/comments`,
          { text: commentText, author: userData.username }
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
        <div onClick={handlePost} className="post-button">
        <span class="material-symbols-outlined">
          send
          </span>
        </div>
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
              <span className="author-name">{post.author || "Loading..."}</span>
            </div>
            <div className="post-content">{post.text}</div>
            <div className="post-datetime">{post.dateTime}</div>

            <div className="comment-section">
              <button
                onClick={() =>
                  handleLike(
                    post._id,
                    post.dateTime,
                    post.authorId,
                    userData._id
                  )
                }
                className="like-buttons"
              >
                <span className="material-symbols-outlined">
                  {likedPosts[post._id] ? "check" : "add"}
                </span>
              </button>
              {post.likes.length}
              <button
                onClick={() => handleCommentButtonClick(post._id)}
                className="comment-buttons"
              >
                <span className="material-symbols-outlined">chat</span>
              </button>
            </div>
            {showCommentPopup && currentPostId === post._id && (
              <div className="comment-popup">
                <input
                  value={commentText}
                  onChange={handleCommentInputChange}
                  placeholder="Type your comment here..."
                  className="comment-input-feed"
                />
                <div
                  onClick={handleAddComment}
                  className="add-comment-button"
                >
                  <span class="material-symbols-outlined">
                  send
                  </span>
                </div>
              </div>
            )}
            <div className="comments-list">
            
              {post.comments.map((comment, index) => (
                <div key={index} className="commentFeed">
                  {/* <div className="comment-profile">
                    <img src='../../../public/imges/13.avif' alt="Profile" />
                  </div> */}
                  <div className="comment-content">
                    <div className="comment-author">{comment.author}:</div>
                    <div className="comment-text">{comment.text}</div>
                  </div>
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
