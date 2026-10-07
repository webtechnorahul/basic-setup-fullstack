import React, { useState } from 'react';
import { AiOutlineVideoCamera, AiOutlinePlusSquare, AiOutlineUser } from 'react-icons/ai';
import '../styles/Footer.css';
import { FiSearch } from "react-icons/fi";
import { BsChatSquareTextFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

// Renders the bottom navigation and routes users to the main app sections.
export default function Footer() {
  const [activeTab, setActiveTab] = useState('reels');
  const navigate=useNavigate();
  return (
    <footer className="instagram-footer">
      {/* Video / Reels Button */}
      <button 
        onClick={() => {
          setActiveTab('reels')
          navigate('/dashboard');
        }}
        className={`footer-btn ${activeTab === 'reels' ? 'active' : ''}`}
      >
        <AiOutlineVideoCamera className="footer-icon" />
        <span className="footer-label">Reels</span>
      </button>

      {/* Post / Create Button */}
      <button 
        onClick={() => {
          setActiveTab('post')
          navigate('/createPost')
        }}
        className={`footer-btn ${activeTab === 'post' ? 'active' : ''}`}
      >
        <AiOutlinePlusSquare className="footer-icon" />
        <span className="footer-label">Post</span>
      </button>
      
      {/* chat button */}
      <button 
        onClick={() => {
          setActiveTab('chat');
          navigate("/chat");
        }}
        className={`footer-btn ${activeTab === 'chat' ? 'active' : ''}`}
      >
        <BsChatSquareTextFill className='footer-icon'/>
        <span className="footer-label">chat</span>
      </button>

      {/* search button */}
      <button 
        onClick={() => {
          setActiveTab('search')
          navigate("/search");
        }}
        className={`footer-btn ${activeTab === 'search' ? 'active' : ''}`}
      >
        
        <FiSearch className='footer-icon'/>
        <span className="footer-label">search</span>
      </button>

      {/* Profile Button */}
      <button 
        onClick={() => {
          setActiveTab('profile')
          navigate("/profile");
        }}
        className={`footer-btn ${activeTab === 'profile' ? 'active' : ''}`}
      >
        <AiOutlineUser className="footer-icon" />
        <span className="footer-label">Profile</span>
      </button>
    </footer>
  );
}
