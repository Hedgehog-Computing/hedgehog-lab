import { title } from '@/config';

// this utility is used to welcome users in the console
function getRandomRGBNumber() {
  return Math.floor(Math.random() * 256);
}

function getRandomColor() {
  const r = getRandomRGBNumber();
  const g = getRandomRGBNumber();
  const b = getRandomRGBNumber();

  return [`rgb(${r}, ${g}, ${b})`, `rgb(${255 - r}, ${255 - g}, ${255 - b})`];
}

function welcome() {
  const [color, invertedColor] = getRandomColor();

  const styles = [
    'font-size: 40px',
    `color: ${color}`,
    `border: 1px solid ${invertedColor}`,
    `background-color: ${invertedColor}`,
    'border-radius: 5px',
    'padding: 10px',
  ].join(';');

  console.log(`%c=== ${title} ===`, styles);
}

export default welcome;
