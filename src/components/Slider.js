import React from 'react';
import Marker from "./Marker";

const PLACEHOLDER_TEXT = "Type something...";

const Slider = ({ mode, textDirection, position, text, setText,
    fontSize, lineHeight, textMargin, textContainerRef, textDisplayRef }) => {

    const handleTextChange = (e) => setText(e.target.value);

    const displayPadding = () => {
        if (textDirection === "ltr") {
            return `0 calc(${textMargin}vw + ${fontSize * 0.69}rem) 0 ${textMargin}vw`;
        } else {
            return `0 ${textMargin}vw 0 calc(${textMargin}vw + ${fontSize * 0.69}rem)`;
        }
    }

    return (
        <div id="text-slider">
            {mode === "edit" &&
                <textarea
                    id="text-container"
                    ref={textContainerRef}
                    style={{
                        left: `${fontSize * 0.69}rem`,
                        width: `calc(100vw - ${fontSize * 0.69}rem)`,
                        fontSize: `${fontSize}rem`,
                        lineHeight: lineHeight,
                        padding: `0 calc(${textMargin}vw + ${fontSize * 0.69}rem) 0 ${textMargin}vw`
                    }}
                    value={text}
                    placeholder={PLACEHOLDER_TEXT}
                    spellCheck={false}
                    onChange={handleTextChange}
                />}
            {mode === "read" &&
                <pre
                    id="text-display"
                    ref={textDisplayRef}
                    style={{
                        left: `calc(${fontSize * 0.69}rem + ${textDirection === "ltr" ? "0rem" : "0.75rem"})`,
                        top: position,
                        width: `calc(100vw - 0.75rem - ${fontSize * 0.69}rem)`,
                        fontSize: `${fontSize}rem`,
                        lineHeight: lineHeight,
                        padding: displayPadding(),
                        transform: `scale(${textDirection === "ltr" ? "1" : "-1"}, 1)`
                    }}>
                    {text}
                </pre>}
            {mode === "read" &&
                <Marker
                    textDirection={textDirection}
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                    textMargin={textMargin}
                />}
        </div>
    );
}

export default Slider;
