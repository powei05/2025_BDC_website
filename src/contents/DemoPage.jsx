import React from 'react';
import { ClothingColorChanger } from '../components';
import styles from './DemoPage.module.css'; 
import { useNavigate } from 'react-router-dom';

const DemoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="demo-page">
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            {/* <h1 className="mb-4 text-center">Petrichor Demo</h1> */}

            <ClothingColorChanger />

            {/* Your COMPLETE button */}
            <button
              className={styles.completeButton}
              onClick={() => navigate('/overview')}
            >
              COMPLETE
            </button>

            <div className="mt-5">
              <h3>How it works:</h3>
              <ol className="mt-3">
                <li>Click the "Start Camera" button to access your device's camera</li>
                <li>Stand in front of the camera so your upper body is visible</li>
                <li>The AI will detect your shirt/clothing on your torso</li>
                <li>Move closer or further from the camera to simulate stretching</li>
                <li>Watch as your clothing changes color continuously: Red → Orange → Yellow → Green → Blue → Violet</li>
                <li>This behavior is reversible and continuous - stretch more, and the color changes more</li>
              </ol>

              <div className="alert alert-info mt-4">
                <strong>CLCE Fiber Technology:</strong> This demo simulates Chameleon-Like Color-Changing Effect (CLCE) fibers that respond to mechanical stress. The color transition mimics how these smart textiles change appearance when stretched or compressed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage; 