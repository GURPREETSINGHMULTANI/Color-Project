import { getThemeProps } from '@material-ui/styles';
import React from 'react';
import { withStyles } from '@material-ui/styles';
import { width } from '@material-ui/system';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        verticalAlign: 'bottom',
        "&:hover svg": {
            color: 'white',
            transform: 'scale(1.4)'
        }
    },
    boxContent: {
        boxSizing: 'border-box',
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0px',
        padding: '10px',
        color: 'rgba(0,0,0,0.5)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out',
    }

}

function DraggableColorBox(props) {
    const { classes, handleClick, nam, color } = props;
    return (
        <div className={classes.root} style={{ backgroundColor: color }}>
            <div className={classes.boxContent}>
                <span>
                    {name}
                </span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
            </div>
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox);