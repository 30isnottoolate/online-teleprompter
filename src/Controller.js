import './Teleprompter.css';

const Controller = (props) => {
    const handleFontSize = (e) => {
        props.setFontSize(e.target.value);
    }

    const handleLineHeight = (e) => {
        props.setLineHeight(e.target.value);
    }

    const handleTextSpeed = (e) => {
        props.setTextSpeed(e.target.value);
    }

    const handleIsActive = () => {
        if (props.isActive) {
            props.setIsActive(false);
        } else props.setIsActive(true);
    }

    return (
        <div id="controller">
            <input type="range" id="font-size" min="80" max="150" step="1" value={props.fontSize} onChange={handleFontSize} />
            <input type="range" id="line-height" min="1" max="1.5" step="0.01" value={props.lineHeight} onChange={handleLineHeight} />
            <input type="range" id="text-speed" min="20" max="200" step="1" value={props.textSpeed} onChange={handleTextSpeed} />
            <button onClick={handleIsActive} >{props.isActive ? "Stop" : "Start"}</button>
        </div>
    );
}

export default Controller;
