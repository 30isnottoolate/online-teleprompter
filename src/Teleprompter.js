import { useState, useEffect, useRef } from 'react';
import './Teleprompter.css';
import Controller from './Controller.js';
import Slider from './Slider';

const DEFAULT_THEME = "dark"; // dark or light
const DEFAULT_TEXT = "";
const DEFAULT_FONT_SIZE = "100";
const DEFAULT_LINE_HEIGHT = "1.2";
const DEFAULT_TEXT_SPEED = "100";


const Teleprompter = () => {
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState("edit"); // edit or read
    const [theme, setTheme] = useState(DEFAULT_THEME);
    const [isMenuEnabled, setIsMenuEnabled] = useState(false);
    const [position, setPosition] = useState(0);
    const [text, setText] = useState(DEFAULT_TEXT);
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
    const [lineHeight, setLineHeight] = useState(DEFAULT_LINE_HEIGHT);
    const [textSpeed, setTextSpeed] = useState(DEFAULT_TEXT_SPEED);

    const textContainerRef = useRef(null);
    const textDisplayRef = useRef(null);
    const textMarkerRef = useRef(null);

    useEffect(() => {
        if (localStorage.getItem("theme") === null) {
            localStorage.setItem("theme", DEFAULT_THEME);
        } else setTheme(localStorage.getItem("theme"));

        if (localStorage.getItem("text") === null) {
            localStorage.setItem("text", DEFAULT_TEXT);
        } else setText(localStorage.getItem("text"));

        if (window.innerWidth < 701) {
            if (localStorage.getItem("fontSize") === null) {
                localStorage.setItem("fontSize", 40);
            } else setFontSize(localStorage.getItem("fontSize"));
        } else {
            if (localStorage.getItem("fontSize") === null) {
                localStorage.setItem("fontSize", DEFAULT_FONT_SIZE);
            } else setFontSize(localStorage.getItem("fontSize"));
        }

        if (localStorage.getItem("lineHeight") === null) {
            localStorage.setItem("lineHeight", DEFAULT_LINE_HEIGHT);
        } else setLineHeight(localStorage.getItem("lineHeight"));

        if (localStorage.getItem("textSpeed") === null) {
            localStorage.setItem("textSpeed", DEFAULT_TEXT_SPEED);
        } else setTextSpeed(localStorage.getItem("textSpeed"));
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
