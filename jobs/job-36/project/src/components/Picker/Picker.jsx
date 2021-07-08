import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import Square from '../Square/Square';
import config from '../../config/config';

const { squareSize, barSize, crossSize, inputSize } = config;

export const PickerWrapper = styled.div`
  user-select: none;
  .swatch {
    width: 100px;
    height: 50px;
    background: ${p => p.color};
  }

  input {
    width: 90px;
    font-size: 1.1em;
  }
`;

export const PickerOuter = styled.div`
  width: ${squareSize + 20}px;
  display: grid;
  border-radius: 2px;
  background: #ffffff;
  border: 1px solid #cccccc;
`;

export const PickerInner = styled.div`
  display: grid;
  grid-template-rows: ${squareSize + 20}px ${barSize}px ${inputSize}px;
  align-items: center;
  justify-items: center;
  background: #fcfcfc;
`;

export const Example = styled.div`
width: 100px;
height: 20px;
background: ${p => p.color};
`;

const Picker = () => {
  const [square, setSquare] = useState([50, 50]);
  const [squareXY, setSquareXY] = useState(() => [
    squareSize - crossSize / 2,
    crossSize / -2
  ]);
  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [color, setColor] = useState(`hsla(0, 50%, 50%)`);

  const modal = useRef(null);

  useEffect(() => {
    const setOffsets = () => {
      setOffsetTop(modal.current.offsetTop);
      setOffsetLeft(modal.current.offsetLeft);
    };
    setOffsets();
    window.addEventListener('resize', setOffsets);

    return () => {
      window.removeEventListener('resize', setOffsets);
    };
  }, []);

  useEffect(() => {
    setColor(`hsla(0, ${square[0]}%, ${square[1]}%)`);
  }, [square]);

  return (
    <>
      <PickerWrapper color={color}>
        <div className="swatch" />
        <Modal modal={modal}>
          <PickerOuter>
            <PickerInner>
              <Square
                squareXY={squareXY}
                offsetTop={offsetTop}
                offsetLeft={offsetLeft}
                setSquare={setSquare}
                setSquareXY={setSquareXY}
              />
              <Example color={color} />
              <input type="text" readOnly value={color}></input>
            </PickerInner>
          </PickerOuter>
        </Modal>
      </PickerWrapper>
    </>
  );
};

export default Picker;