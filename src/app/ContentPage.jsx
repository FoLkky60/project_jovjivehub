import React from "react";
import Navbar from "../components/nav/MyNavbar";
import Content from "../components/content/Content";
import "./ContentPage.css";
import CreateRoom from "../components/content/CreateRoom";

const contentData = [
  {
    thumbnail: './imges/1.jpg',
    channelLogo: './imges/4.jpg',
    liveName: 'เหงาจาง',
    creatorName: 'Folk',
    viewers: 2380,
  },
  {
    thumbnail: './imges/2.jpg',
    channelLogo: './imges/6.jpg',
    liveName: 'Another Live',
    creatorName: 'John',
    viewers: 1500,
  },
  {
    thumbnail: './imges/4.jpg',
    channelLogo: './imges/8.jpg',
    liveName: 'Yet Another Live',
    creatorName: 'Jane',
    viewers: 980,
  },
  {
    thumbnail: './imges/1.jpg',
    channelLogo: './imges/4.jpg',
    liveName: 'เหงาจาง',
    creatorName: 'Folk',
    viewers: 2380,
  },
  {
    thumbnail: './imges/2.jpg',
    channelLogo: './imges/6.jpg',
    liveName: 'Another Live',
    creatorName: 'John',
    viewers: 1500,
  },
  {
    thumbnail: './imges/4.jpg',
    channelLogo: './imges/8.jpg',
    liveName: 'Yet Another Live',
    creatorName: 'Jane',
    viewers: 980,
  },
  {
    thumbnail: './imges/1.jpg',
    channelLogo: './imges/4.jpg',
    liveName: 'เหงาจาง',
    creatorName: 'Folk',
    viewers: 2380,
  },
  {
    thumbnail: './imges/2.jpg',
    channelLogo: './imges/6.jpg',
    liveName: 'Another Live',
    creatorName: 'John',
    viewers: 1500,
  },
  {
    thumbnail: './imges/4.jpg',
    channelLogo: './imges/8.jpg',
    liveName: 'Yet Another Live',
    creatorName: 'Jane',
    viewers: 980,
  },
  {
    thumbnail: './imges/1.jpg',
    channelLogo: './imges/4.jpg',
    liveName: 'เหงาจาง',
    creatorName: 'Folk',
    viewers: 2380,
  },
  {
    thumbnail: './imges/2.jpg',
    channelLogo: './imges/6.jpg',
    liveName: 'Another Live',
    creatorName: 'John',
    viewers: 1500,
  },
  {
    thumbnail: './imges/4.jpg',
    channelLogo: './imges/8.jpg',
    liveName: 'Yet Another Live',
    creatorName: 'Jane',
    viewers: 980,
  },
  {
    thumbnail: './imges/1.jpg',
    channelLogo: './imges/4.jpg',
    liveName: 'เหงาจาง',
    creatorName: 'Folk',
    viewers: 2380,
  },
  {
    thumbnail: './imges/2.jpg',
    channelLogo: './imges/6.jpg',
    liveName: 'Another Live',
    creatorName: 'John',
    viewers: 1500,
  },
  {
    thumbnail: './imges/4.jpg',
    channelLogo: './imges/8.jpg',
    liveName: 'Yet Another Live',
    creatorName: 'Jane',
    viewers: 980,
  },
  
];

function ContentPage() {
  return (
    <>
      <Navbar />
      <div className="feed-head"> Anonymous <br/> Live Feed</div>
      <div className="Live_text">อีเว้นตอนนี้</div>
      <CreateRoom />
      <div className="conTainerForm">
        <div className="itemCon">
          {contentData.map((data, index) => (
            <Content
              key={index}
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
