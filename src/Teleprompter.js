import { useState, useEffect, useRef } from 'react';
import './Teleprompter.css';
import Controller from './Controller.js';
import Slider from './Slider';

const Teleprompter = () => {
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState("read"); // read or edit
    const [position, setPosition] = useState(100);
    const [text, setText] = useState("Type something...");
    const [fontSize, setFontSize] = useState(100);
    const [lineHeight, setLineHeight] = useState(1.2);
    const [textSpeed, setTextSpeed] = useState(100);

    const textDisplayRef = useRef(null);
    const textMarkerRef = useRef(null);

    useEffect(() => {
        let intervalID = null;
        let intervalValue = ((1000000 * window.innerWidth) / 
        (Math.pow(fontSize, 2) * lineHeight * textSpeed * 1920)) * 19;

        if (isActive && (textDisplayRef.current.offsetHeight > 
            ((-1) * position  + fontSize * lineHeight + textMarkerRef.current.offsetTop))) {
            intervalID = setInterval(() => setPosition(position => position - 1), intervalValue);
        } else {
            setIsActive(false);
            clearInterval(intervalID);
        }

        return () => clearInterval(intervalID);
    }, [isActive, position, fontSize, lineHeight, textSpeed]);

    return (
        <div id="teleprompter">
            <Controller
                isActive={isActive} setIsActive={setIsActive}
                mode={mode} setMode={setMode}
                setPosition={setPosition}
                setText={setText}
                fontSize={fontSize} setFontSize={setFontSize}
                lineHeight={lineHeight} setLineHeight={setLineHeight}
                textSpeed={textSpeed} setTextSpeed={setTextSpeed} />
            <Slider
                mode={mode}
                text={text} setText={setText}
                position={position} setPosition={setPosition}
                fontSize={fontSize}
                lineHeight={lineHeight} 
                textDisplayRef={textDisplayRef}
                textMarkerRef={textMarkerRef} />
        </div>
    );
}

export default Teleprompter;
