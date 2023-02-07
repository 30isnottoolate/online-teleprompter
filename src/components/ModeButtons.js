import React from 'react';

const ModeButtons =
    ({ divPresence, changeMode, mode, theme, setTheme }) => {

        const changeTheme = () => setTheme(prevState => prevState === "light" ? "dark" : "light");

        return (
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
        );
    }

export default ModeButtons;
