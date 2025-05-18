import  { useState } from 'react';
import '../containers/Bootstrapcss.css';
import { NeedleButton, HomeMap } from '../components';

export default function Home() {
  // 控制要顯示動畫還是地圖
  const [showMap, setShowMap] = useState(false);

  return showMap ? (
    <HomeMap />
  ) : (
   <NeedleButton onComplete={() => {
 
  setTimeout(() => setShowMap(true), 300);
  }} />
  );
}
