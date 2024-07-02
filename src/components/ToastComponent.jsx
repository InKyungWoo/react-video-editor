import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styled from "styled-components";

const ToastComponent = ({ showToast, setShowToast }) => {
  return (
    <>
      <StyledToastContainer position={"middle-center"} bottom={"50px"}>
        <StyledToast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          bg="dark"
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Video Editor</strong>
          </Toast.Header>
          <Toast.Body>내보내기가 완료되었습니다.</Toast.Body>
        </StyledToast>
      </StyledToastContainer>
    </>
  );
};

export default ToastComponent;

const StyledToastContainer = styled(ToastContainer)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const StyledToast = styled(Toast)`
  .toast-header {
    border: 1px solid #adb5bdbf !important;
    border-radius: 0.375rem 0.375rem 0 0 !important;
    -webkit-border-radius: 0.375rem 0.375rem 0 0 !important;
    -moz-border-radius: 0.375rem 0.375rem 0 0 !important;
    -ms-border-radius: 0.375rem 0.375rem 0 0 !important;
    -o-border-radius: 0.375rem 0.375rem 0 0 !important;
  }
  .toast-body {
    border: 1px solid #adb5bdbf !important;
    border-top: none !important;
    border-radius: 0 0 0.375rem 0.375rem !important;
    -webkit-border-radius: 0 0 0.375rem 0.375rem !important;
    -moz-border-radius: 0 0 0.375rem 0.375rem !important;
    -ms-border-radius: 0 0 0.375rem 0.375rem !important;
    -o-border-radius: 0 0 0.375rem 0.375rem !important;
  }
  .toast-header,
  .toast-body {
    border-color: #383838;
    background: rgb(33, 37, 41) !important;
    color: #fff !important;
  }
`;
