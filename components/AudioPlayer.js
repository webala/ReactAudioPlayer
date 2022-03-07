import React, {useState, useRef,useEffect} from 'react';
import styles from '../styles/AudioPlayer.module.css';
import {BsArrowLeftShort, BsArrowRightShort} from 'react-icons/bs';
import {FaPlay, FaPause} from 'react-icons/fa'



function AudioPlayer() {
    //state
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)

    //references
    const audioPlayer = useRef() //refer to our audio player

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds);
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]); //onlu run useEffect when metadata is loaded(pause, play), and audioplayer is ready


    const calculateTime = secs => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePausePlay = () => {

        const prevValue = isPlaying;

        setIsPlaying(!prevValue);

        if (prevValue) {  //pause and play are html dom functions. Current refers to the current element
            audioPlayer.current.play();
        } else {
            audioPlayer.current.pause();
        }
    }

    return (
        <div className={styles.audioPlayer}>
            <audio ref={audioPlayer}>
                <source src='' type='audio/mp3'/>
            </audio>

            <button className={styles.forwardBackward}> <BsArrowLeftShort/> 30 </button>

            <button className={styles.playPause} onClick={togglePausePlay}>
                {isPlaying ? <FaPause /> : <FaPlay className={styles.play}/>}
            </button>

            <button className={styles.forwardBackward}>30 <BsArrowRightShort /></button>


            <div className={styles.currentTime}>0.00</div>

            <div>
                <input type='range' className={styles.progressBar}/>
            </div>
            
            <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        </div>
    )
}

export {AudioPlayer}
