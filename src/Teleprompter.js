import { useState, useEffect, useRef } from 'react';
import './Teleprompter.css';
import Controller from './Controller.js';
import Slider from './Slider.js';

const DEFAULT_THEME = "dark"; // dark or light
const DEFAULT_TEXT = "";
const DEFAULT_FONT_SIZE = "100";
const DEFAULT_LINE_HEIGHT = "1.2";
const DEFAULT_TEXT_SPEED = "100";

const Teleprompter = () => {
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState("edit"); // edit or read
    const [isMenuEnabled, setIsMenuEnabled] = useState(false);
    const [position, setPosition] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(null);

    const [theme, setTheme] = useState(() => {
        if (localStorage.getItem("theme") === null) {
            localStorage.setItem("theme", DEFAULT_THEME);
            return DEFAULT_THEME;
        } else {
            return localStorage.getItem("theme");
        }
    });

    const [text, setText] = useState(() => {
        if (localStorage.getItem("text") === null) {
            localStorage.setItem("text", DEFAULT_TEXT);
            return DEFAULT_TEXT;
        } else {
            return localStorage.getItem("text");
        }
    });

    const [fontSize, setFontSize] = useState(() => {
        if (localStorage.getItem("fontSize") === null) {
            if (window.innerWidth < 701) {
                localStorage.setItem("fontSize", 40);
                return 40;
            } else {
                localStorage.setItem("fontSize", DEFAULT_FONT_SIZE);
                return DEFAULT_FONT_SIZE;
            }
        } else return localStorage.getItem("fontSize");
    });

    const [lineHeight, setLineHeight] = useState(() => {
        if (localStorage.getItem("lineHeight") === null) {
            localStorage.setItem("lineHeight", DEFAULT_LINE_HEIGHT);
            return DEFAULT_LINE_HEIGHT;
        } else {
            return localStorage.getItem("lineHeight");
        }
    });

    const [textSpeed, setTextSpeed] = useState(() => {
        if (localStorage.getItem("textSpeed") === null) {
            localStorage.setItem("textSpeed", DEFAULT_TEXT_SPEED);
            return DEFAULT_TEXT_SPEED;
        } else {
            return localStorage.getItem("textSpeed");
        }
    });

    const textContainerRef = useRef(null);
    const textDisplayRef = useRef(null);
    const textMarkerRef = useRef(null);

    useEffect(() => {
        window.addEventListener("resize", () => setViewportWidth(window.innerWidth));
        return () => window.removeEventListener("resize", () => setViewportWidth(window.innerWidth));
    }, [viewportWidth]);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("text", text);
    }, [text]);

    useEffect(() => {
        localStorage.setItem("fontSize", fontSize);
    }, [fontSize]);

    useEffect(() => {
        localStorage.setItem("lineHeight", lineHeight);
    }, [lineHeight]);

    useEffect(() => {
        localStorage.setItem("textSpeed", textSpeed);
    }, [textSpeed]);

    useEffect(() => {
        if (mode === "edit") textContainerRef.current.focus();
    }, [mode]);

    useEffect(() => {
        let intervalID = null;
        let intervalValue = ((1000000 * window.innerWidth) /
            (Math.pow(fontSize, 2) * lineHeight * textSpeed * 1920)) * 19;

        if (isActive && (textDisplayRef.current.offsetHeight >
            ((-1) * position + fontSize * lineHeight + textMarkerRef.current.offsetTop))) {
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
