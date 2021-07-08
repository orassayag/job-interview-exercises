import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  max-width: 100%;
  height: auto;
  display: block)};
`;

const Modal = ({ modal, children }) => {
  return (
    <>
      <ModalWrapper ref={modal}>
        {children}
      </ModalWrapper>
    </>
  );
};

export default Modal;