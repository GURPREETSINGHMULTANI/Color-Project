import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { generatePalette } from './colorHelpers.js';
import NewPaletteForm from './NewPaletteForm';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';
import Page from './Page';
import './styles/Page.css'

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
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Switch location={location}>
              <Route exact path="/palette/new" render={(routeProps) => (<Page><NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={this.state.palettes} /></Page>)} />
              <Route exact path="/" render={(routeProps) => (<Page><PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routeProps} /></Page>)} />
              <Route exact path="/palette/:id" render={(routeProps) => (<Page><Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} /></Page>)} />
              <Route path="/palette/:paletteId/:colorId" render={(routeProps) => (<Page><SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} /></Page>)} />
            </Switch >
          </CSSTransition>
        </TransitionGroup>
      )
      }
      />
    )
  }
}

export default App;
