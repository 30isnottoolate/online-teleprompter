import { useEffect} from 'react';
import './Teleprompter.css';

const DEFAULT_TEXT = "Type something...";

const Slider = ({mode, theme, text, setText, position, setPosition, fontSize, lineHeight, textContainerRef, textDisplayRef, textMarkerRef}) => {
    useEffect(() => {
        setPosition(window.innerHeight * 0.1);
    },[fontSize, lineHeight, text, setPosition]);

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    if (mode === "edit") {
        return (
            <div id="text-slider">
                <textarea 
                    id="text-container" 
                    ref={textContainerRef}
                    className={theme}
                    style={{ 
                        top: "10vh", 
                        height: "90vh", 
                        left: (fontSize * 0.69) + "px", 
                        width: `calc(100vw - ${(fontSize * 0.69)}px)`, 
                        fontSize: fontSize + "px", 
                        lineHeight: lineHeight }}
                    value={text}
                    placeholder={DEFAULT_TEXT}
                    onChange={handleTextChange} />
            </div>
        );
    } else {
        return (
            <div id="text-slider">
                <pre 
                    id="text-display"
                    ref={textDisplayRef}
                    className={theme}
                    style={{ 
                        left: (fontSize * 0.69) + 2 + "px", 
                        top: (position + 2), 
                        width: `calc(99vw - ${(fontSize * 0.69)}px)`, 
                        fontSize: fontSize + "px", 
                        lineHeight: lineHeight}}>
                    {text}
                </pre>
                <p 
                    id="text-marker"
                    ref={textMarkerRef}
                    className={theme}
                    style={{ 
                        left: (fontSize * 0.19),
                        top: "10vh",
                        fontSize: fontSize + "px",
                        lineHeight: lineHeight  }}>&#129170;</p>
            </div>
        );
    }
}

export default Slider;
