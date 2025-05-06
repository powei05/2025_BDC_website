import  { useEffect, useState } from 'react';
import '../containers/Bootstrapcss.css'; 
import PropTypes from 'prop-types';

const SideNav = ({ links }) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  // 平滑捲動到指定區段
  const handleLinkClick = (event) => {
    event.preventDefault();
    const target = event.currentTarget; // <a> 本身
    const href = target.getAttribute('href');
    if (!href) return;

    const section = document.querySelector(href);
    const offset = 100; // 調整所需偏移量

    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const anchorList = document.querySelectorAll('.sidenav a');

    // 監聽點擊
    anchorList.forEach((link) =>
      link.addEventListener('click', handleLinkClick),
    );

    // 滾動時同步高亮目前章節
    const handleScroll = () => {
      let currentSection = null;

      anchorList.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href === '#top') return; // 排除「Back to Top」

        const section = document.querySelector(href);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          const sectionBottom = sectionTop + section.clientHeight;
          if (sectionTop <= 150 && sectionBottom > 150) {
            currentSection = section;
          }
        }
      });

      anchorList.forEach((link) => {
        const href = link.getAttribute('href');
        if (currentSection && href === `#${currentSection.id}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // 判斷是否已滑到底部
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setIsAtBottom(atBottom);

      if (atBottom) {
        anchorList.forEach((link) => link.classList.remove('active'));
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      anchorList.forEach((link) =>
        link.removeEventListener('click', handleLinkClick),
      );
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 回頂端
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sidenav">
      <div className="sidenav-header">Contents</div>
      <hr />
      {links.map((link, index) => (
        <a key={index} href={link.href}>
          {link.label}
        </a>
      ))}
      <a
        href="#top"
        onClick={scrollToTop}
        className={isAtBottom ? 'active' : ''}
      >
        Back to Top
      </a>
    </div>
  );
};

SideNav.propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string.isRequired,
        label: PropTypes.node.isRequired, // 允許 string 或 JSX
      })
    ).isRequired,
  };
  
  export default SideNav;
