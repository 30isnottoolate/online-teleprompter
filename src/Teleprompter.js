import { useState } from 'react';
import './Teleprompter.css';

function Teleprompter() {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState("Default text.")
  const [fontSize, setFontSize] = useState(100);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [textSpeed, setTextSpeed] = useState(100);

  return (
    <div id="teleprompter">
      <div id="controller">
        <input type="range" id="font-size" min="80" max="150" step="1" value={fontSize} />
        <input type="range" id="line-height" min="1" max="1.5" step="0.01" value={lineHeight} />
        <input type="range" id="text-speed" min="20" max="200" step="1" value={textSpeed} />
      </div>
      <div id="text-slider">
        <textarea id="text-container" value={text} />
      </div>
    </div>
  );
}

export default Teleprompter;
