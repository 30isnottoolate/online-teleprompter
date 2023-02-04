import { useEffect } from 'react';
import Marker from "./Marker";

const PLACEHOLDER_TEXT = "Type something...";

const Slider = ({ mode, position, setPosition, theme, text, setText,
    fontSize, lineHeight, textContainerRef, textDisplayRef }) => {

    useEffect(() => {
        setPosition(7.5 * remValue);
    }, [fontSize, lineHeight, text, setPosition]);

    const handleTextChange = (e) => setText(e.target.value);

    let remValue = parseInt(window.getComputedStyle(document.body).getPropertyValue("font-size"));

    return (
        <div id="text-slider">
            <textarea
                id="text-container"
                ref={textContainerRef}
                className={theme}
                style={{
                    display: mode === "edit" ? "initial" : "none",
                    height: "calc(100vh - 7.5rem)",
                    left: `${fontSize * 0.69}rem`,
                    width: `calc(100vw - ${fontSize * 0.69}rem)`,
                    fontSize: `${fontSize}rem`,
                    lineHeight: lineHeight
                }}
                value={text}
                placeholder={PLACEHOLDER_TEXT}
                spellCheck={false}
                onChange={handleTextChange} />
            <pre
                id="text-display"
                ref={textDisplayRef}
                className={theme}
                style={{
                    display: mode === "edit" ? "none" : "initial",
                    left: `${fontSize * 0.69}rem`,
                    top: position,
                    width: `calc(100vw - 0.75rem - ${fontSize * 0.69}rem)`,
                    fontSize: `${fontSize}rem`,
                    lineHeight: lineHeight
                }}>
                {text}
            </pre>
            <Marker
                fontSize={fontSize}
                lineHeight={lineHeight}
                mode={mode}
                color={theme === "dark" ? "#eff6ff" : "#011327"}
            />
        </div>
    );
}

export default Slider;
