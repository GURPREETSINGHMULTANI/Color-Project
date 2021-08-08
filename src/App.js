import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import './App.css';
import { generatePalette } from './colorHelpers.js';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.find = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id.toLowerCase() === id.toLowerCase();
    });
  }
  savePalette(newPalette) {
    this.setState({ palettes: [...seedColors, newPalette] }, this.syncLocalStorage);
  }
  deletePalette(id) {
    this.setState({ palettes: this.state.palettes.filter(palette => palette.id !== id) }, this.syncLocalStorage);
  }
  syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }
  render() {
    return (
      <Switch>
        <Route exact path="/palette/new" render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={this.state.palettes} />} />
        <Route exact path="/" render={(routeProps) => <PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routeProps} />} />
        <Route exact path="/palette/:id" render={(routeProps) => < Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
        <Route path="/palette/:paletteId/:colorId" render={(routeProps) => < SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} />} />
      </Switch >

    );
  }
}

export default App;
