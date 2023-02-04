const Controller = ({ active, setActive, mode, setMode, theme, setTheme,
    isMenuEnabled, setIsMenuEnabled, setPosition, viewportWidth, setText, fontSize, setFontSize,
    lineHeight, setLineHeight, textSpeed, setTextSpeed }) => {

    let remValue = parseInt(window.getComputedStyle(document.body).getPropertyValue("font-size"));

    const changeActive = () => {
        if (active) {
            setActive(false);
        } else {
            setActive(true);
            setMode("read");
            setIsMenuEnabled(false);
        }
    }

    const resetSlider = () => {
        setActive(false);
        setPosition(7.5 * remValue);
    }

    const clearText = () => {
        setText("");
        setMode("edit");
    }

    const changeIsMenuEnabled = () => setIsMenuEnabled(prevState => !prevState);

    const divPresence = viewportWidth < 44 ?
        isMenuEnabled ? "grid" : "none"
        : "grid";

    const changeMode = () => {
        if (mode === "edit") {
            setMode("read");
            setIsMenuEnabled(false);
        } else {
            setMode("edit");
            setActive(false);
            setPosition(7.5 * remValue);
        }
    }

    const changeTheme = () => setTheme(prevState => prevState === "light" ? "dark" : "light");

    const changeFontSize = (e) => setFontSize(e.target.value / remValue);
    const changeLineHeight = (e) => setLineHeight(e.target.value);
    const changeTextSpeed = (e) => setTextSpeed(e.target.value);

    const defaultSettings = () => {
        if (viewportWidth < 44) {
            setFontSize(2.5);
        } else setFontSize(6.25);

        setLineHeight(1.2);
        setTextSpeed(100);
    }

    const gridTemplate = viewportWidth < 44 ?
        isMenuEnabled ? "repeat(5, auto)" : "repeat(2, auto)"
        : "auto";

    const controllerHeight = viewportWidth < 44 && isMenuEnabled ? "18.75rem" : "7.5rem";

    return (
        <div
            id="controller"
            className={`${(active ? "transparent" : "visible")} ${(theme === "dark" ? "dark-controller" : "light-controller")}`}
            style={{
                gridTemplateRows: gridTemplate,
                height: controllerHeight
            }}>
            <div id="logo">
                <h1>
                    Online Teleprompter
                </h1>
            </div>
            <div id="main-buttons-group">
                <button
                    id="start-stop"
                    className="main-buttons"
                    onClick={changeActive} >
                    {active ? "Stop" : "Start"}
                </button>
                <button
                    id="reset"
                    className="main-buttons"
                    onClick={resetSlider}
                    disabled={mode === "edit" ? true : false}>
                    Reset
                </button>
                <button
                    id="clear"
                    className="main-buttons"
                    onClick={clearText} >
                    Clear
                </button>
                <button
                    id="settings-button"
                    className="main-buttons"
                    onClick={changeIsMenuEnabled}>
                    Settings
                </button>
            </div>
            <div
                id="mode-group"
                style={{ display: divPresence }} >
                <span>Current mode: </span>
                <button
                    id="mode"
                    className="mode-buttons"
                    onClick={changeMode} >
                    {mode === "edit" ? "Edit" : "Read"}
                </button>
                <span>Color theme: </span>
                <button
                    id="theme"
                    className="mode-buttons"
                    onClick={changeTheme} >
                    {theme === "dark" ? "Dark" : "Light"}
                </button>
            </div>
            <div
                id="settings"
                style={{ display: divPresence }} >
                <label htmlFor="font-size">Font size: </label>
                <input
                    id="font-size"
                    className="settings-slider"
                    type="range" min="40" max="150" step="1"
                    value={fontSize * remValue}
                    onChange={changeFontSize} />
                <span>{fontSize * remValue}</span>
                <label htmlFor="line-height">Line height: </label>
                <input
                    id="line-height"
                    className="settings-slider"
                    type="range" min="1" max="1.5" step="0.01"
                    value={lineHeight}
                    onChange={changeLineHeight} />
                <span>{(parseFloat(lineHeight)).toFixed(2)}</span>
                <label htmlFor="text-speed">Text speed: </label>
                <input
                    id="text-speed"
                    className="settings-slider"
                    type="range" min="20" max="200" step="1"
                    value={textSpeed}
                    onChange={changeTextSpeed} />
                <span>{textSpeed}</span>
            </div>
            <div
                id="default-container"
                style={{ display: divPresence }} >
                <button
                    id="default"
                    onClick={defaultSettings} >
                    Default
                </button>
            </div>
        </div>
    );
}

export default Controller;
