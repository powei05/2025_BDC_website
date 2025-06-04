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
            <h1 className="mb-4 text-center">Petrichor Demo</h1>

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
                <li>The AI will detect your clothing and change its color</li>
                <li>Select either red or yellow to change the color of your clothing</li>
              </ol>

              <div className="alert alert-info mt-4">
                <strong>Note:</strong> This demo works best in good lighting conditions and when wearing solid-colored clothing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage; 