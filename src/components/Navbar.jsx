import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ideaGif from '../../img/idea.gif';
import dsGif from '../../img/ds.gif';
import theaterGif from '../../img/theater.gif';
import conceptGif from '../../img/conceptpage.gif';

export default function DotNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const navPages = [
    { name: "Home", path: "/", icon: ideaGif },
    { name: "Idea", path: "/idea", icon: ideaGif },
    { name: "Studio", path: "/dancestudio", icon: dsGif },
    { name: "Theater", path: "/pov", icon: theaterGif },
    { name: "Description", path: "/description", icon: conceptGif },
  ];

  const styles = {
    container: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
    },
    iconButton: {
      width: '100px',   // Resize as needed
      height: 'auto',
      cursor: 'pointer',
      display: 'block',
    },
    dropdown: {
      position: 'absolute',
      top: '45px',
      right: 0,
      background: 'white',
      border: '1px solid #ddd',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      listStyle: 'none',
      padding: '10px 0',
      margin: 0,
      borderRadius: '6px',
      minWidth: '160px',
    },
    item: {
      padding: '8px 16px',
      cursor: 'pointer',
    },
    link: {
      textDecoration: 'none',
      color: '#333',
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      width: '20px',
      height: '20px',
      marginRight: '8px',
    },
    hover: {
      backgroundColor: '#f0f0f0',
    },
  };

  const handleMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100); // Slight delay before auto-closing
  };

  const navItems = navPages.map((item, index) => (
    <li
      key={index}
      style={styles.item}
      onClick={() => setIsOpen(false)}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.hover.backgroundColor)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
    >
      <Link to={item.path} style={styles.link}>
        {item.icon && <img src={item.icon} alt={item.name} style={styles.icon} />}
        {item.name}
      </Link>
    </li>
  ));

  return (
    <div
      style={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src="../../img/Yanshen_Logo_.png" // Uses uploaded image
        alt="Petrichor Menu"
        style={styles.iconButton}
      />
      {isOpen && <ul style={styles.dropdown}>{navItems}</ul>}
    </div>
  );
}

// ---------------------------------------------------------------


// import { useState, useRef } from 'react';
// import { Link } from 'react-router-dom';

// export default function DotNavbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const closeTimeoutRef = useRef(null);

//   const navPages = [
//     { name: "Home", path: "/", icon: "https://static.igem.wiki/teams/5112/icons/description-2x.png" },
//     { name: "Studio", path: "/dancestudio", icon: "/reporting.png" },
//     { name: "Factory", path: "/factory", icon: "/group-chat.png" },
//     { name: "Theatre", path: "/pov", icon: "/group-chat.png" },
//     { name: "Description", path: "/description", icon: "/group-chat.png" },
//   ];

//   const styles = {
//     container: {
//       position: 'fixed',
//       top: '20px',
//       right: '20px',
//       zIndex: 1000,
//     },
//     iconButton: {
//       width: '30px',
//       height: '30px',
//       borderRadius: '30%',      // Makes it circular
//       objectFit: 'cover',       // Prevents distortion
//       cursor: 'pointer',
//       boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
//       transition: 'transform 0.2s ease',
//     },
//     dropdown: {
//       position: 'absolute',
//       top: '40px',              // Space below icon
//       right: 0,
//       background: 'white',
//       border: '1px solid #ddd',
//       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//       listStyle: 'none',
//       padding: '10px 0',
//       margin: 0,
//       borderRadius: '6px',
//       minWidth: '160px',
//     },
//     item: {
//       padding: '8px 16px',
//       cursor: 'pointer',
//     },
//     link: {
//       textDecoration: 'none',
//       color: '#333',
//       display: 'flex',
//       alignItems: 'center',
//     },
//     icon: {
//       width: '16px',
//       height: '16px',
//       marginRight: '8px',
//     },
//     hover: {
//       backgroundColor: '#f0f0f0',
//     },
//   };

//   const handleMouseEnter = () => {
//     clearTimeout(closeTimeoutRef.current);
//     setIsOpen(true);
//   };

//   const handleMouseLeave = () => {
//     closeTimeoutRef.current = setTimeout(() => {
//       setIsOpen(false);
//     }, 100); // Delay before auto-closing
//   };

//   const navItems = navPages.map((item, index) => (
//     <li
//       key={index}
//       style={styles.item}
//       onClick={() => setIsOpen(false)}
//       onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.hover.backgroundColor)}
//       onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
//     >
//       <Link to={item.path} style={styles.link}>
//         {item.icon && <img src={item.icon} alt={item.name} style={styles.icon} />}
//         {item.name}
//       </Link>
//     </li>
//   ));

//   return (
//     <div
//       style={styles.container}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <img
//         src="/img/discordIcon.webp" // Make sure this path is correct
//         alt="Discord Menu"
//         style={styles.iconButton}
//       />
//       {isOpen && <ul style={styles.dropdown}>{navItems}</ul>}
//     </div>
//   );
// }
