import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "../containers/Bootstrapcss.css";
import { useNavigate } from 'react-router-dom';
import styles from './Pov.module.css';
import inkButtonImg from '../../img/InkButton.svg';

// 畫面識別名稱
const SCREENS = ["movie", "DemoPage"];

export default function Pov() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % SCREENS.length);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Container className="container-home">
        <div className="theater-root">
          <AnimatePresence mode="wait">
            <motion.div
              key={SCREENS[index]}
              initial={{
                scale: 0.8,
                opacity: 0,
                filter: "blur(8px)",
                transformOrigin: "center center",
              }}
              animate={{
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 0.8, ease: "easeOut" },
              }}
              exit={{
                scale: 1.2,
                opacity: 0,
                filter: "blur(8px)",
                transition: { duration: 0.6, ease: "easeIn" },
              }}
              className="screen-wrapper"
            >
              {SCREENS[index] === "movie" && <Movie onNext={next} />}
              {SCREENS[index] === "DemoPage" && <DemoPage />}
            </motion.div>
          </AnimatePresence>  
        </div>
        <div style={{ marginTop: "900px" }}></div>
      </Container>
    </div>
  );
}

// child 1：Movie theater
function Movie({ onNext }) {
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to initialize YouTube player
    const initYouTubePlayer = () => {
      if (window.YT && window.YT.Player) {
        try {
          new window.YT.Player('youtube-player', {
            videoId: '6o1W9ID73sE', // Youtube video ID
            playerVars: {
              autoplay: 1, // Autoplay the video (doesn't work lol)
              controls: 1, // Hide video controls
              modestbranding: 1, // Hide YouTube logo
              rel: 0, // Hide related videos
              fs: 0, // Hide fullscreen button
              playsinline: 1, // Force inline playback
              disablekb: 1, // Hide keyboard controls
              iv_load_policy: 3, // Hide video annotations
              showinfo: 0, // Hide video title and uploader info
            },
            events: {
              // Event handlers
              onReady: (event) => {
                console.log('YouTube player is ready');
                setPlayer(event.target);
              },
              onError: (event) => {
                console.error('YouTube player error:', event);
                setError('Error loading video');
              },
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  const iframe = document.querySelector('#youtube-player');
                  if (iframe) {
                    iframe.style.pointerEvents = 'none';
                  }
                }
              }
            },
          });
        } catch (err) {
          console.error('Error initializing YouTube player:', err);
          setError('Error initializing video player');
        }
      } else {
        console.log('YouTube API not loaded yet');
        // Retry after a short delay
        setTimeout(initYouTubePlayer, 1000);
      }
    };

    // Start initialization
    initYouTubePlayer();

    // Cleanup function
    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  return (
    <section className="screen full movie-screen" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div
          id="youtube-player"
          style={{
            width: "704px",
            height: "528px",
            backgroundColor: '#000',
            margin: '0 auto',
            display: 'block',
            marginTop: '190px'
          }}
        />
      )}
      <button
        className={styles.completeButton}
        onClick={() => navigate('/demo')}
        style={{ marginTop: '20px' }}
      >
        <img src={inkButtonImg} alt="Complete" />
      </button>
    </section>
  );
}

Movie.propTypes = {
  onNext: PropTypes.func.isRequired,
};

// child 2：DemoPage
function DemoPage() {
  return (
    <section className="DemoPage-screen">
      <Link to="/DemoPage" className="action-button">
        Overview
      </Link>
    </section>
  );
}
