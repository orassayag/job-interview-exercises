import { useEffect } from 'react';
import config from '../config/config';

const { squareSize } = config;

const usePaintSquare = (canvas) => {
  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.fillStyle = `hsl(0, 50%, 50%)`;
    ctx.fillRect(0, 0, squareSize, squareSize);
    const gradientWhite = ctx.createLinearGradient(0, 0, squareSize, 0);
    gradientWhite.addColorStop(0, `rgba(255, 255, 255, 1)`);
    gradientWhite.addColorStop(1, `rgba(255, 255, 255, 0)`);
    ctx.fillStyle = gradientWhite;
    ctx.fillRect(0, 0, squareSize, squareSize);
    const gradientBlack = ctx.createLinearGradient(0, 0, 0, squareSize);
    gradientBlack.addColorStop(0, `rgba(0, 0, 0, 0)`);
    gradientBlack.addColorStop(1, `rgba(0, 0, 0, 1)`);
    ctx.fillStyle = gradientBlack;
    ctx.fillRect(0, 0, squareSize, squareSize);
  }, [canvas]);
};

export default usePaintSquare;