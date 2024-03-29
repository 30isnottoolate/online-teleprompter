import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MainButtons from "./MainButtons";
import ModeButtons from './ModeButtons';
import Settings from './Settings';
import Slider from './Slider.js';

const DEFAULT_THEME = "dark"; // dark or light
const DEFAULT_TEXT_DIRECTION = "ltr" // ltr or rtl
const DEFAULT_TEXT = "";
const DEFAULT_FONT_SIZE = 100;
const DEFAULT_SMALL_FONT_SIZE = 40;
const DEFAULT_LINE_HEIGHT = 1.2;
const DEFAULT_TEXT_SPEED = 100;
const DEFAULT_TEXT_MARGIN = 0;
const READ_SPEED_COEF = 0.0151; // char/ms

const Teleprompter = () => {
    const remValue = parseInt(window.getComputedStyle(document.body).getPropertyValue("font-size"));

    const [active, setActive] = useState(false);
    const [mode, setMode] = useState("edit"); // edit or read
    const [isMenuEnabled, setIsMenuEnabled] = useState(false);
    const [position, setPosition] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth / remValue);

    const [theme, setTheme] = useState(() => {
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", DEFAULT_THEME);
            return DEFAULT_THEME;
        } else return localStorage.getItem("theme");
    });

    const [textDirection, setTextDirection] = useState(() => {
        if (!localStorage.getItem("textDirection")) {
            localStorage.setItem("textDirection", DEFAULT_TEXT_DIRECTION);
            return DEFAULT_TEXT_DIRECTION;
        } else {
            return localStorage.getItem("textDirection") + "";
        }
    });

    const [text, setText] = useState(() => {
        if (!localStorage.getItem("text")) {
            localStorage.setItem("text", DEFAULT_TEXT);
            return DEFAULT_TEXT;
        } else return localStorage.getItem("text");
    });

    const [fontSize, setFontSize] = useState(() => {
        if (!localStorage.getItem("fontSize")) {
            if (viewportWidth < 46) {
                localStorage.setItem("fontSize", DEFAULT_SMALL_FONT_SIZE / remValue);
                return DEFAULT_SMALL_FONT_SIZE / remValue;
            } else {
                localStorage.setItem("fontSize", DEFAULT_FONT_SIZE / remValue);
                return DEFAULT_FONT_SIZE / remValue;
            }
        } else return Number(localStorage.getItem("fontSize"));
    });

    const [lineHeight, setLineHeight] = useState(() => {
        if (!localStorage.getItem("lineHeight")) {
            localStorage.setItem("lineHeight", DEFAULT_LINE_HEIGHT);
            return DEFAULT_LINE_HEIGHT;
        } else return Number(localStorage.getItem("lineHeight"));
    });

    const [textSpeed, setTextSpeed] = useState(() => {
        if (!localStorage.getItem("textSpeed")) {
            localStorage.setItem("textSpeed", DEFAULT_TEXT_SPEED);
            return DEFAULT_TEXT_SPEED;
        } else return Number(localStorage.getItem("textSpeed"));
    });

    const [textMargin, setTextMargin] = useState(() => {
        if (!localStorage.getItem("textMargin")) {
            localStorage.setItem("textMargin", DEFAULT_TEXT_MARGIN.toString());
            return DEFAULT_TEXT_MARGIN;
        } else return Number(localStorage.getItem("textMargin"));
    });

    const textContainerRef = useRef(null);
    const textDisplayRef = useRef(null);

    useEffect(() => {
        window.addEventListener("resize", () => setViewportWidth(window.innerWidth / remValue));

        return () => window.removeEventListener("resize", () => setViewportWidth(window.innerWidth / remValue));
    }, [viewportWidth, remValue]);

    useEffect(() => {
        setPosition(9.5 * remValue);
    }, [fontSize, lineHeight, textMargin, text, remValue]);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("textDirection", textDirection);
    }, [textDirection]);

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
        localStorage.setItem("textMargin", textMargin);
    }, [textMargin]);

    useEffect(() => {
        if (mode === "edit") textContainerRef.current.focus();
    }, [mode]);

    useEffect(() => {
        const emptyLines = (input) => (input.match(/^[ ]*$/gm) || []).length;

        let intervalID = null;
        let noEmptyLinesTextHeight;
        let intervalValue;

        if (textDisplayRef.current && text) {
            noEmptyLinesTextHeight = textDisplayRef.current.offsetHeight - remValue * fontSize * lineHeight * emptyLines(text);
            intervalValue = (text.length / (noEmptyLinesTextHeight * READ_SPEED_COEF)) * (100 / textSpeed);
        } else intervalValue = 18;

        if (active) {
            intervalID = setInterval(() => setPosition(position => position - 1), intervalValue);
        }

        return () => clearInterval(intervalID);
    }, [active, viewportWidth, text, fontSize, lineHeight, textSpeed, textMargin, remValue]);

    useEffect(() => {
        if (textDisplayRef.current) {
            if (position < (9.5 * remValue - textDisplayRef.current.offsetHeight + remValue * fontSize * lineHeight)) {
                setActive(false);
            }
        }
    }, [position, fontSize, lineHeight, textMargin, remValue]);

    const changeMode = () => {
        if (mode === "edit") {
            setMode("read");
            setIsMenuEnabled(false);
        } else {
            setMode("edit");
            setActive(false);
            setPosition(9.5 * remValue);
        }
    }

    const defaultSettings = () => {
        if (viewportWidth < 46) {
            setFontSize(DEFAULT_SMALL_FONT_SIZE);
        } else setFontSize(DEFAULT_FONT_SIZE);

        setLineHeight(DEFAULT_LINE_HEIGHT);
        setTextSpeed(DEFAULT_TEXT_SPEED);
        setTextMargin(DEFAULT_TEXT_MARGIN);
    }

    const gridTemplate = viewportWidth < 46 ?
        isMenuEnabled ? "repeat(5, auto)" : "repeat(2, auto)"
        : "auto";

    const controllerHeight = viewportWidth < 46 && isMenuEnabled ? "23rem" : "9.5rem";

    const divPresence = viewportWidth < 46 ?
        isMenuEnabled ? "grid" : "none"
        : "grid";

    return (
        <>
            <div
                id="controller"
                className={active ? "transparent" : "visible"}
                style={{
                    gridTemplateRows: gridTemplate,
                    height: controllerHeight
                }}>
                <div id="logo">
                    <h1>
                        Online Teleprompter
                    </h1>
                    <span>© {new Date().getFullYear()} Akos Varga, aka 30isnottoolate</span>
                </div>
                <MainButtons
                    active={active}
                    setActive={setActive}
                    mode={mode}
                    setMode={setMode}
                    setIsMenuEnabled={setIsMenuEnabled}
                    setPosition={setPosition}
                    setText={setText}
                />
                <ModeButtons
                    divPresence={divPresence}
                    changeMode={changeMode}
                    mode={mode}
                    theme={theme}
                    setTheme={setTheme}
                    textDirection={textDirection}
                    setTextDirection={setTextDirection}
                />
                <Settings
                    divPresence={divPresence}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    lineHeight={lineHeight}
                    setLineHeight={setLineHeight}
                    textSpeed={textSpeed}
                    setTextSpeed={setTextSpeed}
                    textMargin={textMargin}
                    setTextMargin={setTextMargin}
                />
                <div
                    id="default-container"
                    style={{ display: divPresence }} >
                    <button
                        id="default"
                        onClick={defaultSettings} >
                        Default
                    </button>
                </div>
            </div>
            <Slider
                mode={mode}
                textDirection={textDirection}
                position={position}
                text={text} setText={setText}
                fontSize={fontSize}
                lineHeight={lineHeight}
                textMargin={textMargin}
                textContainerRef={textContainerRef}
                textDisplayRef={textDisplayRef}
            />
        </>
    );
}

export default Teleprompter;
