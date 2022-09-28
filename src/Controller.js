import './Teleprompter.css';

const Controller = (props) => {
    const handleIsActive = () => {
        if (props.isActive) {
            props.setIsActive(false);
        } else {
            props.setIsActive(true);
            props.setMode("read");
        }
    }

    const handleReset = () => {
        props.setIsActive(false);
        props.setPosition(window.innerHeight * 0.1);
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

    const handleTheme = () => {
        if (props.theme === "dark") {
            props.setTheme("light");
        } else {
            props.setTheme("dark");
        }
    }

    const handleDefault = () => {
        props.setFontSize(100);
        props.setLineHeight(1.2);
        props.setTextSpeed(100);
    }

    const handleClear = () => {
        props.setText("");
        props.setMode("edit");
    }

    const handleFontSize = (e) => props.setFontSize(e.target.value);

    const handleLineHeight = (e) => props.setLineHeight(e.target.value);

    const handleTextSpeed = (e) => props.setTextSpeed(e.target.value);

    const getLineHeight = () => (parseFloat(props.lineHeight)).toFixed(2);

    return (
        <div 
            id="controller" 
            className={props.isActive ? "transparent" : "visible"} 
            style={{
                backgroundColor: props.theme === "dark" ? "#222222" : "#dddddd", 
                color: props.theme === "dark" ? "#ffffff" : "#000000"}}>
            <div id="logo">
                <h1>
                    Online Teleprompter
                </h1>
            </div>
            <div id="main-buttons-group">
                <button
                    id="start-stop"
                    className="main-buttons"
                    onClick={handleIsActive} >
                    {props.isActive ? "Stop" : "Start"}
                </button>
                <button
                    id="reset"
                    className="main-buttons"
                    onClick={handleReset}
                    disabled={props.mode === "edit" ? true : false}>
                    Reset
                </button>
                <button id="clear" className="main-buttons" onClick={handleClear} >Clear</button>
                <button id="settings-button">Settings</button>
            </div>
            <div id="mode-group">
                <span>Current mode: </span>
                <button
                    id="mode"
                    className="mode-buttons"
                    onClick={handleMode} >
                    {props.mode === "edit" ? "Edit" : "Read"}
                </button>
                <span>Color theme: </span>
                <button
                    id="theme"
                    className="mode-buttons"
                    onClick={handleTheme} >
                    {props.theme === "dark" ? "Dark" : "Light"}
                </button>
            </div>
            <div id="settings">
                <label htmlFor="font-size">Font size: </label>
                <input
                    id="font-size"
                    type="range" min="80" max="150" step="1"
                    value={props.fontSize}
                    onChange={handleFontSize} />
                <span>{props.fontSize}</span>
                <label htmlFor="line-height">Line height: </label>
                <input
                    id="line-height"
                    type="range" min="1" max="1.5" step="0.01"
                    value={props.lineHeight}
                    onChange={handleLineHeight} />
                <span>{getLineHeight()}</span>
                <label htmlFor="text-speed">Text speed: </label>
                <input
                    id="text-speed"
                    type="range" min="20" max="200" step="1"
                    value={props.textSpeed}
                    onChange={handleTextSpeed} />
                <span>{props.textSpeed}</span>
            </div>
            <div id="default-container">
                <button
                    id="default"
                    onClick={handleDefault} >
                    Default
                </button>
            </div>
        </div>
    );
}

export default Controller;
