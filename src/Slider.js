import { useEffect } from 'react';
import './Teleprompter.css';

const PLACEHOLDER_TEXT = "Type something...";

const Slider = ({ mode, position, setPosition, theme, text, setText,
    fontSize, lineHeight, textContainerRef, textDisplayRef, textMarkerRef }) => {
    useEffect(() => {
        setPosition(window.innerHeight * 0.15);
    }, [fontSize, lineHeight, text, setPosition]);

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    return (
        <div id="text-slider">
            <textarea
                id="text-container"
                ref={textContainerRef}
                className={theme}
                style={{
                    display: mode === "edit" ? "initial" : "none",
                    top: "15vh",
                    height: "85vh",
                    left: (fontSize * 0.69) + "px",
                    width: `calc(100vw - ${(fontSize * 0.69)}px)`,
                    fontSize: fontSize + "px",
                    lineHeight: lineHeight
                }}
                value={text}
                placeholder={PLACEHOLDER_TEXT}
                onChange={handleTextChange} />
            <pre
                id="text-display"
                ref={textDisplayRef}
                className={theme}
                style={{
                    display: mode === "edit" ? "none" : "initial",
                    left: (fontSize * 0.69) + 2 + "px",
                    top: (position + 2),
                    width: `calc(99vw - ${(fontSize * 0.69)}px)`,
                    fontSize: fontSize + "px",
                    lineHeight: lineHeight
                }}>
                {text}
            </pre>
            <p
                id="text-marker"
                ref={textMarkerRef}
                className={theme}
                style={{
                    display: mode === "edit" ? "none" : "initial",
                    left: (fontSize * 0.19),
                    top: "15vh",
                    fontSize: fontSize + "px",
                    lineHeight: lineHeight
                }}>&#129170;</p>
        </div>
    );
}

export default Slider;
