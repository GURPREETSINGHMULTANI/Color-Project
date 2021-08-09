import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import { Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Close from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles'
import styles from './styles/NavbarStyles'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: "hex", open: false };
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true }, () => {
            this.props.handleChange(this.state.format)
        });
    }
    closeSnackbar() {
        this.setState({ open: false });
    }
    render() {
        const { level, changeLevel, showAllColors, classes } = this.props;
        const { format } = this.state;
        return (
            <header style={{zIndex:'2'}} className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to="/">reactcolorpicker</Link>
                </div>
                {showAllColors &&
                    <div >
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider
                                defaultValue={level}
                                step={100}
                                min={100}
                                max={900}
                                onAfterChange={changeLevel}
                                trackStyle={{ backgroundColor: 'transparent' }}
                                railStyle={{ height: '8px' }}
                                handleStyle={{ backgroundColor: 'green', outline: 'none', border: '2px solid green', boxShadow: 'none', width: '13px', height: '13px', marginTop: '-3px', marginLeft: '-7px' }}
                            />
                        </div>
                    </div>
                }
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id="message-id">Format Changed To {format.toUpperCase()}</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
                            <CloseIcon />
                        </IconButton>]}
                />
            </header>
        )
    }
}

export default withStyles(styles)(Navbar);