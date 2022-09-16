import { useState } from 'react';
import './Teleprompter.css';

function Teleprompter() {
  const [isActive, setIsActive] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [textSpeed, setTextSpeed] = useState(100);
  
  return (
    <div id="app">
      <p>
        Hello world!
      </p>
    </div>
  );
}

export default Teleprompter;
