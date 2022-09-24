import { useEffect, useRef } from 'react';
import './Teleprompter.css';

const Slider = (props) => {
    useEffect(() => {
        props.setPosition(window.innerHeight * 0.1 + props.fontSize * props.lineHeight);
    },[]);

    const handleTextChange = (e) => {
        props.setText(e.target.value);
    }

    if (props.mode === "edit") {
        return (
            <div id="text-slider">
                <textarea 
                    id="text-container" 
                    style={{ 
                        top: `calc(10vh + ${props.fontSize * props.lineHeight}px)`, 
                        height: `calc(90vh - ${props.fontSize * props.lineHeight}px)`, 
                        left: (props.fontSize * 0.69) + "px", 
                        width: `calc(100vw - ${(props.fontSize * 0.69)}px)`, 
                        fontSize: props.fontSize + "px", 
                        lineHeight: props.lineHeight }}
                    value={props.text}
                    onChange={handleTextChange} />
            </div>
        );
    } else {
        return (
            <div id="text-slider">
                <pre id ="text-display"
                    style={{ 
                        left: (props.fontSize * 0.69) + 2 + "px", 
                        top: (props.position + 2), 
                        width: `calc(100vw - ${(props.fontSize * 0.69)}px)`, 
                        fontSize: props.fontSize + "px", 
                        lineHeight: props.lineHeight}}>
                    {props.text}
                </pre>
            </div>
        );
    }
}

export default Slider;
