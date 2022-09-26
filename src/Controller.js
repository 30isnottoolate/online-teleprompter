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

    const handleClear = () => {
        props.setText("Type something...");
    }

    const getLineHeight = () => (parseFloat(props.lineHeight)).toFixed(2);

    return (
        <div id="controller" className={props.isActive ? "transparent" : "visible"}>
            <label htmlFor="font-size">Font size: </label>
            <input
                id="font-size"
                type="range" min="80" max="150" step="1"
                value={props.fontSize}
                onChange={handleFontSize} />
            <span>{props.fontSize}</span>
            <label htmlFor="font-size">Line height: </label>
            <input
                id="line-height"
                type="range" min="1" max="1.5" step="0.01"
                value={props.lineHeight}
                onChange={handleLineHeight} />
            <span>{getLineHeight()}</span>
            <label htmlFor="font-size">Text speed: </label>
            <input
                id="text-speed"
                type="range" min="20" max="200" step="1"
                value={props.textSpeed}
                onChange={handleTextSpeed} />
            <span>{props.textSpeed}</span>
            <button 
                id="start-stop" 
                onClick={handleIsActive} >
                {props.isActive ? "Stop" : "Start"}
            </button>
            <button 
                id="reset" 
                onClick={handleReset} 
                disabled={props.mode === "edit" ? true : false}>
                Reset
            </button>
            <button id="clear" onClick={handleClear} >Clear</button>
            <p>Current mode:</p>
            <button 
                id="mode" 
                onClick={handleMode} >
                {props.mode === "edit" ? "Edit" : "Read"}
            </button>
        </div>
    );
}

export default Controller;
