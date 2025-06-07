/* Gel.jsx */
import styles from './Abstract.module.css';
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import inkButtonImg from '../../img/InkButton.svg';
import conceptgif from "../../img/conceptTitle.gif";
gsap.registerPlugin(ScrollTrigger);


export default function Abstract() {

  const navigate = useNavigate();
  const contentRef = useRef();

useEffect(() => {
  if (!contentRef.current) return;  
  
  const paragraphs = gsap.utils.toArray(contentRef.current.querySelectorAll("p"));

  paragraphs.forEach((p) => {
    gsap.fromTo(
      p,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: p,
          start: "top 80%",
          end: "top 60%",
          scrub: 1.5,
        },
      }
    );
  });
}, []);
  return (
    <div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <div className={styles.imageRow}>
        <div className={styles.imageContainer}>
          <img src={conceptgif} alt="Visual 1" className={styles.coveredImage} />
        </div>
      </div>
      <section ref={contentRef} className={styles.section}>
        <article className={styles.article}>
          <header className={styles.header}>
            <h1>ABSTRACT</h1>
            <p className={styles.subheading}>about project</p>
          </header>

          <div className={styles.content}>
            <p>
              The name Yánshēn(顏身) is a word play on the Chinese phrase for extension 
              (延伸), replacing each character with homonyms for Color (顔) and Body (身); this name speaks to this project’s ambition to create a color-changing bio-garment that becomes an extension of the body itself through performance. 

            </p>
            <hr/>
            <p>
              In the past, individuals owned very few items of clothing; their clothes were an intimate and unique second skin. The modern demand for mass production and standardised sizing has created an era of ‘uniforms’ that sever the tie between body and garment. The very definition of uniform is a loss of unique qualities. Instead of the body wearing clothes, the clothes wear the bodies within them.
            </p>
            <hr/>
            <p>
              Through performance, Yánshēn homogenizes body and garment, reuniting them to be vessels of one another. Yánshēn proposes a textile driven by three different types of fibers: color-changing Cholesteric Liquid Crystal Elastomer (CLCE), water-absorbing hydrogel fiber, and a comfortable organic cotton fiber. These fibers are to be woven together to create a unique textile that can change color when stretched; the rigidity, skin-adhesion, and cooling effects of this textile also increases with moisture levels (sweat). When used in select parts of performance garments, the Yánshēn textile not only changes color with the movements of the body, but also acts as a wearable biosensor for the performer, reminding them of their bodily conditions. With Yánshēn, a garment exists beyond clothing — it becomes an integral part of both the performer and performance.
            </p>
            <hr/>
            <p>
              As a performer becomes aware of their garment, they reconcile the various components of performative art, transcending traditional boundaries between body, art, and expression. The garment becomes a second-skin, an organ; a reunion, or perhaps more than that, occurs.
            </p>
          </div>
        </article>
      </section>

      <button
        className={styles.completeButton}
        onClick={() => navigate('/dancestudio')}
      >
        <img src={inkButtonImg} alt="NEXT" />
      </button>
      
    </div>
  );
}


