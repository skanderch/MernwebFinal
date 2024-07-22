import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import the CSS file

const Banner = () => {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false); // Start as not playing
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);

    const handleMusicToggle = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
    };

    const handleProgressChange = (e) => {
        const newTime = e.target.value;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);

            return () => {
                if (audio) {
                    audio.removeEventListener('timeupdate', handleTimeUpdate);
                    audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                }
            };
        }
    }, []);

    return (
        <div className="banner">
            
            <div className="slider" style={{ '--quantity': 8 }}>
                <div className="item" style={{ '--position': 1 }}><img src="images/dragon_1.jpg" alt="Dragon 1" /></div>
                <div className="item" style={{ '--position': 2 }}><img src="images/dragon_2.jpg" alt="Dragon 2" /></div>
                <div className="item" style={{ '--position': 3 }}><img src="images/dragon_3.jpg" alt="Dragon 3" /></div>
                <div className="item" style={{ '--position': 4 }}><img src="images/dragon_10.jpg" alt="Dragon 10" /></div>
                <div className="item" style={{ '--position': 5 }}><img src="images/bayonetta1.jpg" alt="Bayonetta1" /></div>
                <div className="item" style={{ '--position': 6 }}><img src="images/Pyke1.jpg" alt="Pyke1" /></div>
                <div className="item" style={{ '--position': 7 }}><img src="images/Avatar1.jpg" alt="Avatar1" /></div>
                <div className="item" style={{ '--position': 8 }}><img src="images/Devil1.jpg" alt="Devil1" /></div>
            </div>
            
            <div className="music-player">
                        <button onClick={handleMusicToggle} className="btn music-btn">
                            {isPlaying ? <i className="ri-pause-circle-line"></i> : <i className="ri-play-circle-line"></i>}
                        </button>
                        
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="volume-control"
                        />
                    </div>
                    <div className="buttons">
                        <button onClick={() => navigate('/login')} className="btn">Login</button>
                        <button onClick={() => navigate('/register')} className="btn">Register</button>
                    </div>
            <div className="content">
                <div className="left-side">
                    <div className="author">
                        <h1 data-content="清算">清算</h1>
                        <h2>WELCOME</h2>
                        
                    </div>
                    
                    
                </div>
                <div className="model"></div>
            </div>
            <audio ref={audioRef} src="/background-music.mp3" loop></audio>
        </div>
    );
}

export default Banner;
