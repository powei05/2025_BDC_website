import React, { useRef, useEffect, useState } from 'react';
import * as bodyPix from '@tensorflow-models/body-pix';
import '@tensorflow/tfjs';
import { Button, Spinner, Alert } from 'react-bootstrap';
import './ClothingDetector.css';

const ClothingDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [model, setModel] = useState(null);
  const [movementDetected, setMovementDetected] = useState(false);
  const [previousSegmentation, setPreviousSegmentation] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('準備就緒');
  
  // Load TensorFlow.js and BodyPix model
  useEffect(() => {
    const preloadTFJS = async () => {
      try {
        setStatus('正在預載入 TensorFlow.js...');
        // Make sure TensorFlow.js is properly initialized
        await import('@tensorflow/tfjs');
        setStatus('TensorFlow.js 已載入');
      } catch (err) {
        console.error('TensorFlow.js 載入失敗:', err);
        setError(`TensorFlow.js 載入失敗: ${err.message}`);
      }
    };
    
    preloadTFJS();
  }, []);
  
  // Load BodyPix model
  const loadModel = async () => {
    setIsModelLoading(true);
    setError(null);
    setStatus('載入 BodyPix 模型中...');
    
    try {
      const loadedModel = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2
      });
      
      setModel(loadedModel);
      setIsModelLoading(false);
      setStatus('模型載入完成');
      console.log('BodyPix model loaded successfully');
      return loadedModel;
    } catch (err) {
      console.error('載入模型失敗:', err);
      setIsModelLoading(false);
      setError(`載入模型失敗: ${err.message}`);
      setStatus('模型載入失敗');
      return null;
    }
  };

  // Start camera
  const startCamera = async () => {
    setError(null);
    
    try {
      let activeModel = model;
      if (!activeModel) {
        setStatus('載入模型中...');
        activeModel = await loadModel();
        if (!activeModel) {
          setError('無法載入模型，請檢查控制台的錯誤訊息');
          return;
        }
      }
      
      setStatus('請求相機訪問權限...');
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('您的瀏覽器不支持相機訪問，請使用現代瀏覽器如 Chrome 或 Firefox');
        return;
      }
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        
        setStatus('相機已啟動');
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().then(() => {
              console.log('Video is playing');
              setIsDetecting(true);
              
              // Set canvas dimensions to match video
              if (canvasRef.current) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
              }
              
              setStatus('開始偵測中...');
              detectClothing();
            }).catch(err => {
              console.error('Video play failed:', err);
              setError(`影片播放失敗: ${err.message}`);
            });
          };
          
          videoRef.current.onerror = (err) => {
            console.error('Video error:', err);
            setError(`影片錯誤: ${err}`);
          };
        }
      } catch (err) {
        console.error('無法訪問相機:', err);
        setError(`無法訪問相機: ${err.message}. 請確保您已授權相機訪問權限。`);
        setStatus('相機訪問失敗');
      }
    } catch (err) {
      console.error('啟動相機過程中的錯誤:', err);
      setError(`啟動相機失敗: ${err.message}`);
      setStatus('啟動失敗');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      try {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
        setIsDetecting(false);
        setMovementDetected(false);
        setPreviousSegmentation(null);
        setStatus('已停止');
        
        // Clear canvas
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      } catch (err) {
        console.error('停止相機時發生錯誤:', err);
        setError(`停止相機失敗: ${err.message}`);
      }
    }
  };

  // Function to detect clothing and highlight when movement is detected
  const detectClothing = async () => {
    if (!model || !videoRef.current || !canvasRef.current || !isDetecting) {
      console.log('Detection conditions not met:', {
        model: !!model,
        video: !!videoRef.current,
        canvas: !!canvasRef.current,
        isDetecting
      });
      return;
    }

    try {
      // Make sure video is playing
      if (videoRef.current.paused || videoRef.current.ended) {
        console.log('Video is paused or ended');
        return;
      }
      
      // Segment person
      const segmentation = await model.segmentPerson(videoRef.current, {
        flipHorizontal: false,
        internalResolution: 'medium',
        segmentationThreshold: 0.7
      });

      // Draw results
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Clear canvas and draw video frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      // Detect movement if we have a previous segmentation
      if (previousSegmentation) {
        let movement = false;
        const currentMask = segmentation.data;
        const previousMask = previousSegmentation.data;
        
        // Compare current and previous masks to detect movement
        let changedPixels = 0;
        for (let i = 0; i < currentMask.length; i++) {
          if (currentMask[i] !== previousMask[i]) {
            changedPixels++;
          }
        }
        
        // Movement threshold
        const movementThreshold = currentMask.length * 0.01; // 1% of pixels changed
        movement = changedPixels > movementThreshold;
        
        if (movement) {
          setMovementDetected(true);
          setStatus('偵測到移動！');
          
          // Draw yellow overlay on clothing areas when movement is detected
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          for (let i = 0; i < segmentation.data.length; i++) {
            // If this pixel is part of a person
            if (segmentation.data[i]) {
              const pixelIndex = i * 4;
              // Add yellow tint
              data[pixelIndex] = Math.min(255, data[pixelIndex] + 100); // R
              data[pixelIndex + 1] = Math.min(255, data[pixelIndex + 1] + 100); // G
              data[pixelIndex + 2] = Math.max(0, data[pixelIndex + 2] - 50); // B
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
        } else {
          setMovementDetected(false);
        }
      } else {
        console.log('First frame captured, waiting for movement');
      }
      
      setPreviousSegmentation(segmentation);
    } catch (err) {
      console.error('偵測衣物時發生錯誤:', err);
      // Don't set error to avoid error popup during detection
      setStatus(`偵測過程中出現問題: ${err.message}`);
    }
    
    // Continue detection if still active
    if (isDetecting) {
      requestAnimationFrame(detectClothing);
    }
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="clothing-detector">
      {error && (
        <Alert variant="danger" className="mb-3">
          <Alert.Heading>發生錯誤</Alert.Heading>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            請檢查您的相機權限，或嘗試刷新頁面。如果問題持續，請使用 Chrome 或 Firefox 瀏覽器。
          </p>
        </Alert>
      )}
      
      <div className="status-bar mb-2">
        狀態: <strong>{status}</strong>
      </div>
      
      <div className="video-container">
        <video 
          ref={videoRef} 
          className="video-feed" 
          width="640" 
          height="480" 
          playsInline
        />
        <canvas 
          ref={canvasRef} 
          className="detection-canvas" 
          width="640" 
          height="480" 
        />
        
        {isModelLoading && (
          <div className="loading-overlay">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">載入中...</span>
            </Spinner>
            <p>載入模型中...</p>
          </div>
        )}
        
        {movementDetected && (
          <div className="movement-indicator">移動偵測中！</div>
        )}
      </div>
      
      <div className="controls mt-3">
        {!isDetecting ? (
          <Button 
            variant="primary" 
            onClick={startCamera} 
            disabled={isModelLoading}
            className="btn-lg"
          >
            {isModelLoading ? '載入中...' : '開始偵測'}
          </Button>
        ) : (
          <Button 
            variant="danger"
            onClick={stopCamera}
            className="btn-lg"
          >
            停止偵測
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClothingDetector; 