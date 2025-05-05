import { Container, Row, Col } from 'react-bootstrap';
import "../containers/Bootstrapcss.css";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const { ref: textRef, inView: isInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Container className="container-home">
        <Row>
          <Col lg={12} xs={12}>
            <motion.div
              ref={textRef}
              className="animated-text-home"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <h1>Welcome</h1>
              <p>This is your landing page. Add your animations and content here.</p>
            </motion.div>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <div className="placeholder-box">Left Content</div>
            </motion.div>
          </Col>

          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <div className="placeholder-box">Right Content</div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
