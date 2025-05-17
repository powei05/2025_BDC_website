import { Container } from 'react-bootstrap';
import "../containers/Bootstrapcss.css";
import { Theater } from '../components';


export default function Pov() {




  return (
    <div style={{ overflowX: 'hidden' }}>
          
      <Container  className="container-home">
      {/* <ParallaxComponent /> */}
      <Theater />
      
      <div style={{ marginTop: '900px' }}>
        </div>
        



       
      </Container>
    </div>
  );
}
