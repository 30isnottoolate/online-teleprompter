const MainButtons = ({ changeActive, active, resetSlider, mode, clearText, changeIsMenuEnabled }) => {
    return (
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
    );
}

export default MainButtons;
