import { useState, useEffect, useRef } from 'react';
import './Teleprompter.css';
import Controller from './Controller.js';
import Slider from './Slider';

const Teleprompter = () => {
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState("edit"); // edit or read
    const [theme, setTheme] = useState("dark"); // dark or light
    const [isMenuEnabled, setIsMenuEnabled] = useState(false);
    const [position, setPosition] = useState(100);
    const [text, setText] = useState("");
    const [fontSize, setFontSize] = useState(100);
    const [lineHeight, setLineHeight] = useState(1.2);
    const [textSpeed, setTextSpeed] = useState(100);

    const textContainerRef = useRef(null);
    const textDisplayRef = useRef(null);
    const textMarkerRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth < 701) {
            setFontSize(40);
        }
    }, []);

    useEffect(() => {
        if (mode === "edit") textContainerRef.current.focus();
    }, [mode]);

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
        <div id="teleprompter" className={theme}>
            <Controller
                isActive={isActive} setIsActive={setIsActive}
                mode={mode} setMode={setMode}
                theme={theme} setTheme={setTheme}
                isMenuEnabled={isMenuEnabled} setIsMenuEnabled={setIsMenuEnabled}
                setPosition={setPosition}
                setText={setText}
                fontSize={fontSize} setFontSize={setFontSize}
                lineHeight={lineHeight} setLineHeight={setLineHeight}
                textSpeed={textSpeed} setTextSpeed={setTextSpeed} />
            <Slider
                mode={mode}
                theme={theme}
                text={text} setText={setText}
                position={position} setPosition={setPosition}
                fontSize={fontSize}
                lineHeight={lineHeight} 
                textContainerRef={textContainerRef}
                textDisplayRef={textDisplayRef}
                textMarkerRef={textMarkerRef} />
        </div>
    );
}

export default Teleprompter;
