import { useState } from "react";
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
              {SCREENS[index] === "DemoPage" && <Demo-Page />}
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
  return (
    <section className="screen full movie-screen">
      <video
        className="promo-video"
        src="/videos/project-promo.mp4"
        controls
        style={{
          width: "80%",
          height: "80%",
          paddingTop: 150,
          objectFit: "cover",
        }}
      />
      <button
        className={styles.completeButton}
        onClick={() => navigate('/demo')}
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
