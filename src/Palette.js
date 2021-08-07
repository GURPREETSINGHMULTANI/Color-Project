import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Palette.css';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';

const styles = {
    Palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    colors: {
        height: '90%'
    }
}

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: "hex" };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level) {
        this.setState({ level });
    }
    changeFormat(value) {
        this.setState({ format: value });
    }
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color[format]} name={color.name} key={color.id} id={color.id} paletteId={id} showingFullPalette={true} />
        ));
        return (
            <div className={classes.Palette}>
                <Navbar showAllColors={true} handleChange={this.changeFormat} level={level} changeLevel={this.changeLevel} />
                <div className={classes.colors} >
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} />
            </div>
        )
    }
}

export default withStyles(styles)(Palette);