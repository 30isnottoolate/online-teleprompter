import MainButtons from "./MainButtons";
import ModeButtons from './ModeButtons';
import Settings from './Settings';

const Controller = ({ active, setActive, mode, setMode, theme, setTheme,
    isMenuEnabled, setIsMenuEnabled, setPosition, viewportWidth, setText, fontSize, setFontSize,
    lineHeight, setLineHeight, textSpeed, setTextSpeed }) => {

    const remValue = parseInt(window.getComputedStyle(document.body).getPropertyValue("font-size"));

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
            className={active ? "transparent" : "visible"}
            style={{
                gridTemplateRows: gridTemplate,
                height: controllerHeight
            }}>
            <div id="logo">
                <h1>
                    Online Teleprompter
                </h1>
            </div>
            <MainButtons
                active={active}
                setActive={setActive}
                mode={mode}
                setMode={setMode}
                setIsMenuEnabled={setIsMenuEnabled}
                setPosition={setPosition}
                setText={setText}
            />
            <ModeButtons
                divPresence={divPresence}
                changeMode={changeMode}
                mode={mode}
                theme={theme}
                setTheme={setTheme}
            />
            <Settings
                divPresence={divPresence}
                fontSize={fontSize}
                setFontSize={setFontSize}
                lineHeight={lineHeight}
                setLineHeight={setLineHeight}
                textSpeed={textSpeed}
                setTextSpeed={setTextSpeed}
            />
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
