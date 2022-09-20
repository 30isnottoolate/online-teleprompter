import { useState, useEffect } from 'react';
import './Teleprompter.css';
import Controller from './Controller.js';
import Slider from './Slider';

const Teleprompter = () => {
    const [isActive, setIsActive] = useState(false);
    const [position, setPosition] = useState(100);
    const [text, setText] = useState("Default text.")
    const [fontSize, setFontSize] = useState(100);
    const [lineHeight, setLineHeight] = useState(1.2);
    const [textSpeed, setTextSpeed] = useState(100);

    const changeStatus = () => {
        isActive ? setIsActive(false) : setIsActive(true);
    }

    useEffect(() => {
        let intervalID = null;

        if (isActive) {
            intervalID = setInterval(() => setPosition(position => position - 1), 20);
        } else {
            clearInterval(intervalID);
        }
        return () => clearInterval(intervalID);
    }, [isActive, position]);

    return (
        <div id="teleprompter">
            <Controller
                font={fontSize} setFontSize={setFontSize}
                height={lineHeight} setLineHeight={setLineHeight}
                speed={textSpeed} setTextSpeed={setTextSpeed} />
            <Slider
                text={text} setText={setText}
                position={position}
                fontSize={fontSize}
                lineHeight={lineHeight}
                textSpeed={textSpeed} />
            <button onClick={changeStatus} >{isActive ? "Stop" : "Start"}</button>
        </div>
    );
}

export default Teleprompter;
