/* Gel.jsx */
import styles from './Description.module.css';
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import inkButtonImg from '../../img/InkButton.svg';
import yen from "../../img/yen.png";
import shan from "../../img/shen.png";

gsap.registerPlugin(ScrollTrigger);


export default function Description() {

  const navigate = useNavigate();
  const contentRef = useRef();

useEffect(() => {
  const section = contentRef.current;
  const elements = section.querySelectorAll("p, h3, ul, li");

  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: el, // ✅ 修正這裡
          start: "top 80%",
          end: "top 40%",
          scrub: 1.5,
        },
      }
    );
  });
}, []);
  return (
    <div>
      <section ref={contentRef} className={styles.section}>
        <article className={styles.article}>
          <header className={styles.header}>
            <h1>Future Plans & Credits</h1>
            <p className={styles.subheading}>A mindful fusion of fashion, sustainability, and bio-performance</p>
          </header>

          <div className={styles.content}>
            <h3>Slow Fashion and Sustainability Actions</h3>
            <p>
              At Yánshēn, we take a mindful approach to fashion, carefully considering the impact of fast fashion in our designs. Our garments embody the principles of slow fashion, marked by their unique tailoring, structure, and reusability. The distinct silhouettes and intricate patterns we create demand precision and attention to detail, making each piece a slow, deliberate process.
            </p>
            <p>
              Crafted using the plain weave technique, our garments are knitted with a single strand of fiber, allowing the entire piece to be disassembled with a simple pull. This innovative design makes our garments fully reusable, easily transformed into new silhouettes with minimal effort. Rather than knitting a fabric and cutting patterns from it, we knit directly on the machine, creating the patterns as part of the garment. This method not only reduces fabric waste but also promotes a more sustainable production process.
            </p>
            <p>
              At Yánshēn, we are committed to sustainability, carefully sourcing every material to ensure we remain mindful of both the environment and the craftsmanship that goes into each piece.
            </p>
            <hr/>
            <h3>Credits</h3>
            <ul>
              <li>Ru – NYC based designer on garment making</li>
              <li>Michael Fang – from Studio Wenjue Lu on slow fashion and sustainability</li>
              <li>Hsu Rae – lecturer and guest speaker on biomaterials</li>
            </ul>
            <hr/>
            <h3>Future Plans</h3>
            <p>
              Genspace
            </p>
          </div>
        </article>
      </section>
      <div className={styles.imageRow}>
        <div className={styles.imageContainer}>
          <img src={yen} alt="Visual 1" className={styles.coveredImage} />
        </div>
        <div className={styles.imageContainer}>
          <img src={shan} alt="Visual 2" className={styles.coveredImage} />
        </div>
      </div>


      {/* <button
        className={styles.completeButton}
        onClick={() => navigate('/team-members')}
      >
        <img src={inkButtonImg} alt="NEXT" />
      </button> */}
      
    </div>
  );
}
