import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const styles = {
    form: {

    }
}

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = { open: true, newPaletteName: "" }
        this.handleChange = this.handleChange.bind(this);
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
    handleClickOpen = () => {
        this.setState({ open: true })
    };
    handleClose = () => {
        this.setState({ open: false })
    };
    render() {
        const { open, newPaletteName } = this.state;
        const { palettes, handleSubmit, classes, hideForm } = this.props;
        return (
            <Dialog open={open} onClose={hideForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm className={classes.form} onSubmit={() => handleSubmit(newPaletteName)}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your beautiful palette. Make sure it's unique!
                        </DialogContentText>
                        <Picker />
                        <TextValidator
                            value={newPaletteName}
                            style={{ display: 'inline !important' }}
                            name="newPaletteName"
                            label="Palette Name"
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={['Enter Palette Name', 'Name already used']} />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideForm} color="primary">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>

            </Dialog>
        )
    }
}

export default withStyles(styles)(PaletteMetaForm);