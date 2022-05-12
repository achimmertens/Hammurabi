import React from 'react';
import './App.css';
import './util/Kehrwert';
import Kehrwert from './util/Kehrwert';


// Funktionale Komponenten
const OutComponent = (props) => {
  return(
    <div>
      Zahl:      {props.zahl} <br/>
      Kehrwert:  {props.kehrwert}
    </div>
  )
}

const ErrComponent = (props) => {
  return(
    <span style={{color: "red"}}>
      {/**/}
      Error: Ungültige Zahl
    </span>
  )
}

// Klassen Komponente
class App extends React.Component {

  constructor(props) {
    super(props);

    // States / Data / Model
    this.state = {
      'zahl' : '',
      'kehrwert' : '',
      'showout' :false,
      'showerr' :false
    };

    this.handleZahlUpdate = this.handleZahlUpdate.bind(this);
    this.handleButtonClear = this.handleButtonClear.bind(this);
    this.handleButtonCalc = this.handleButtonCalc.bind(this);

  }

  // Control
  handleZahlUpdate = (e) => {
    let myzahl = e.target.value;
    this.setState({ 'zahl': myzahl });
    console.log("Zahl: " + myzahl);
  }

  // Control
  handleButtonCalc = (e) => {

    let numtest = isNaN(parseFloat(this.state.zahl)) || parseFloat(this.state.zahl) ===0  ;
    console.log("numtest: " + numtest);

    if(numtest) {    
      console.log("numtest: Keine Zahl" );

      this.setState(
        prevState => (
        { 'showout': false, 'showerr': true  }),
        () => {
          this.renderout();
          this.rendererr()
        }
      );
      console.log("State: " + JSON.stringify(this.state));
    } else {
      console.log("numtest: Eine Zahl" );
      
      //let mykehrwert = 1.0 / this.state.zahl;

      let kw = new Kehrwert();
      let mykehrwert = kw.kehrwert(this.state.zahl)

      this.setState({ 'kehrwert': mykehrwert });

      this.setState(
        prevState => (
        { 'showout': true, 'showerr': false  }),
        () => {
          this.renderout();
          this.rendererr()
        }
      );

    }
  }

  // Control
  handleButtonClear(e) {
    this.setState({ 'zahl': '', 'kehrwert': '', 'showout': false, 'showerr': false });
  }


  // View
  renderout() {
    if (this.state.showout) {
      return <OutComponent zahl={this.state.zahl}  kehrwert={this.state.kehrwert}/>
    } else {
      return null
    }
  }

  // View
  rendererr() {
    if (this.state.showerr) {
      return <ErrComponent />
    } else {
      return null
    }
  }


  // View
  render() {
  return (
    <div>
        <h1>Ueb: Kehrwert</h1>
        <hr />
        <label>Zahl<br/>
          <input type="text" value={this.state.zahl} onChange={this.handleZahlUpdate} placeholder='Zahl'/>
          {this.rendererr()}
        </label><br/>
        <button onClick={this.handleButtonCalc}>Calc</button>
        <button onClick={this.handleButtonClear}>Clear</button>
        <hr />
        {this.renderout()}
      </div>
    );
  }
}
export default App;
