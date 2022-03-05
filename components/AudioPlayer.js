import React, {useState} from 'react';
import styles from '../styles/AudioPlayer.module.css';
import {BsArrowLeftShort, BsArrowRightShort} from 'react-icons/bs';
import {FaPlay, FaPause} from 'react-icons/fa'


function AudioPlayer() {

    const [isPlaying, setIsPlaying] = useState(false)

    const togglePausePlay = () => {
        setIsPlaying(!isPlaying);
    }

    return (
        <div className={styles.audioPlayer}>
            <audio src=''></audio>

            <button className={styles.forwardBackward}> <BsArrowLeftShort/> 30 </button>

            <button className={styles.playPause} onClick={togglePausePlay}>
                {isPlaying ? <FaPause /> : <FaPlay className={styles.play}/>}
            </button>

            <button className={styles.forwardBackward}>30 <BsArrowRightShort /></button>


            <div className={styles.currentTime}>0.00</div>

            <div>
                <input type='range' className={styles.progressBar}/>
            </div>
            
            <div className={styles.duration}>2.49</div>
        </div>
    )
}

export {AudioPlayer}
