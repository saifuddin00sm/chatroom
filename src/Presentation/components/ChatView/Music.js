import React, { useRef, useState } from "react";
import "./Music.css";
import { BsFillPlayFill } from "react-icons/bs";
import { TbPlayerPauseFilled} from "react-icons/tb";
import { useEffect } from "react";

const Music = ({ file }) => {
  const audioRef = useRef(null);
  const chartRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function handlePlayAudio() {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function handleTimeUpdate() {
    const currentTime = audioRef.current.currentTime;
    setCurrentTime(currentTime);
    const el = chartRef.current.querySelectorAll('.play_chart');
    const width = Math.floor((currentTime / duration) * 45);

    for(let i=0; i < width; i++){
        el[i].classList.add('green');
    }
    if(currentTime === duration){
        setIsPlaying(!isPlaying);
    }
  }

  useEffect(()=> {
    setTimeout(() => {
        setDuration(!audioRef.current?.duration ? 0: audioRef.current.duration);
    }, 2000);
  }, []);


  useEffect(() => {
    if(currentTime === 0){
        const el = chartRef.current.querySelectorAll('.play_chart');
        el.forEach((elem)=> {
            elem.classList.remove('green')
        })
    }
  }, [currentTime])
  


  return (
    <div className="music_container">
      <audio className="audio_file" ref={audioRef} onTimeUpdate={handleTimeUpdate}>
        <source src={file} type="audio/mpeg" />
      </audio>
      <div className="frame-32-1">
        <div className="frame-323">
          {/* <img className="frame-4" src="/img/frame-4.svg" alt="Frame" /> */}
          <button className="play_btn" onClick={handlePlayAudio}>
            {isPlaying ? (
              <TbPlayerPauseFilled style={{
                height: "20px",
                width: "20px",
                color: "#09914f",
                cursor: "pointer",
              }} />
            ) : (
              <BsFillPlayFill
                style={{
                  height: "20px",
                  width: "20px",
                  color: "#09914f",
                  cursor: "pointer",
                }}
              />
            )}
          </button>
          <div className="frame-283" ref={chartRef}>
            <div className="play_chart rectangle-1"></div>
            <div className="play_chart rectangle-1-1"></div>
            <div className="play_chart rectangle-1"></div>
            <div className="play_chart rectangle-1-2"></div>
            <div className="play_chart rectangle-1"></div>
            <div className="play_chart rectangle-1-2"></div>
            <div className="play_chart rectangle-1"></div>
            <div className="play_chart rectangle-1-1"></div>
            <div className="play_chart rectangle-1"></div>
            <div className="play_chart rectangle-1-2"></div>
            <div className="play_chart rectangle-1"></div>
            <div className="play_chart rectangle-1-2"></div>
            <div className="play_chart rectangle-1"></div>
            <div className="play_chart rectangle-1-1"></div>
            <div className="play_chart rectangle-148"></div>
            <div className="play_chart rectangle-149"></div>
            <div className="play_chart rectangle-1-1"></div>
            <div className="play_chart rectangle-1"></div>
            <div className="play_chart rectangle-152"></div>
            <div className="play_chart rectangle-15"></div>
            <div className="play_chart rectangle-1-3"></div>
            <div className="play_chart rectangle-15"></div>
            <div className="play_chart rectangle-1-3"></div>
            <div className="play_chart rectangle-1-3"></div>
            <div className="play_chart rectangle-1-4"></div>
            <div className="play_chart rectangle-1-3"></div>
            <div className="play_chart rectangle-1-5"></div>
            <div className="play_chart rectangle-161"></div>
            <div className="play_chart rectangle-1-3"></div>
            <div className="play_chart rectangle-1-5"></div>
            <div className="play_chart rectangle-1-6"></div>
            <div className="play_chart rectangle-1-3"></div>
            <div className="play_chart rectangle-166"></div>
            <div className="play_chart rectangle-1-3"></div>
            <div className="play_chart rectangle-1-4"></div>
            <div className="play_chart rectangle-1-5"></div>
            <div className="play_chart rectangle-1-5"></div>
            <div className="play_chart rectangle-1-4"></div>
            <div className="play_chart rectangle-1-6"></div>
            <div className="play_chart rectangle-1-3"></div>
            <div className="play_chart rectangle-1-5"></div>
            <div className="play_chart rectangle-1-3"></div>
            <div className="play_chart rectangle-1-3"></div>
            <div className="play_chart rectangle-1-4"></div>
            <div className="play_chart rectangle-1-3"></div>
          </div>
        </div>
        <div className="text-3 inter-bold-jewel-14px" style={{color: '#087443', fontWeight: 'bold'}}>{currentTime  === 0 ? '00' : currentTime.toFixed()}:{duration?.toFixed()}</div>
      </div>
    </div>
  );
};

export default Music;
