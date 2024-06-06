import React from 'react';
import './Content.css';
import { Link } from 'react-router-dom';

function Content({ id ,thumbnail, channelLogo, liveName, creatorName, viewers }) {
  return (
    <div>
      <div className='card'>
        <div className='thumb'>
        <Link to={`/HostLive/?id=${id}`}>
          <img src={thumbnail} alt="Thumbnail" />
        </Link>
        </div>
        <div className='about'>
          <div className='Chanal'>
            <img src={channelLogo} alt="Channel Logo" />
          </div>
          <div className='Detail-live'>
            <div className='live-name'>{liveName}</div>
            <div className='creater-name'>{creatorName}</div>
            <div className='view'>{viewers} viewers</div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Content;
