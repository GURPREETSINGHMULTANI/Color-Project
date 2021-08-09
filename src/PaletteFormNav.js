import React, { Component } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = { newPaletteName: "", formShowing: false };
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    showForm() {
        this.setState({ formShowing: true })
    }
    hideForm() {
        this.setState({ formShowing: false })
    }
    render() {
        const { classes, open, palettes, handleSubmit, handleDrawerOpen } = this.props;
        const { formShowing } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    color="default"
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <AddToPhotosIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create A Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to='/' className={classes.link}>
                            <Button variant="contained" color="secondary" className={classes.button}>
                                Go Back
                            </Button>
                        </Link>
                        <Button variant="contained" color="primary" onClick={this.showForm} className={classes.button}>
                            Save
                        </Button>
                    </div>
                </AppBar>
                {formShowing && (<PaletteMetaForm hideForm={this.hideForm} handleSubmit={handleSubmit} palettes={palettes} />)}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);