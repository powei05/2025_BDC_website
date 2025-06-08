/* Gel.jsx */
import  { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Clce.module.css';
import hydrogelImg from '../../img/gel.jpg';
import cotton from '../../img/cotton.jpg';
import inkButtonImg from '../../img/InkButton.svg';
import materialx from '../../img/stan.png';
const tabs = [
  {
    id: 'tab-1',
    label: 'Background',
    pic: materialx,
    pictxt: 'Adobe\'s animated dress',
    content: (
      <>
        <p>In 2023, Adobe introduced a new color changing and animated dress. Adobe used an electroactive material, commonly used on smart windows, called polymer dispersed liquid crystal (PDLC). The color and animation can be activated with a remote. </p>
        <br/>
        <p>However, the color pallet of the dress is very limited. It is fragile and prone to damage. It is stiff and the transitions aren’t as smoothed as imagined. It also required eclectic power to function.</p>
        <br/>
        <p>At the same time, Anrealage launched their UV activated colour changing collection at the Paris Fashion Week 2023. The collection faces the same problems with Adobe. It is fragile, it requires power, and UV can be potentially dangerous. Worst of all, a single garment is limited to a single color palette. </p>
        <br/>
        <p>Our textile provides a color-changing fabric that doesn’t require electric power and allows for a more organic presentation of the garment. </p>
      </>
    )
  },
  {
    id: 'tab-2',
    label: 'CLCE Fiber',
    pic: hydrogelImg,
    pictxt: 'Cholesteric Liquid Crystal Elastomer (CLCE)',
    content: (
      <>
        <p>CLCE fibers are inspired by cephalopods that use pressure to apply changes to  their mechanochromic fibers to change the wavelengths at which they absorb and reflect light. This allows the stretch of the fibers to determine color changes. </p>
        <br/>
        <p>Dancers control the pressure of each stretch, guiding colors that emerge in the garment. Dancers can utilize this to enhance their performance by using colors to highlight moments in the performance. </p>
        <br/>
        <p>The color change can be customized through Cholesteric Pitch Tuning, which is treatment of the fibers via UV light in the manufacturing stage that allows for specification of CLCE fiber color range.</p>
      </>
    )
  },
  {
    id: 'tab-3',
    label: 'Hydrogel fiber',
    pic: cotton,
    pictxt: 'hydrogel',
    content: (
      <>
        <p>Hydrogel are flexible, absorbent, cooling, and biocompatible, making it a suitable choice for skintight performance wear. Hydrogel assists in sweat absorption, keeping dancers comfortable within their garments. Hydrogel can also function as a cooling medium to prevent dancers from overheating.</p>
        <br/>
        <p>Hydrogel fibers can detect certain electrical/ion conduction properties, thus allowing them to work like sensors. It can be applied to detect different stimuli like pressure, temperature, and most especially ph. Hydrogel fibre is designed to incorporate ph-sensitive fluorescent dyes and Rhodamine B.</p>
        <br/>
        <p>Contact with the pH of sweat causes Rhodamine B molecules to change and increases the intensity of fluorescence the dye emits. The fluorescence intensity corresponds to changing pH levels. The signal is detected and translated into signals that reflect the level of pH detected in our sweat. The initial pH of sweat is at 7.1 to 7.4. Lower pH levels (4 to 5) reflect the increased concentration of sodium in our sweat, indicating dehydration of the body. Hydrogel can inform performers’ their current pH levels and inform them to rehydrate their bodies.</p>
      </>
    )
  },
  {
    id: 'tab-4',
    label: 'Cotton',
    pic: cotton,
    pictxt: 'Organic Cotton',
    content: (
      <>
        <p>Cotton was chosen to ensure the performers’ comfort while supporting sustainability. It is natural, breathable, and low maintenance fibre that is odour-free, versatile, and environmentally friendly. </p>
        <br/>
        <p>Cotton contrasts the heavy tech in the other two fibres, creating a balance between nature and tech. Its versatility allows it to be woven into different fabrics with a variety of functions. We plan to source these organic cottons from fair trade initiatives like Better Cotton Initiative (BCI). BCI was established to help grow cotton sustainably, ensure farm workers benefit from their harvests, and empower women to form an equal farming community. </p>
        <br/>
        <p>We can contact either organization to source our cotton. Tainan Enterprises (台南企業) is premier clothing manufacturer that is certified by Fair Trade and part of the BCI. They are a leading business in Taiwan on eco-conscious manufacturing. Tainan Enterprises aims to source sustainable and ethically sourced materials for their client’s requests. Their factories around the world benefit from these initiatives. </p>
      </>
    )
  },
  {
    id: 'tab-5',
    label: 'Knit',
    pic: hydrogelImg,
    pictxt: 'Knitting Pattern',
    content: (
      <>
        <p>The garment is formed using the plain knit technique. Plain knit uses a single strand of fibre and loops on itself to form the fabric. </p>
        <br/>
        <p>The base of our garment is formed with cotton fibres. The Yánshēn textile is formed from CLCE and Hydrogel fibres. The textiles are patterns interwoven with the cotton base. The flow of pattern is inspired by natural movement of our muscles. Waves come to form around the hands, body, and legs following the flow of the muscles. </p>
      </>
    )
  }
];

export default function Clce({ onNext }) {
  const [activeTab, setActiveTab] = useState('tab-1');

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

      <button className={styles.completeButton} onClick={onNext}>
        <img src={inkButtonImg} alt="Next" />
      </button>
    </div>
  );
}

Clce.propTypes = {
  onNext: PropTypes.func.isRequired,
};