import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FaPlay, FaStop } from 'react-icons/fa'; // Import the stop icon too
import useSound from 'use-sound';
import satarng from '/Satranga.mp3'; // Ensure this path is correct
import Home from './Pages/Home';
import Page2 from './Pages/Page2';
import Page3 from './Pages/Page3';
import Last from './Pages/Last';
import YesPage from './Pages/YesPage';
import MyHeart from './Pages/MyHeart';

const App = () => {
  const [play, { stop }] = useSound(satarng, { volume: 0.5 });
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  // Automatically play music on app startup
  useEffect(() => {
    play();
    setIsPlaying(true);
  }, [play]);

  return (
    <>
      <BrowserRouter>
        <button onClick={toggleSound} style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
          {isPlaying ? (
            <>
              <FaStop style={{ marginRight: '5px' }} /> Stop Music
            </>
          ) : (
            <>
              <FaPlay style={{ marginRight: '5px' }} /> Play Music
            </>
          )}
        </button>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Plz' element={<Page2 />} />
          <Route path='/I_Love_you' element={<Page3 />} />
          <Route path='/Ny_Me_Ny' element={<Last />} />
          <Route path='/Yes' element={<YesPage />} />
          <Route path='/My_Heart' element={<MyHeart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
