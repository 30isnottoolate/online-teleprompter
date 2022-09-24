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
        } else {
            props.setIsActive(true);
            props.setMode("read");
        }
    }

    const handleMode = () => {
        if (props.mode === "edit") {
            props.setMode("read");
        } else {
            props.setMode("edit");
            props.setIsActive(false);
            props.setPosition(window.innerHeight * 0.1 + props.fontSize * props.lineHeight);
        }
    }

    return (
        <div id="controller">
            <input type="range" id="font-size" min="80" max="150" step="1" value={props.fontSize} onChange={handleFontSize} />
            <input type="range" id="line-height" min="1" max="1.5" step="0.01" value={props.lineHeight} onChange={handleLineHeight} />
            <input type="range" id="text-speed" min="20" max="200" step="1" value={props.textSpeed} onChange={handleTextSpeed} />
            <button id="start-stop" onClick={handleIsActive} >{props.isActive ? "Stop" : "Start"}</button>
            <p>Current mode:</p>
            <button id="edit" onClick={handleMode}>{props.mode === "edit" ? "Edit" : "Read"}</button>
        </div>
    );
}

export default Controller;
