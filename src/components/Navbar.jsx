import { useEffect, useRef, useState } from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Pages from "../pages";
import "../containers/Bootstrapcss.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const navbarCollapseRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressImageRef = useRef(null);
  const scrollTimeoutRef = useRef(null); 
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      const screenWidth = window.innerWidth;

      if (screenWidth > 768) {
        if (scrollTop > 50) {
          setIsCollapsed(true);
          setOpenDropdowns({});
        } else {
          setIsCollapsed(false);
          setOpenDropdowns({});
        }
      } else {
        setIsCollapsed(false);
        setOpenDropdowns({});
      }

      if (progressBarRef.current && progressImageRef.current) {
        progressBarRef.current.style.width = `${scrollPercentage}%`;
        const progressBarWidth = progressBarRef.current.offsetWidth;
        progressImageRef.current.style.left = `${progressBarWidth - progressImageRef.current.offsetWidth / 2}px`;

        progressImageRef.current.style.display = scrollPercentage <= 2 ? 'none' : 'block';
        progressImageRef.current.classList.add('walking');

        clearTimeout(scrollTimeoutRef.current); 
        scrollTimeoutRef.current = setTimeout(() => {
          if (progressImageRef.current) {
            progressImageRef.current.classList.remove('walking');
            progressImageRef.current.style.transform = 'translateY(0)';
          }
        }, 1000);
      }
    };

    const onLoad = () => handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', onLoad);
      clearTimeout(scrollTimeoutRef.current); 
    };
  }, []);

  useEffect(() => {
    const handleLinkClick = (event) => {
      if (navbarCollapseRef.current && navbarCollapseRef.current.classList.contains('show')) {
        const target = event.target;
        if (target.closest('.dropdown-text')) {
          navbarCollapseRef.current.classList.remove('show');
        }
      }
    };

    const links = document.querySelectorAll('.navbar-text');
    links.forEach(link => link.addEventListener('click', handleLinkClick));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleLinkClick));
    };
  }, []);

  const handleDropdownToggle = (index, isOpen) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [index]: isOpen,
    }));
  };

  const pages = Pages.map((item, pageIndex) => {
    if ("folder" in item && item.folder) {
      const folderItems = item.folder.map((subpage, subpageIndex) => {
        if (subpage.path) {
          return (
            <NavDropdown.Item
              key={`subpage-${pageIndex}-${subpageIndex}`}
              as={Link}
              to={subpage.path}
              className="dropdown-text"
              onClick={() => setOpenDropdowns({})}
            >
              <img src={subpage.icon} alt={subpage.name} style={{ width: 30, height: 30, marginRight: 8 }} />
              {subpage.name}
            </NavDropdown.Item>
          );
        }
        return null;
      });

      return (
        <NavDropdown
          key={`page-${pageIndex}`}
          title={
            <span>
              {item.name} <FontAwesomeIcon icon={faCaretDown} className="dropdown-arrow" />
            </span>
          }
          className={`navbar-text ${folderItems.length ? 'dropdown-active' : ''}`}
          show={!!openDropdowns[`page-${pageIndex}`]}
          onToggle={(isOpen) => handleDropdownToggle(`page-${pageIndex}`, isOpen)}
        >
          {folderItems}
        </NavDropdown>
      );
    } else if ("path" in item && item.path) {
      return (
        <Nav.Link key={`page-${pageIndex}`} as={Link} to={item.path} className="navbar-text">
          {item.name !== "Home" && item.icon && (
            <img src={item.icon} alt={item.name} style={{ width: 20, height: 20, marginRight: 8 }} />
          )}
          {item.name}
        </Nav.Link>
      );
    }
    return null;
  });

  return (
    <div></div>
    // <BootstrapNavbar expand="lg" className={`navbar ${isCollapsed ? 'collapsed' : 'expanded'}`} fixed="top">
    //   <Container>
    //     <BootstrapNavbar.Brand>
    //       <Link to="/">
    //         <img
    //           src="../../public/txt_icon.png"
    //           alt="Team Logo"
    //           className="team-logo"
    //         />
    //       </Link>
    //     </BootstrapNavbar.Brand>
    //     <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
    //     <BootstrapNavbar.Collapse id="basic-navbar-nav" ref={navbarCollapseRef}>
    //       <Nav className="left-aligned">{pages}</Nav>
    //     </BootstrapNavbar.Collapse>
    //     <div id="scroll-progress" className="scroll-progress" ref={progressBarRef}>
    //       <img
    //         src="../../public/dancer.png"
    //         alt="Progress Icon"
    //         ref={progressImageRef}
    //         style={{ filter: 'bluescale(100%) brightness(50%)', left: '0' }}
    //       />
    //     </div>
    //   </Container>
    // </BootstrapNavbar>
  );
}
