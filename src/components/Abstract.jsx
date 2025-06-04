/* Gel.jsx */
import  { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Abstract.module.css';
import hydrogelImg from '../../img/gel.jpg';
import cotton from '../../img/cotton.jpg';
import { useNavigate } from 'react-router-dom';

const tabs = [
  {
    id: 'tab-1',
    label: 'Work stuff',
    pic: hydrogelImg,
    pictxt: '圖片標題 2',
    content: (
      <>
        <p>The name Yánshēn（顔身) is a word play on the Chinese phrase for extension (延伸), replacing each character with homonyms for Color (顔) and Body (身); this name speaks to this project’s ambition to create a color-changing bio-garment that becomes an extension of the body itself through performance. </p>
      </>
    )
  },
  {
    id: 'tab-2',
    label: 'Food',
    pic: hydrogelImg,
    pictxt: '圖片標題 2',
    content: (
      <>
        <p>In the past, individuals owned very few items of clothing; their clothes were an intimate and unique second skin. The modern demand for mass production and standardised sizing has created an era of ‘uniforms’ that sever the tie between body and garment. The very definition of uniform is a loss of unique qualities. Instead of the body wearing clothes, the clothes wear the bodies within them.</p>
      </>
    )
  },
  {
    id: 'tab-3',
    label: 'Baking',
    pic: cotton,
    pictxt: '圖片標題 2',
    content: (
      <>
        <p>Through performance, Yánshēn homogenizes body and garment, reuniting them to be vessels of one another. Yánshēn proposes a textile driven by three different types of fibers: color-changing Cholesteric Liquid Crystal Elastomer (CLCE), water-absorbing hydrogel fiber, and a comfortable organic cotton fiber. 
          These fibers are to be woven together to create a unique textile that can change color when stretched; the rigidity, skin-adhesion, and cooling effects of this textile also increases with moisture levels (sweat). When used in select parts of performance garments, the Yánshēn textile not only changes color 
          with the movements of the body, but also acts as a wearable biosensor for the performer, reminding them of their bodily conditions. With Yánshēn, a garment exists beyond clothing — it becomes an integral part of both the performer and performance.
        </p>
      </>
    )
  },
  {
    id: 'tab-4',
    label: 'Cat',
    pic: cotton,
    pictxt: '圖片標題 2',
    content: (
      <>
        <p>As a performer becomes aware of their garment, they reconcile the various components of performative art, transcending traditional boundaries between body, art, and expression. The garment becomes a second-skin, an organ; a reunion, or perhaps more than that, occurs.</p>
      </>
    )
  }
];

export default function Abstract({ onNext }) {
  const [activeTab, setActiveTab] = useState('tab-1');
  const navigate = useNavigate();

  return (
    <div className={styles.folder}>
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div><span>{tab.label}</span></div>
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {tabs.map(tab => (
          <div
            key={tab.id}
            id={tab.id}
            className={styles.contentInner}
            style={{ display: activeTab === tab.id ? 'flex' : 'none' }}
          >
            <div className={styles.leftPanel}>
              <img src={tab.pic} alt={tab.pictxt} className={styles.image} />
              <div className={styles.caption}>{tab.pictxt}</div>
            </div>
            <div className={styles.rightPanel}>
              <div className={styles.page}>{tab.content}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        className={styles.completeButton}
        onClick={() => navigate('/dancestudio')}>
      COMPLETE
      </button>
    </div>
  );
}

