import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ClothingDetector } from '../components';

const Demo = () => {
  return (
    <Container>
      <Row className="my-5">
        <Col lg={12} className="text-center">
          <h2>服裝偵測演示</h2>
          <p>此示範會使用您的相機，並偵測服裝移動時變更顏色。</p>
        </Col>
      </Row>
      
      <Row className="justify-content-center mb-5">
        <Col lg={8}>
          <ClothingDetector />
        </Col>
      </Row>
      
      <Row className="mb-5">
        <Col lg={12}>
          <h3>如何使用</h3>
          <ol>
            <li>點擊「開始偵測」按鈕啟動相機</li>
            <li>系統會自動載入人體偵測模型</li>
            <li>站在相機前，確保您的衣物可見</li>
            <li>移動身體，系統會偵測衣物的移動並將其變為黃色</li>
            <li>完成後點擊「停止偵測」按鈕</li>
          </ol>
        </Col>
      </Row>
    </Container>
  );
};

export default Demo; 