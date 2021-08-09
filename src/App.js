import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { generatePalette } from './colorHelpers.js';
import NewPaletteForm from './NewPaletteForm';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';
import './styles/Page.css'

class App extends PureComponent {
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
    const {palettes} = this.state;
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Switch location={location}>
              <Route exact path="/palette/new" render={(routeProps) => <div className="div1"><NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={palettes} /></div>} />
              <Route exact path="/" render={(routeProps) => <div className="div1"><PaletteList deletePalette={this.deletePalette} palettes={palettes} {...routeProps} /></div>} />
              <Route exact path="/palette/:id" render={(routeProps) => <div className="div1"><Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} /></div>} />
              <Route path="/palette/:paletteId/:colorId" render={(routeProps) => <div className="div1"><SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} /></div>} />
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
