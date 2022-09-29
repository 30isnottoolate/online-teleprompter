import { useState, useEffect, useRef } from 'react';
import './Teleprompter.css';
import Controller from './Controller.js';
import Slider from './Slider';

const DEFAULT_IS_ACTIVE = false;
const DEFAULT_MODE = "edit"; // edit or read
const DEFAULT_THEME = "dark"; // dark or light
const DEFAULT_IS_MENU_ENABLED = "false";
const DEFAULT_POSITION = "0";
const DEFAULT_TEXT = "";
const DEFAULT_FONT_SIZE = "100";
const DEFAULT_LINE_HEIGHT = "1.2";
const DEFAULT_TEXT_SPEED = "100";


const Teleprompter = () => {
    const [isActive, setIsActive] = useState(DEFAULT_IS_ACTIVE);
    const [mode, setMode] = useState(DEFAULT_MODE);
    const [theme, setTheme] = useState(DEFAULT_THEME);
    const [isMenuEnabled, setIsMenuEnabled] = useState(DEFAULT_IS_MENU_ENABLED);
    const [position, setPosition] = useState(DEFAULT_POSITION);
    const [text, setText] = useState(DEFAULT_TEXT);
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
    const [lineHeight, setLineHeight] = useState(DEFAULT_LINE_HEIGHT);
    const [textSpeed, setTextSpeed] = useState(DEFAULT_TEXT_SPEED);

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
