import React from 'react';
import flagRightLogo from '../assets/img/logo.jpg';
import '../assets/css/ComingSoon.css'

export const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <img src={flagRightLogo} alt="flagRight Logo" className="logo" />
      <h1>Welcome to FlagRight</h1>
      <p>We're working hard to provide AML compliance & fraud protection on a centralized, no-code platform. Stay tuned!</p>
      <form>
        <input type="email" placeholder="Enter your email to stay updated" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};