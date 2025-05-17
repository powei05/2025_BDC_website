import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as bodyPix from '@tensorflow-models/body-pix';
import './ClothingColorChanger.css';

// 添加用於較老瀏覽器的 getUserMedia polyfill
const setupMediaDevicesPolyfill = () => {
  // 確保 navigator.mediaDevices 存在
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  
  // 提供舊版的 getUserMedia 兼容方案
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

// 正確的胸部/軀幹部位索引 (TF.js 4.x 中是零基索引)
const TORSO_PART_IDS = [13, 14]; // 13是前胸，14是後背

const ClothingColorChanger = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [model, setModel] = useState(null);
  const [colorOption, setColorOption] = useState('red');
  const [cameraError, setCameraError] = useState(null);
  const [isCameraAvailable, setIsCameraAvailable] = useState(true);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [playAttempts, setPlayAttempts] = useState(0);
  const [modelStatus, setModelStatus] = useState('初始化中...');
  const [showCamera, setShowCamera] = useState(false);
  const maxPlayAttempts = 3;
  
  // 獲取瀏覽器信息
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
  
  // 嘗試設置 polyfill
  useEffect(() => {
    try {
      setupMediaDevicesPolyfill();
      console.log('MediaDevices polyfill setup attempted');
    } catch (error) {
      console.error('Error setting up MediaDevices polyfill:', error);
    }
  }, []);
  
  // 檢查相機API是否可用
  useEffect(() => {
    // 檢查相機API支持
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Camera API not available');
      setIsCameraAvailable(false);
      setCameraError('您的瀏覽器不支持攝像頭功能。請嘗試使用最新版本的Chrome、Firefox或Safari瀏覽器，並確保通過HTTPS或localhost訪問網站。');
    } else {
      // 檢查是否在安全上下文中運行
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        console.warn('Not running in a secure context - camera might not work');
        setCameraError('請注意：攝像頭功能需要在HTTPS或localhost環境中才能使用。您當前的連接可能不安全。');
      }
    }
  }, []);
  
  // Initialize BodyPix model
  useEffect(() => {
    const loadModel = async () => {
      try {
        // 1️⃣ 確保 TensorFlow.js 後端準備好
        setModelStatus('初始化 TensorFlow.js 後端...');
        await tf.setBackend('webgl');
        await tf.ready();
        console.log('TensorFlow.js 後端已初始化');
        
        // 加載 BodyPix 模型
        setModelStatus('正在加載 BodyPix 模型...');
        const loadedModel = await bodyPix.load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          multiplier: 0.75,
          quantBytes: 2
        });
        setModel(loadedModel);
        setModelStatus('AI 模型加載完成 ✅');
        console.log('BodyPix model loaded successfully');
      } catch (error) {
        console.error('Failed to load BodyPix model:', error);
        setModelStatus('AI 模型加載失敗 ❌');
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
      // 檢查navigator.mediaDevices是否可用
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('您的瀏覽器不支持攝像頭功能。請嘗試使用最新版本的Chrome、Firefox或Safari瀏覽器，並確保通過HTTPS或localhost訪問網站。');
      }
      
      const constraints = {
        video: {
          width: 640,
          height: 480,
        },
        audio: false
      };
      
      console.log('請求相機權限...');
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('相機權限已獲得，stream:', stream.id);
      
      if (videoRef.current) {
        // 設置視頻流
        videoRef.current.srcObject = stream;
        
        // 創建一個 Promise 來等待視頻加載完成
        const waitForLoadedMetadata = new Promise((resolve) => {
          // 如果已經加載完成，直接解析
          if (videoRef.current.readyState >= 2) {
            resolve();
          } else {
            // 否則，等待 loadedmetadata 事件
            const handleLoadedMetadata = () => {
              videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
              resolve();
            };
            videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
          }
        });
        
        // 等待視頻加載完成
        await waitForLoadedMetadata;
        console.log('視頻元數據已加載');
        
        // 嘗試播放視頻
        try {
          console.log('嘗試播放視頻...');
          await videoRef.current.play();
          console.log('視頻開始播放成功');
          
          // 在play()成功後設置狀態
          setIsStreaming(true);
          
          // 顯示相機畫面
          setShowCamera(true);
          
          // 立即開始一次幀處理
          console.log('觸發第一次幀處理');
          setTimeout(() => {
            processFrame();
          }, 100);
        } catch (playError) {
          console.error('播放視頻時出錯:', playError);
          setPlayAttempts(prev => prev + 1);
          
          if (playAttempts < maxPlayAttempts) {
            // 如果是播放中斷錯誤，嘗試短暫延遲後重試
            if (playError.message.includes('interrupted')) {
              setCameraError('視頻播放被中斷，正在重試...');
              
              // 延遲 500ms 後重試
              setTimeout(() => {
                startCamera();
              }, 500);
              return;
            }
          }
          
          // 設置具體的錯誤信息
          let playErrorMsg = '視頻播放失敗: ' + playError.message;
          
          // 如果是中斷錯誤，提供更具體的建議
          if (playError.message.includes('interrupted')) {
            playErrorMsg += '。請嘗試刷新頁面後，不要進行其他操作，立即點擊"Start Camera"按鈕。';
          }
          
          setCameraError(playErrorMsg);
        }
      }
    } catch (error) {
      console.error('訪問相機時出錯:', error);
      let errorMessage = '訪問相機時出錯。';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += '請允許相機訪問權限。';
      } else if (error.name === 'NotFoundError') {
        errorMessage += '未找到相機設備。';
      } else {
        errorMessage += error.message || '未知錯誤';
      }
      
      setCameraError(errorMessage);
    }
  };
  
  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
      setShowCamera(false);
      
      // Clear canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  
  // Process video frame
  const processFrame = async () => {
    console.log('處理幀');
    // 檢查是否處於流媒體模式和視頻/畫布引用是否存在
    if (!isStreaming || !videoRef.current || !canvasRef.current) {
      console.log('流媒體未啟動或引用缺失');
      return;
    }
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // 顯示一些調試信息
    console.log('視頻狀態:', {
      readyState: video.readyState,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      paused: video.paused,
      ended: video.ended
    });
    
    // 確保視頻準備好
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      console.log('視頻未準備好，等待下一幀');
      requestAnimationFrame(processFrame);
      return;
    }
    
    // 明確設置 canvas 尺寸
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      console.log(`設置 canvas 尺寸: ${video.videoWidth}x${video.videoHeight}`);
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }
    
    // 只有當模型加載完成時才嘗試進行AI處理
    if (model) {
      try {
        console.log('嘗試使用AI模型處理畫面');
        
        // 執行人體部位分割
        const parts = await model.segmentPersonParts(video, {
          internalResolution: 'medium',
          segmentationThreshold: 0.5,
          scoreThreshold: 0.2
        });
        
        if (parts && parts.allPoses && parts.allPoses.length > 0) {
          console.log('檢測到姿勢數量:', parts.allPoses.length);
          
          // 定義顏色 - 注意需要包含 alpha 值
          const fgColor = colorOption === 'red'
            ? { r: 255, g: 0, b: 0, a: 255 }  // 紅色
            : { r: 255, g: 255, b: 0, a: 255 }; // 黃色
          
          // 只給想要染的部位上色，其餘保持透明
          const mask = bodyPix.toMask(
            parts,
            fgColor,                       // 前景顏色
            { r: 0, g: 0, b: 0, a: 0 },    // 透明背景
            TORSO_PART_IDS,                // 只針對胸部部位
          );
          
          console.log('生成遮罩:', {
            maskWidth: mask.width,
            maskHeight: mask.height,
            canvasWidth: canvas.width,
            canvasHeight: canvas.height,
            dataLength: mask.data.length,
            expectedLength: 4 * canvas.width * canvas.height
          });
          
          // 0.7 代表保留 30% 原本材質；0 代表不 blur；false 不左右翻
          bodyPix.drawMask(canvas, video, mask, 0.7, 0, false);
          
          console.log('成功應用顏色遮罩');
        } else {
          console.log('未檢測到人體姿勢，繪製原始影像');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // 添加文字提示，告知用戶未檢測到人體
          ctx.font = '20px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.fillText('未檢測到人體，請調整姿勢或光線', canvas.width / 2, 30);
        }
      } catch (error) {
        console.error('處理幀時出錯:', error);
        // 即使出錯，繪製原始幀，確保用戶仍會看到相機畫面
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
    } else {
      console.log('模型未加載，僅顯示原始相機畫面');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // 添加文字提示，告知用戶模型未加載
      ctx.font = '20px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('等待AI模型加載...', canvas.width / 2, 30);
    }
    
    // 繼續處理後續幀
    requestAnimationFrame(processFrame);
  };
  
  // 啟動相機處理函數的替代方法，以確保它真的被調用
  useEffect(() => {
    let frameRequestId = null;
    
    if (isStreaming && videoRef.current) {
      console.log('啟動幀處理循環');
      const startProcessing = () => {
        frameRequestId = requestAnimationFrame(processFrame);
      };
      
      startProcessing();
    }
    
    return () => {
      // 清理效果
      if (frameRequestId) {
        console.log('清理幀處理循環');
        cancelAnimationFrame(frameRequestId);
      }
    };
  }, [isStreaming]);
  
  return (
    <div className="clothing-color-changer">
      <h2>Petrichor</h2>
      
      <div className="controls">
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
        
        {isStreaming && (
          <div className="color-options">
            <span>Choose Color: </span>
            <button 
              className={`color-btn red ${colorOption === 'red' ? 'active' : ''}`}
              onClick={() => setColorOption('red')}
            >
              Red
            </button>
            <button 
              className={`color-btn yellow ${colorOption === 'yellow' ? 'active' : ''}`}
              onClick={() => setColorOption('yellow')}
            >
              Yellow
            </button>
          </div>
        )}
      </div>
      
      {isStreaming && (
        <div className="model-status">
          模型狀態: {modelStatus}
        </div>
      )}
      
      {cameraError && (
        <div className="error-message alert alert-danger">
          {cameraError}
          {cameraError.includes('interrupted') && (
            <div className="interrupted-error-help">
              <p><strong>播放中斷問題解決建議:</strong></p>
              <ol>
                <li>請完全刷新頁面 (按F5或⌘+R)</li>
                <li>等待頁面完全載入</li>
                <li>不要與頁面其他元素互動</li>
                <li>直接點擊"Start Camera"按鈕</li>
                <li>如果問題仍然存在，請嘗試使用不同的瀏覽器</li>
              </ol>
            </div>
          )}
          <button 
            className="debug-btn"
            onClick={() => setShowDebugInfo(!showDebugInfo)}
          >
            {showDebugInfo ? '隱藏診斷信息' : '顯示診斷信息'}
          </button>
          
          {showDebugInfo && (
            <div className="debug-info">
              <h4>瀏覽器診斷信息</h4>
              <pre>
                {JSON.stringify(getBrowserInfo(), null, 2)}
              </pre>
              <p>請確保您：</p>
              <ol>
                <li>使用最新版本的Chrome、Firefox或Safari瀏覽器</li>
                <li>通過HTTPS或localhost訪問本網站</li>
                <li>已允許瀏覽器的相機權限</li>
                <li>設備有可用的攝像頭</li>
              </ol>
            </div>
          )}
        </div>
      )}
      
      <div className="video-container">
        {/* 3️⃣ 調試時讓視頻保持可見，但縮小 */}
        <video 
          ref={videoRef}
          playsInline
          muted
          style={{ 
            width: 160,
            height: 120,
            position: 'absolute',
            bottom: 8,
            right: 8,
            border: '2px solid #fff',
            zIndex: 10
          }}
          onCanPlay={() => {
            console.log('視頻可以播放了');
          }}
        />
        {/* 2️⃣ Canvas 已在 CSS 中設置明確的尺寸和背景色 */}
        <canvas 
          ref={canvasRef} 
          className="output-canvas"
        />
        
        {isStreaming && !model && (
          <div className="loading-model-overlay">
            <p>正在加載 AI 模型，請稍候...</p>
            <p>您應該已經可以看到相機畫面，但顏色變換功能需要等待 AI 模型加載完成</p>
          </div>
        )}
      </div>
      
      {!isStreaming && !cameraError && (
        <div className="instructions">
          <p>點擊 "Start Camera" 按鈕啟用相機和衣物顏色變換功能。</p>
          <p>請確保站在相機前，讓您的上半身清晰可見。</p>
        </div>
      )}
      
      {isStreaming && (
        <div className="camera-tips">
          <h3>使用提示</h3>
          <ul>
            <li>確保您站在明亮的環境中</li>
            <li>穿著與背景明顯不同顏色的衣物</li>
            <li>調整您與相機的距離，使上半身清晰可見</li>
            <li>如果無法檢測到衣物，可嘗試改變姿勢或位置</li>
          </ul>
          <div className="debug-info">
            <p><strong>技術說明:</strong> 此演示使用 TensorFlow.js 和 BodyPix 模型，將檢測您上半身的衣物(胸部區域，索引13和14)，並將其顏色更改為紅色或黃色</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothingColorChanger; 