import React from 'react';
import '../App.css';
import { Button } from './Button';
import { Button2 } from './button2';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>Flood simulation mapping</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button2
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH EXAMPLE SIMULATION <i className='far fa-play-circle' />
        </Button2>
      </div>
    </div>
  );
}

export default HeroSection;