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
            props.setPosition(window.innerHeight * 0.1);
        }
    }

    const handleReset = () => {
        props.setIsActive(false);
        props.setPosition(window.innerHeight * 0.1);
    }

    return (
        <div id="controller" className={props.isActive ? "transparent" : "visible"}>
            <label htmlFor="font-size">Font size: </label>
            <input type="range" id="font-size" min="80" max="150" step="1" value={props.fontSize} onChange={handleFontSize} />
            <label htmlFor="font-size">Line height: </label>
            <input type="range" id="line-height" min="1" max="1.5" step="0.01" value={props.lineHeight} onChange={handleLineHeight} />
            <label htmlFor="font-size">Text speed: </label>
            <input type="range" id="text-speed" min="20" max="200" step="1" value={props.textSpeed} onChange={handleTextSpeed} />
            <button id="start-stop" onClick={handleIsActive} >{props.isActive ? "Stop" : "Start"}</button>
            <button id="reset" onClick={handleReset} disabled={props.mode === "edit" ? true : false}>Reset</button>
            <p>Current mode:</p>
            <button id="edit" onClick={handleMode}>{props.mode === "edit" ? "Edit" : "Read"}</button>
        </div>
    );
}

export default Controller;
