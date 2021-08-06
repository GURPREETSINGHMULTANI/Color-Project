import React from 'react';

function PaletteFooter(props) {
    const { paletteName } = props;
    return (
        <footer className="Palette-footer">
            {paletteName}
        </footer>
    )
}

export default PaletteFooter;