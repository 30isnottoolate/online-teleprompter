import React from 'react';

const Marker = ({ fontSize, lineHeight, color, mode, left, top }) => {
    return (
        <div>
            <svg
                className="text-marker"
                height={fontSize}
                fill={color}
                style={{ 
                    display: (mode === "read" ? "initial" : "none"), 
                    left: left, 
                    top: top, 
                    padding: `${fontSize * (lineHeight - 1) / 2}px 0` 
                }}
                viewBox="0 0 57 150">
                <path d="M 7.00,45.00 C 7.00,45.00 7.00,111.00 7.00,111.00 7.00,111.00 49.00,78.00 49.00,78.00 49.00,78.00 7.00,45.00 7.00,45.00 Z" />
            </svg>
        </div>
    );
}

export default Marker;
