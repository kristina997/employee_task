import React from 'react';
import home from './home.gif';
import home1 from './home1.png';

function Home() {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh', // setting the height of the parent div to the height of the screen
      }}>
        <img src={home1} id="img-s"/>
        <img src={home} alt="GIF" style={{
          width: '45%', // setting the width of the image to 50% of the width of the parent div.
          margin: '0 auto', // centering the image horizontall
        }} />
        <img src={home1} id="img-s"/>
      </div>
    );
  }
export default Home;