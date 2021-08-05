import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500 };
        this.changeLevel = this.changeLevel.bind(this);
    }
    changeLevel(level) {
        this.setState({ level });
    }
    render() {
        const { colors } = this.props.palette;
        const { level } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ));
        return (
            <div className="Palette">
                <div className="slider">
                    <Slider
                        defaultValue={level}
                        step={100}
                        min={100}
                        max={900}
                        onAfterChange={this.changeLevel}
                        trackStyle={{ backgroundColor: 'transparent' }}
                        railStyle={{ height: '8px' }}
                        handleStyle={{ backgroundColor: 'green', outline: 'none', border: '2px solid green', boxShadow: 'none', width: '13px', height: '13px', marginTop:'-3px', marginLeft: '-7px'}}
                    />
                </div>
                {/* Navbar goes here */}
                <div className="Palette-colors">
                    {colorBoxes}
                    {/* Bunch of color boxes */}
                </div>
                {/* Footer eventually */}
            </div>
        )
    }
}

export default Palette;