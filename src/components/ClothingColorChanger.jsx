import  { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as bodyPix from '@tensorflow-models/body-pix';
import './ClothingColorChanger.css';

// Add getUserMedia polyfill for older browsers
const setupMediaDevicesPolyfill = () => {
  // Ensure navigator.mediaDevices exists
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  
  // Provide compatibility for older getUserMedia
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
      const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      
      if (!getUserMedia) {
        return Promise.reject(
          new Error('getUserMedia is not implemented in this browser')
        );
      }
      
      return new Promise(function(resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
};

// BodyPix part indices - let's try torso and arms for shirt area
const TORSO_PART_IDS = [2,3,4,5,6,7,8,9,10,11,12,13,14,15]; 

// CLCE color progression (Red → Orange → Yellow → Green → Blue → Violet)
const CLCE_COLORS = [
  { r: 255, g: 0, b: 0 },     // Red
  { r: 255, g: 165, b: 0 },   // Orange  
  { r: 255, g: 255, b: 0 },   // Yellow
  { r: 0, g: 255, b: 0 },     // Green
  { r: 0, g: 0, b: 255 },     // Blue
  { r: 128, g: 0, b: 128 }    // Violet
];

const ClothingColorChanger = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [model, setModel] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isCameraAvailable, setIsCameraAvailable] = useState(true);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [playAttempts, setPlayAttempts] = useState(0);
  const [modelStatus, setModelStatus] = useState('Initializing...');
  const [showCamera, setShowCamera] = useState(false);
  const [stretchFactor, setStretchFactor] = useState(0); // 0-1 scale for color interpolation
  const [isProcessing, setIsProcessing] = useState(false);
  const maxPlayAttempts = 3;
  
  // Get browser information
  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    
    const hasMediaDevices = !!navigator.mediaDevices;
    const hasGetUserMedia = navigator.mediaDevices ? !!navigator.mediaDevices.getUserMedia : false;
    const secureContext = protocol === 'https:' || hostname === 'localhost';
    
    return {
      userAgent,
      protocol,
      hostname,
      hasMediaDevices,
      hasGetUserMedia,
      secureContext
    };
  };
  
  // Calculate stretch factor based on person size in frame
  const calculateStretchFactor = (segmentation) => {
    if (!segmentation || !segmentation.allPoses || segmentation.allPoses.length === 0) return 0;
    
    // Get the first pose
    const pose = segmentation.allPoses[0];
    if (!pose || !pose.keypoints) return 0;
    
    // Find shoulder keypoints to estimate person size
    const leftShoulder = pose.keypoints.find(kp => kp.part === 'leftShoulder');
    const rightShoulder = pose.keypoints.find(kp => kp.part === 'rightShoulder');
    
    if (!leftShoulder || !rightShoulder || leftShoulder.score < 0.3 || rightShoulder.score < 0.3) {
      return 0;
    }
    
    // Calculate shoulder width as proxy for person size/distance
    const shoulderWidth = Math.abs(leftShoulder.position.x - rightShoulder.position.x);
    
    // Normalize shoulder width (typical range 80-300 pixels)
    // Larger shoulder width = closer to camera = more "stretch"
    const normalizedWidth = Math.min(1, Math.max(0, (shoulderWidth - 80) / 220));
    
    return normalizedWidth;
  };
  
  // Interpolate between CLCE colors based on stretch factor
  const getClceColor = (factor) => {
    if (factor <= 0) return CLCE_COLORS[0];
    if (factor >= 1) return CLCE_COLORS[CLCE_COLORS.length - 1];
    
    // Calculate which two colors to interpolate between
    const scaledFactor = factor * (CLCE_COLORS.length - 1);
    const lowerIndex = Math.floor(scaledFactor);
    const upperIndex = Math.min(lowerIndex + 1, CLCE_COLORS.length - 1);
    const t = scaledFactor - lowerIndex;
    
    const lowerColor = CLCE_COLORS[lowerIndex];
    const upperColor = CLCE_COLORS[upperIndex];
    
    return {
      r: Math.round(lowerColor.r + (upperColor.r - lowerColor.r) * t),
      g: Math.round(lowerColor.g + (upperColor.g - lowerColor.g) * t),
      b: Math.round(lowerColor.b + (upperColor.b - lowerColor.b) * t)
    };
  };
  
  // Try to setup polyfill
  useEffect(() => {
    try {
      setupMediaDevicesPolyfill();
      console.log('MediaDevices polyfill setup attempted');
    } catch (error) {
      console.error('Error setting up MediaDevices polyfill:', error);
    }
  }, []);
  
  // Check if camera API is available
  useEffect(() => {
    // Check camera API support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Camera API not available');
      setIsCameraAvailable(false);
      setCameraError('Your browser does not support camera functionality. Please try using the latest version of Chrome, Firefox, or Safari, and ensure you are accessing the website via HTTPS or localhost.');
    } else {
      // Check if running in secure context
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        console.warn('Not running in a secure context - camera might not work');
        setCameraError('Please note: Camera functionality requires HTTPS or localhost environment. Your current connection may not be secure.');
      }
    }
  }, []);
  
  // Initialize BodyPix model
  useEffect(() => {
    const loadModel = async () => {
      try {
        // 1️⃣ Ensure TensorFlow.js backend is ready
        setModelStatus('Initializing TensorFlow.js backend...');
        await tf.setBackend('webgl');
        await tf.ready();
        console.log('TensorFlow.js backend initialized');
        
        // Load BodyPix model
        setModelStatus('Loading BodyPix model...');
        const loadedModel = await bodyPix.load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          multiplier: 0.75,
          quantBytes: 2
        });
        setModel(loadedModel);
        setModelStatus('AI model loaded successfully ✅');
        console.log('BodyPix model loaded successfully');
      } catch (error) {
        console.error('Failed to load BodyPix model:', error);
        setModelStatus('AI model loading failed ❌');
        setCameraError('Failed to load AI model. Please try again later.');
      }
    };
    
    loadModel();
    
    return () => {
      // Clean up resources when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);
  
  // Start camera stream
  const startCamera = async () => {
    setCameraError(null);
    setPlayAttempts(0);
    
    try {
      // Check if navigator.mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Your browser does not support camera functionality. Please try using the latest version of Chrome, Firefox, or Safari, and ensure you are accessing the website via HTTPS or localhost.');
      }
      
      const constraints = {
        video: {
          width: 640,
          height: 480,
        },
        audio: false
      };
      
      console.log('Requesting camera permission...');
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera permission granted, stream:', stream.id);
      
      if (videoRef.current) {
        // Set video stream
        videoRef.current.srcObject = stream;
        
        // Create a Promise to wait for video to load
        const waitForLoadedMetadata = new Promise((resolve) => {
          // If already loaded, resolve immediately
          if (videoRef.current.readyState >= 2) {
            resolve();
          } else {
            // Otherwise, wait for loadedmetadata event
            const handleLoadedMetadata = () => {
              videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
              resolve();
            };
            videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
          }
        });
        
        // Wait for video to load
        await waitForLoadedMetadata;
        console.log('Video metadata loaded');
        
        // Try to play video
        try {
          console.log('Attempting to play video...');
          await videoRef.current.play();
          console.log('Video playback started successfully');
          
          // Set state after play() succeeds
          setIsStreaming(true);
          
          // Show camera feed
          setShowCamera(true);
          
          // Start frame processing immediately
          console.log('Triggering first frame processing');
          // Start processing right away to show video feed
          processFrame();
        } catch (playError) {
          console.error('Error playing video:', playError);
          setPlayAttempts(prev => prev + 1);
          
          if (playError.name === 'AbortError') {
            throw new Error('Video playback was interrupted. This might be due to browser security policies or user interaction requirements.');
          } else if (playError.name === 'NotAllowedError') {
            throw new Error('Camera access was denied. Please grant camera permission and try again.');
          } else {
            throw new Error(`Video playback failed: ${playError.message}`);
          }
        }
      }
    } catch (error) {
      console.error('Error starting camera:', error);
      setCameraError(error.message);
      setIsStreaming(false);
    }
  };
  
  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setShowCamera(false);
    console.log('Camera stopped');
  };
  
  // Process frame function
  const processFrame = async () => {
    if (!isStreaming || !videoRef.current || !canvasRef.current || isProcessing) {
      return;
    }
    
    setIsProcessing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Ensure video is ready to be drawn
    if (video.readyState < 2) {
      setIsProcessing(false);
      requestAnimationFrame(processFrame);
      return;
    }
    
    // Set canvas size only once at the beginning
    const videoWidth = video.videoWidth || 640;
    const videoHeight = video.videoHeight || 480;
    
    if (canvas.width === 0 || Math.abs(canvas.width - videoWidth) > 10 || Math.abs(canvas.height - videoHeight) > 10) {
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      console.log(`Canvas size set to: ${videoWidth}x${videoHeight}`);
    }
    
    if (model && video.readyState >= 2) {
      try {
        console.log('Running person segmentation...');
        
        // Perform person segmentation with part detection
        const segmentation = await model.segmentPersonParts(video, {
          flipHorizontal: false,
          internalResolution: 'medium',
          segmentationThreshold: 0.7,
          maxDetections: 1,
          scoreThreshold: 0.2,
          nmsRadius: 20,
        });
        
        if (segmentation && segmentation.allPoses && segmentation.allPoses.length > 0) {
          console.log('Person segmentation successful, poses found:', segmentation.allPoses.length);
          
          // Calculate stretch factor based on person size  
          const currentStretch = calculateStretchFactor(segmentation);
          setStretchFactor(currentStretch);
          
          // Get CLCE color based on stretch
          const clceColor = getClceColor(currentStretch);
          
          // First draw the original video
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Get the segmentation data directly
          const { data, width, height } = segmentation;
          
          // Create image data for manual color application
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;
          
          // Apply color only to torso area, avoiding face region
          for (let i = 0; i < data.length; i++) {
            const partId = data[i];
            
            // Only apply to torso and upper arms (shirt area)
            if (TORSO_PART_IDS.includes(partId)) {
              const pixelIndex = i * 4;
              const y = Math.floor(i / width);
              const x = i % width;
              
              // Skip upper portion (face area) - only apply to lower 60% of person
              const relativeY = y / height;
              if (relativeY > 0.4) { // Only apply to lower 60% of the frame
                // Blend with existing color
                const alpha = 0.6;
                pixels[pixelIndex] = Math.round(pixels[pixelIndex] * (1 - alpha) + clceColor.r * alpha);     // Red
                pixels[pixelIndex + 1] = Math.round(pixels[pixelIndex + 1] * (1 - alpha) + clceColor.g * alpha); // Green
                pixels[pixelIndex + 2] = Math.round(pixels[pixelIndex + 2] * (1 - alpha) + clceColor.b * alpha); // Blue
              }
            }
          }
          
          // Apply the modified image data back to canvas
          ctx.putImageData(imageData, 0, 0);
          
          console.log('Applied color to shirt area, avoiding face region');
          
          // Display status information
          ctx.font = '16px Arial';
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 2;
          ctx.textAlign = 'left';
          
          const statusText = `CLCE Fiber Simulation - Stretch: ${(currentStretch * 100).toFixed(0)}%`;
          const colorText = `Color: RGB(${clceColor.r}, ${clceColor.g}, ${clceColor.b})`;
          
          ctx.strokeText(statusText, 10, 30);
          ctx.fillText(statusText, 10, 30);
          ctx.strokeText(colorText, 10, 55);
          ctx.fillText(colorText, 10, 55);
          
          console.log('Successfully applied CLCE color effect');
        } else {
          console.log('No person detected, drawing original image');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Add text prompt informing user no person detected
          ctx.font = '18px Arial';
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 2;
          ctx.textAlign = 'center';
          ctx.strokeText('No person detected, please adjust your position or lighting', canvas.width / 2, 40);
          ctx.fillText('No person detected, please adjust your position or lighting', canvas.width / 2, 40);
        }
      } catch (error) {
        console.error('Error processing frame:', error);
        // Even if error occurs, draw original frame to ensure user still sees camera feed
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
    } else {
      console.log('Model not loaded, showing raw camera feed only');
      // Always draw the video first
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Add text prompt informing user model not loaded
      ctx.font = '18px Arial';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      ctx.strokeText('Waiting for AI model to load...', canvas.width / 2, 40);
      ctx.fillText('Waiting for AI model to load...', canvas.width / 2, 40);
    }
    
    // Continue processing subsequent frames
    setIsProcessing(false);
    if (isStreaming) {
      setTimeout(() => requestAnimationFrame(processFrame), 33); // ~30 FPS
    }
  };
  
  // Ensure frame processing continues
  useEffect(() => {
    let timeoutId = null;
    
    if (isStreaming && videoRef.current && canvasRef.current && !isProcessing) {
      console.log('Starting frame processing loop');
      
      // Start after a delay to ensure video is ready
      timeoutId = setTimeout(() => {
        if (isStreaming && videoRef.current && canvasRef.current) {
          processFrame();
        }
      }, 200);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isStreaming]);
  
  return (
    <div className="clothing-color-changer">
      <h2>CLCE Fiber Simulation</h2>
      
      {isStreaming && (
        <div className="controls">
          <div className="stretch-indicator">
            <span>Stretch Level: {(stretchFactor * 100).toFixed(0)}%</span>
            <div className="stretch-bar">
              <div 
                className="stretch-fill" 
                style={{ width: `${stretchFactor * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
      
      {isStreaming && (
        <div className="model-status">
          Model Status: {modelStatus}
        </div>
      )}
      
      {cameraError && (
        <div className="error-message alert alert-danger">
          {cameraError}
          {cameraError.includes('interrupted') && (
            <div className="interrupted-error-help">
              <p><strong>Playback Interruption Solutions:</strong></p>
              <ol>
                <li>Please completely refresh the page (press F5 or ⌘+R)</li>
                <li>Wait for the page to fully load</li>
                <li>Do not interact with other page elements</li>
                <li>Click the "Start Camera" button directly</li>
                <li>If the problem persists, try using a different browser</li>
              </ol>
            </div>
          )}
          <button 
            className="debug-btn"
            onClick={() => setShowDebugInfo(!showDebugInfo)}
          >
            {showDebugInfo ? 'Hide Diagnostic Info' : 'Show Diagnostic Info'}
          </button>
          
          {showDebugInfo && (
            <div className="debug-info">
              <h4>Browser Diagnostic Information</h4>
              <pre>
                {JSON.stringify(getBrowserInfo(), null, 2)}
              </pre>
              <p>Please ensure you:</p>
              <ol>
                <li>Use the latest version of Chrome, Firefox, or Safari browser</li>
                <li>Access this website via HTTPS or localhost</li>
                <li>Have granted camera permissions to your browser</li>
                <li>Have a working camera device</li>
              </ol>
            </div>
          )}
        </div>
      )}
      
      <div className="video-container">
        {/* Hidden video element for processing */}
        <video 
          ref={videoRef}
          playsInline
          muted
          style={{ 
            display: 'none'
          }}
          onCanPlay={() => {
            console.log('Video can be played');
          }}
        />
        {/* Main canvas for displaying the processed video */}
        <canvas 
          ref={canvasRef} 
          className="output-canvas"
        />
        
        {isStreaming && !model && (
          <div className="loading-model-overlay">
            <p>Loading AI model, please wait...</p>
            <p>You should already be able to see the camera feed, but the color changing functionality needs to wait for the AI model to finish loading</p>
          </div>
        )}
      </div>
      
      <div className="camera-controls">
        {isCameraAvailable ? (
          <button 
            onClick={isStreaming ? stopCamera : startCamera}
            className={isStreaming ? "stop-btn" : "start-btn"}
            disabled={playAttempts >= maxPlayAttempts && cameraError && cameraError.includes('interrupted')}
          >
            {isStreaming ? 'Stop Camera' : 'Start Camera'}
          </button>
        ) : (
          <button 
            className="disabled-btn"
            disabled
            title="Camera API not available in your browser"
          >
            Camera not available
          </button>
        )}
      </div>
      
      {isStreaming && (
        <div className="camera-tips">
          <h3>Usage Tips</h3>
          <ul>
            <li>Ensure you are in a well-lit environment</li>
            <li>Wear clothing that contrasts clearly with the background</li>
            <li>Adjust your distance from the camera to simulate stretching</li>
            <li>Move closer to increase "stretch" and see more color change</li>
            <li>The color progresses: Red → Orange → Yellow → Green → Blue → Violet</li>
          </ul>
          {/* <div className="debug-info">
            <p><strong>Technical Note:</strong> This demo uses TensorFlow.js and BodyPix model to detect your torso/clothing area (body part index 8), and changes its color based on your distance from the camera to simulate CLCE fiber stretch response</p>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ClothingColorChanger; 