import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import "../containers/Bootstrapcss.css"; 


const interpolateColor = (color1, color2, fraction) => {
  const c1 = parseInt(color1.substring(1), 16);
  const c2 = parseInt(color2.substring(1), 16);

  const r = Math.round(((c1 >> 16) * (1 - fraction)) + ((c2 >> 16) * fraction));
  const g = Math.round((((c1 >> 8) & 0xff) * (1 - fraction)) + (((c2 >> 8) & 0xff) * fraction));
  const b = Math.round(((c1 & 0xff) * (1 - fraction)) + ((c2 & 0xff) * fraction));

  return `rgb(${r}, ${g}, ${b})`;
};

export function Header({ title, lead }) {
  const bannerRef = useRef(null);
  const [gradient, setGradient] = useState('linear-gradient(90deg, #109ed1, #0c265f)');
  const [parallaxTransform, setParallaxTransform] = useState('translateY(0px)');

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const bannerHeight = bannerRef.current.offsetHeight;
        const scrollFraction = Math.min(scrollTop / bannerHeight, 1);

        const parallaxSpeed = 0.1;
        const parallaxOffset = scrollTop * parallaxSpeed;
        setParallaxTransform(`translateY(${parallaxOffset}px)`);

        const color1Start = '#109ed1'; // Light blue
        const color1End = '#0c265f'; // Dark blue
        const color2Start = '#0c265f'; // Reversed dark blue
        const color2End = '#109ed1'; // Reversed light blue



        const startColor = interpolateColor(color1Start, color2Start, scrollFraction);
        const endColor = interpolateColor(color1End, color2End, scrollFraction);

        const newGradient = `linear-gradient(90deg, ${startColor}, ${endColor})`;
        setGradient(newGradient);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* <div
        className="banner-header"
        ref={bannerRef}
        style={{
          background: gradient,
          transform: parallaxTransform,
          transition: 'background 0.2s ease',
        }}
      >
        <h1>{title}</h1>
      </div>
      <p className="lead-text">{lead}</p> */}
    </div>
  );
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
    lead: PropTypes.string.isRequired,
  };

export default Header;