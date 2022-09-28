import './Teleprompter.css';

const Controller = (props) => {
    const handleIsActive = () => {
        if (props.isActive) {
            props.setIsActive(false);
        } else {
            props.setIsActive(true);
            props.setMode("read");
            props.setIsMenuEnabled(false);
        }
    }

    const handleReset = () => {
        props.setIsActive(false);
        props.setPosition(window.innerHeight * 0.15);
    }

    const handleMode = () => {
        if (props.mode === "edit") {
            props.setMode("read");
            props.setIsMenuEnabled(false);
        } else {
            props.setMode("edit");
            props.setIsActive(false);
            props.setPosition(window.innerHeight * 0.15);
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

    const getButtonPresence = () => {
        if (window.innerWidth < 701) {
            return "initial";
        } else return "none";
    }

    const getDivPresence = () => {
        if (window.innerWidth < 701) {
            if (props.isMenuEnabled) {
                return "grid";
            } else return "none";
        } else return "grid";
    }

    const getControllerHeight = () => {
        if (window.innerWidth < 701 && props.isMenuEnabled) {
            return "40vh";
        } else return "15vh";
    }

    const getGridTemplate = () => {
        if (window.innerWidth < 701) {
            if (props.isMenuEnabled) {
                return "repeat(5, auto)";
            } else return "repeat(2, auto)";
        } else return "auto";
    }

    const handleIsMenuEnabled = () => props.setIsMenuEnabled(!props.isMenuEnabled);

    const handleFontSize = (e) => props.setFontSize(e.target.value);

    const handleLineHeight = (e) => props.setLineHeight(e.target.value);

    const handleTextSpeed = (e) => props.setTextSpeed(e.target.value);

    const getLineHeight = () => (parseFloat(props.lineHeight)).toFixed(2);

    return (
        <div 
            id="controller" 
            className={props.isActive ? "transparent" : "visible"} 
            style={{
                gridTemplateRows: getGridTemplate(),
                backgroundColor: props.theme === "dark" ? "#222222" : "#dddddd", 
                color: props.theme === "dark" ? "#ffffff" : "#000000",
                height: getControllerHeight()}}>
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
                <button id="settings-button" className="main-buttons" style={{display: getButtonPresence()}} onClick={handleIsMenuEnabled}>Settings</button>
            </div>
            <div id="mode-group" style={{display: getDivPresence()}} >
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
            <div id="settings" style={{display: getDivPresence()}} >
                <label htmlFor="font-size">Font size: </label>
                <input
                    id="font-size"
                    type="range" min="40" max="150" step="1"
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
            <div id="default-container" style={{display: getDivPresence()}} >
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
