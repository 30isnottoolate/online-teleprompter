const Marker = ({ fontSize, lineHeight, top }) => {
    return (
        <div>
            <svg
                className="text-marker"
                height={fontSize + "rem"}
                style={{ 
                    left: `${fontSize * 0.19}rem`, 
                    top: top, 
                    padding: `${fontSize * (lineHeight - 1) / 2}rem 0` 
                }}
                viewBox="0 0 57 150">
                <path d="M 7.00,45.00 C 7.00,45.00 7.00,111.00 7.00,111.00 7.00,111.00 49.00,78.00 49.00,78.00 49.00,78.00 7.00,45.00 7.00,45.00 Z" />
            </svg>
        </div>
    );
}

export default Marker;
