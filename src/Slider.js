import { useEffect} from 'react';
import './Teleprompter.css';

const Slider = (props) => {
    useEffect(() => {
        props.setPosition(window.innerHeight * 0.1);
    },[props.fontSize, props.lineHeight, props.text]);

    const handleTextChange = (e) => {
        props.setText(e.target.value);
    }

    if (props.mode === "edit") {
        return (
            <div id="text-slider">
                <textarea 
                    id="text-container" 
                    style={{ 
                        top: "10vh", 
                        height: "90vh", 
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
                <pre 
                    id="text-display"
                    ref={props.textDisplayRef}
                    style={{ 
                        left: (props.fontSize * 0.69) + 2 + "px", 
                        top: (props.position + 2), 
                        width: `calc(99vw - ${(props.fontSize * 0.69)}px)`, 
                        fontSize: props.fontSize + "px", 
                        lineHeight: props.lineHeight}}>
                    {props.text}
                </pre>
                <p 
                    id="text-marker"
                    ref={props.textMarkerRef}
                    style={{ 
                        left: (props.fontSize * 0.19),
                        top: "10vh",
                        fontSize: props.fontSize + "px",
                        lineHeight: props.lineHeight  }}>&#129170;</p>
            </div>
        );
    }
}

export default Slider;
