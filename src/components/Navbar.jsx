import { useState } from 'react';
import { Link } from 'react-router-dom';
import Pages from '../pages';

export default function DotNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const styles = {
    container: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
    },
    dot: {
      width: '20px',
      height: '20px',
      backgroundColor: isOpen ? '#555' : '#333',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    dropdown: {
      position: 'absolute',
      top: '30px',
      right: 0,
      background: 'white',
      border: '1px solid #ddd',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      listStyle: 'none',
      padding: '10px 0',
      margin: 0,
      borderRadius: '6px',
      minWidth: '140px',
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
      width: '16px',
      height: '16px',
      marginRight: '8px',
    },
    hover: {
      backgroundColor: '#f0f0f0',
    }
  };

  const pages = Pages.map((item, index) => {
    if (item.path) {
      return (
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
      );
    }
    return null;
  });

  return (
    <div style={styles.container}>
      <div style={styles.dot} onClick={toggleMenu}></div>
      {isOpen && <ul style={styles.dropdown}>{pages}</ul>}
    </div>
  );
}
