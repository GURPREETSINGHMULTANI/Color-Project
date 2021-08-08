import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPaletteStyles'
import DeleteIcon from '@material-ui/icons/Delete';

function MiniPalette(props) {
    const { classes, paletteName, colors, handleClick, emoji } = props;
    const miniColorBoxes = colors.map(color => (
        <div className={classes.miniColor} key={color.name} style={{ backgroundColor: color.color }}></div>
    ))
    return (
        <div className={classes.root} onClick={handleClick}>
            <div className={classes.delete}>
                <DeleteIcon className={classes.DeleteIcon} />
            </div>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);
