// src/components/Theater.jsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import '../containers/Bootstrapcss.css';
import { Link } from "react-router-dom";

// 三個畫面識別
const SCREENS = ["cinema", "movie", "dashboard"];

export default function Theater() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % SCREENS.length);

  return (
    <div className="theater-root">
      <AnimatePresence mode="wait">
        <motion.div
          key={SCREENS[index]}
          initial={{
            scale: 0.8,          
            opacity: 0,
            filter: "blur(8px)",   
            transformOrigin: "center center"
          }}
          animate={{
            scale: 1,              
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.8,
              ease: "easeOut"
            }
          }}
          exit={{
            scale: 1.2,            
            opacity: 0,
            filter: "blur(8px)",
            transition: {
              duration: 0.6,
              ease: "easeIn"
            }
          }}
          className="screen-wrapper"
        >
          {SCREENS[index] === "cinema" && <Cineman onNext={next} />}
          {SCREENS[index] === "movie" && <Movie onNext={next} />}
          {SCREENS[index] === "dashboard" && <Dashboard />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Cineman({ onNext }) {
  return (
    <section className="screen full cinema-screen">
      <button className="action-button" onClick={onNext}>
        OPEN
      </button>
    </section>
  );
}
Cineman.propTypes = {
  onNext: PropTypes.func.isRequired,
};

function Movie({ onNext }) {
  return (
    <section className="screen full movie-screen">
      <video className="promo-video" src="/videos/project-promo.mp4" controls />
      <button className="action-button video-next" onClick={onNext}>
        下一步
      </button>
    </section>
  );
}
Movie.propTypes = {
  onNext: PropTypes.func.isRequired,
};

function Dashboard() {
  return (
    <section className="screen full dashboard-screen">
      
      <Link to="/" className="action-button">
        More Information
      </Link>
    </section>
  );
}


