import './Teleprompter.css';

const Slider = (props) => {
    const handleTextChange = (e) => {
        props.setText(e.target.value);
    }

    return (
        <div id="text-slider" style={{ position: "absolute", top: props.position }}>
            <div 
                id="text-container" 
                style={{ fontSize: props.fontSize + "px", lineHeight: props.lineHeight }} 
                contentEditable="true" 
                value={props.text} 
                onChange={handleTextChange} >
                    {props.text}
            </div>
        </div>
    );
}

export default Slider;
