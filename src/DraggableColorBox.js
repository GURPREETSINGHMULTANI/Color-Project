import { getThemeProps } from '@material-ui/styles';
import React from 'react';
import { withStyles } from '@material-ui/styles';
import { width } from '@material-ui/system';

const styles = {
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        verticalAlign: 'bottom',
    }

}

function DraggableColorBox(props) {
    const { classes } = props;
    return (
        <div className={classes.root} style={{ backgroundColor: props.color }}>
            {props.name}
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox);