import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe,faEnvelope, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {  faInstagram } from '@fortawesome/free-brands-svg-icons';
// import ImageSlider from "../components/ImageSlider";
import "../containers/Bootstrapcss.css";

export function Footer() {
  const emailAddress = "petrichortpe@gmail.com";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="pt-4 pb-4 footer py-4 mt-5 footer-above text-black">
        <Container>
          <Row>
            <Col lg={2} xs={12}>
              <div className="footer-left text-center text-lg-start">
                <img
                  src="../../public/txt_icon.png"
                  alt="Team Logo"
                  className="team-logofooter mb-3"
                />
                <div className="social-icons d-flex justify-content-center justify-content-lg-start gap-3">
                  <a href={`mailto:${emailAddress}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                  </a>
                  <a href="https://petrichor.tw/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGlobe} size="2x" />
                  </a>
                  <a href="https://www.instagram.com/petrichor_tpe/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </a>
                </div>
              </div>
            </Col>

            {/* <Col lg={10} xs={12}>
              <ImageSlider />
            </Col> */}
          </Row>
        </Container>

        <button className="back-to-top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
