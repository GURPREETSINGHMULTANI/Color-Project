import React, { Component } from 'react';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/core/styles';

const style = {
    ColorBox: {
        width: '20%',
        height: props => props.showingFullPalette ? '25%' : '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        verticalAlign: 'bottom',
        "&:hover button": {
            opacity: '1',
            transition: '0.5s'
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.5 ? 'black' : 'white'
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.08 ? 'white' : 'black'
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.5 ? 'rgba(0,0,0,0.6)' : 'white',
        background: 'rgba(255,255,255,0.3)',
        position: 'absolute',
        border: 'none',
        right: '0px',
        bottom: '0px',
        width: '60px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        textTransform: 'uppercase'
    },
    copyButton: {
        height: '30px',
        width: '100px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
        outline: 'none',
        background: 'rgba(255,255,255,0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        color: props => chroma(props.background).luminance() >= 0.5 ? 'rgba(0,0,0,0.6)' : 'white',
        textTransform: 'uppercase',
        textDecoration: 'none',
        border: 'none',
        opacity: '0'
    }
}

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        })
    }
    render() {
        const { name, background, paletteId, id, showingFullPalette, classes } = this.props;
        const { copied } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className={classes.ColorBox}>
                    <div className={`copy-overlay ${copied && 'show'}`} style={{ background }}></div>
                    <div className={`copy-msg ${copied && 'show'}`}>
                        <h1>copied!</h1>
                        <p className={classes.copyText} >{this.props.background}</p>
                    </div>
                    <div className="copy-container"></div>
                    <div className="box-content">
                        <span className={classes.colorName}>{name}</span>
                    </div>
                    <button className={classes.copyButton}>Copy</button>
                    {showingFullPalette && (
                        <Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
                            <span className={`${classes.seeMore}`}>More</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(style)(ColorBox);