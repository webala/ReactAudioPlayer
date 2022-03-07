import React, {useState, useRef,useEffect} from 'react';
import styles from '../styles/AudioPlayer.module.css';
import {BsArrowLeftShort, BsArrowRightShort} from 'react-icons/bs';
import {FaPlay, FaPause} from 'react-icons/fa'



function AudioPlayer() {
    //state
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    //references
    const audioPlayer = useRef() //refer to our audio player
    const progressBar = useRef() //refer to progress bar
    const animationRef = useRef() //refer to animation

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds);
        progressBar.current.max = seconds; //set max range
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]); //only run useEffect when metadata is loaded(pause, play), and audioplayer is ready


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
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current)
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime()
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime()
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    const backThirty = () => {
        progressBar.current.value = Number(progressBar.current.value - 30)
        changeRange()
    }

    const forwardThirty = () => {
        progressBar.current.value = Number(progressBar.current.value + 30)
        changeRange()
    }

    return (
        <div className={styles.audioPlayer}>
            <audio ref={audioPlayer}>
                <source src='' type='audio/mp3'/>
            </audio>

            <button className={styles.forwardBackward} onClick={backThirty}> <BsArrowLeftShort/> 30 </button>

            <button className={styles.playPause} onClick={togglePausePlay}>
                {isPlaying ? <FaPause /> : <FaPlay className={styles.play}/>}
            </button>

            <button className={styles.forwardBackward} onClick={forwardThirty}>30 <BsArrowRightShort /></button>


            <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

            <div>
                <input type='range' className={styles.progressBar} defaultValue='0' ref={progressBar} onChange={changeRange}/>
            </div>
            
            <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        </div>
    )
}

export {AudioPlayer}
