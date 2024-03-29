import React from 'react';

const Marker = ({ textDirection, fontSize, lineHeight, textMargin }) => {

    const markerStyle = () => {
        const style = {
            left: "",
            right: "",
            padding: `${fontSize * (lineHeight - 1) / 2}rem 0`,
            transform: ""
        }
        if (textDirection === "ltr") {
            style.left = `calc(${fontSize * 0.19}rem + ${textMargin}vw)`;
            style.transform = `rotate(0deg)`;
        } else {
            style.right = `calc(${fontSize * 0.19}rem + ${textMargin}vw)`;
            style.transform = `rotate(180deg)`;
        }

        return style;
    }

    return (
        <div>
            <svg
                className="text-marker"
                height={fontSize + "rem"}
                style={markerStyle()}
                viewBox="0 0 57 150">
                <path d="M 7.00,45.00 C 7.00,45.00 7.00,111.00 7.00,111.00 7.00,111.00 49.00,78.00 49.00,78.00 49.00,78.00 7.00,45.00 7.00,45.00 Z" />
            </svg>
        </div>
    );
}

export default Marker;
