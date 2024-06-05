import React, {useState,useEffect }from "react";
import Navbar from "../components/nav/MyNavbar";
import Content from "../components/content/Content";
import "./ContentPage.css";
import CreateRoom from "../components/content/CreateRoom";
import axios from "axios";

function ContentPage() {
  const [contents, setContents] = useState([]);
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getAllPost');
        setContents(response.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContents();
  }, [contents]);

  // cnsole.log(contents);

  return (
    <>
      <Navbar />
      <div className="feed-head"> Anonymous <br/> Live Feed</div>
      <div className="Live_text">อีเว้นตอนนี้</div>
      <CreateRoom />
      <div className="conTainerForm">
        <div className="itemCon">
          {contents.map((data, index) => (
            <Content
              key={index}
              id = {data._id}
              thumbnail={data.thumbnail}
              channelLogo={data.channelLogo}
              liveName={data.liveName}
              creatorName={data.creatorName}
              viewers={data.viewers}
            />
          ))}
        </div>
      </div>
      <footer className="foot">ig :jogjivehub_01</footer>
    </>
  );
}

export default ContentPage;
