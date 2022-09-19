import { useState } from 'react';
import './Teleprompter.css';
import Controller from './Controller.js';

function Teleprompter() {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState("Default text.")
  const [fontSize, setFontSize] = useState(100);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [textSpeed, setTextSpeed] = useState(100);

  return (
    <div id="teleprompter">
      <Controller font={fontSize} setFontSize={setFontSize} height={lineHeight} setLineHeight={setLineHeight} speed={textSpeed} setTextSpeed={setTextSpeed} />
      <div id="text-slider">
        <textarea id="text-container" value={text} onChange={setText} />
      </div>
    </div>
  );
}

export default Teleprompter;
