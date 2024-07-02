import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import styled from "styled-components";

const ModalComponent = ({ processing, setProcessing }) => {
  return (
    <StyledModal
      show={processing}
      onHide={() => setProcessing(false)}
      backdrop="static"
      keyboard={false}
      centered
      size="sm"
    >
      <Modal.Body>
        <SpinnerWrapper>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <LoadingText>내보내기가 진행중입니다.</LoadingText>
        </SpinnerWrapper>
      </Modal.Body>
    </StyledModal>
  );
};

export default ModalComponent;

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 24px !important;
    background: rgba(0, 0, 0, 0.8) !important;
    padding: 32px 16px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    box-shadow: none;
  }

  .spinner-border {
    --bs-spinner-width: 5rem !important;
    --bs-spinner-height: 5rem !important;
    --bs-spinner-vertical-align: -0.125em !important;
    --bs-spinner-border-width: 0.5em !important;
    --bs-spinner-animation-speed: 1.5s !important;
    --bs-spinner-animation-name: spinner-border !important;
    border-color: #fff !important;
    border-right-color: transparent !important;
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingText = styled.p`
  margin-top: 40px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`;
