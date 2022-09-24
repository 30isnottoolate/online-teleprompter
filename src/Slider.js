import './Teleprompter.css';

const Slider = (props) => {
    const handleTextChange = (e) => {
        props.setText(e.target.value);
    }

    if (props.mode === "edit") {
        return (
            <div id="text-slider">
                <textarea 
                    id="text-container" 
                    style={{ fontSize: props.fontSize + "px", lineHeight: props.lineHeight }}
                    value={props.text}
                    onChange={handleTextChange} />
            </div>
        );
    } else {
        return (
            <div id="text-slider">
                <p id ="text-display" style={{ position: "absolute", top: (props.position + 2), left: "2px", fontSize: props.fontSize + "px", lineHeight: props.lineHeight}}>
                    {props.text}
                </p>
            </div>
        );
    }
}

export default Slider;
