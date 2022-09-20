import './Teleprompter.css';

const Slider = (props) => {
    const handleTextChange = (e) => {
        props.setText(e.target.value);
    }

    return (
        <div id="text-slider">
            <textarea 
                id="text-container" 
                style={{ position: "absolute", top: props.position, fontSize: props.fontSize + "px", lineHeight: props.lineHeight }}
                value={props.text}
                onChange={handleTextChange} />
            <p id ="text-display" style={{ position: "absolute", top: (props.position + 2), left: "2px", fontSize: props.fontSize + "px", lineHeight: props.lineHeight}}>
                {props.text}
            </p>
        </div>
    );
}

export default Slider;
