/* Gel.jsx */
import  { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Clce.module.css';
import hydrogelImg from '../../img/gel.jpg';
import cotton from '../../img/cotton.jpg';
import inkButtonImg from '../../img/InkButton.svg';

const tabs = [
  {
    id: 'tab-1',
    label: 'Work stuff',
    pic: hydrogelImg,
    pictxt: '圖片標題 2',
    content: (
      <>
        <p>Productize. Optics accountable talk. Thought shower. High performance keywords market-facing drink from the firehose, or you better eat a reality sandwich before you walk back in that boardroom, but accountable talk knowledge process outsourcing.</p>
        <p>What's our go to market strategy? cross functional teams enable out of the box brainstorming nor zeitgeist viral engagement. Deep dive. Organic growth quick sync, feed the algorithm.</p>
        <p>Productize. Optics accountable talk. Thought shower. High performance keywords market-facing drink from the firehose, or you better eat a reality sandwich before you walk back in that boardroom, but accountable talk knowledge process outsourcing.</p>
        <p>What's our go to market strategy? cross functional teams enable out of the box brainstorming nor zeitgeist viral engagement. Deep dive. Organic growth quick sync, feed the algorithm.</p>
        <p>Productize. Optics accountable talk. Thought shower. High performance keywords market-facing drink from the firehose, or you better eat a reality sandwich before you walk back in that boardroom, but accountable talk knowledge process outsourcing.</p>
        <p>What's our go to market strategy? cross functional teams enable out of the box brainstorming nor zeitgeist viral engagement. Deep dive. Organic growth quick sync, feed the algorithm.</p>     
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
        <p>I love cheese, especially the big cheese gouda. Monterey jack red leicester roquefort cheese and wine fromage frais smelly cheese melted cheese dolcelatte. Fromage smelly cheese manchego paneer cheese and wine danish fontina macaroni cheese red leicester.</p>
        <p>Stilton fondue queso emmental when the cheese comes out everybody's happy croque monsieur queso paneer. Say cheese pecorino swiss boursin halloumi cottage cheese taleggio boursin.</p>
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
        <p>Cupcake ipsum dolor sit amet jujubes tart. Tiramisu icing gingerbread halvah cake. Marzipan cake soufflé cookie brownie ice cream cupcake. Dragée croissant bonbon ice cream oat cake jelly cookie. Wafer candy dessert jelly jelly-o.</p>
        <p>Oat cake donut powder pastry wafer brownie cupcake caramels bear claw. Bonbon caramels oat cake cake shortbread. Cake cheesecake candy icing bear claw marshmallow icing jelly. Halvah biscuit pudding danish cookie bonbon gummies.</p>
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
        <p>Miaow then turn around and show you my bum flee in terror at cucumber discovered on floor. Terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry sleep on dog bed, force dog to sleep on floor and grab pompom in mouth and put in water dish cats are fats i like to pets them they like to meow back present belly, scratch hand when stroked.</p>
        <p>Bleghbleghvomit my furball really tie the room together love asdflkjaertvlkjasntvkjn (sits on keyboard) but bawl under human beds.</p>
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