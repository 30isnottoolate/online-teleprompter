import { useState, useEffect, useRef } from 'react';
import './Teleprompter.css';
import Controller from './Controller.js';
import Slider from './Slider';

const Teleprompter = () => {
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState("read");
    const [position, setPosition] = useState(100);
    const [text, setText] = useState("Default text.")
    const [fontSize, setFontSize] = useState(100);
    const [lineHeight, setLineHeight] = useState(1.2);
    const [textSpeed, setTextSpeed] = useState(100);

    const textDisplayRef = useRef(null);
    const textMarkerRef = useRef(null);

    useEffect(() => {
        let intervalID = null;

        if (isActive && (textDisplayRef.current.offsetHeight > (position *
            (-1) + fontSize * lineHeight + textMarkerRef.current.offsetTop) && (position) <= (fontSize * lineHeight))) {
            intervalID = setInterval(() => setPosition(position => position - 1), 20);
        } else {
            setIsActive(false);
            clearInterval(intervalID);
        }
        return () => clearInterval(intervalID);
    }, [isActive, position]);

    return (
        <div id="teleprompter">
            <Controller
                isActive={isActive} setIsActive={setIsActive}
                mode={mode} setMode={setMode}
                position={position} setPosition={setPosition}
                fontSize={fontSize} setFontSize={setFontSize}
                lineHeight={lineHeight} setLineHeight={setLineHeight}
                textSpeed={textSpeed} setTextSpeed={setTextSpeed} />
            <Slider
                mode={mode} setMode={setMode}
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
