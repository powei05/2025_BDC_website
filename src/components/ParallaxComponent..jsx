import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useEffect, useState } from 'react';
import "../containers/Bootstrapcss.css"; // CSS 路徑可依需求調整

function ParallaxComponent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化判斷

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Parallax pages={isMobile ? 1 : 1.63} style={{ top: '0', left: '0' }} className="animation">
        <ParallaxLayer offset={isMobile ? -0.2 : -0.2} speed={isMobile ? 0.1 : 0}>
          <div className="animation_layer parallax" id="artback" />
        </ParallaxLayer>

        <ParallaxLayer offset={isMobile ? -0.15 : -0.01} speed={isMobile ? 0.2 : 0.25}>
          <div className="animation_layer parallax" id="mountain" />
        </ParallaxLayer>

        <ParallaxLayer offset={isMobile ? 0.2 : 0.45} speed={0.4}>
          <div className="animation_layer parallax" id="logoland" />
        </ParallaxLayer>

        <ParallaxLayer offset={isMobile ? 0.5 : 0.89} speed={0.3}>
          <div className="animation_layer parallax" id="jungle1" />
        </ParallaxLayer>

        <ParallaxLayer offset={isMobile ? 0.4 : 0.7} speed={isMobile ? 0.5 : 0.4}>
          <div className="animation_layer parallax" id="jungle2" />
        </ParallaxLayer>

        <ParallaxLayer offset={isMobile ? 0.7 : 0.99} speed={0.55}>
          <div className="animation_layer parallax" id="jungle3" />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default ParallaxComponent;
