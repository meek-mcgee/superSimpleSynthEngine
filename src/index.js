import React from "react";
import ReactDOM from "react-dom/client"; //from react-dom/client, not react
import './index.css';

class Square extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button className="square" onClick={() =>
      this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

//test stuff
class Osc extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      freq: 440,
      playing: false,
      context: null,
    };
    const oscillator = null;
  }
  init = () => {
    //init audioContext
    this.forceUpdate(()=> this.setState({context: new window.AudioContext}));
  }
  play= () => {
    if(this.state.playing == false){
      this.setState({playing: true}, () => {
        //init oscillator
        this.oscillator = this.state.context.createOscillator();
        this.oscillator.type = 'sine';
        this.oscillator.frequency.setValueAtTime(this.state.freq, 2);
        this.oscillator.connect(this.state.context.destination);
        this.oscillator.start();
      })
    }
  }
  updateFreq = (newFreq) => {
    /* arrow function declaration prevents scope of this keyword from being assigned to the
    function itself rather than the class it resides in. this always points to the class or 
    function it is contained within */
    this.setState({freq: newFreq}, () => {
      if(this.oscillator != null) this.oscillator.frequency.setValueAtTime(this.state.freq, 2);
    })
  }
  stop = () => {
    if(this.state.playing == true) {
      this.setState({playing: false}, () => this.oscillator.stop());
    }
  }
  render(){
    return (
      <div>
        <button className="key" onClick={ () => {
        if(this.state.context == null) this.init()
        if(this.state.context != null) this.play()
       } }>Play</button>
       <button className="key" onClick={ () => {
         if(this.state.playing == true) this.stop()
       }}>Stop</button>
       <Slider minVal = {0} maxVal = {1000} currentVal = {440} callbackFn = {this.updateFreq} />
        {/*<div className="freq_slider">
          <input type ="range" min="1" max="1000" defaultValue ="440" className="slider" id="freq-slider" onChange={() =>{
            this.updateFreq(document.getElementById('freq-slider').value);
          }}></input>
        </div>*/}
      </div>
    );
  }
}
class Slider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      minVal: props.minVal,
      maxVal: props.maxVal,
      currentVal: props.currentVal,
      callbackFn: function(value){
        props.callbackFn(value);
      },
    }
  }
  render(props){
    return(
      <div className="freq_slider">
          <input type ="range" min={this.state.minVal} max={this.state.maxVal} defaultValue ={this.state.currentVal} className="slider" id="freq-slider" onChange={() =>{
            this.state.callbackFn(document.getElementById('freq-slider').value);
          }}></input>
      </div>
    );
  }
}
class Sequencer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      length: 4,
      currentStep: 0,
      rootFreq: 440,
    };
  }
  render(){
    return(
      <div>
        {/* sequencer code goes here */}
      </div>
    );
  }
}
class Filter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cutoff: 5000,
      resonance: 0,
      mode: 'low-pass', //mode of filter i.e. low-pass, high-pass
    }
  }
  updateCutoff = (freq) => {
    this.setState({cutoff: freq});
  }
  updateResonance = (q) => {
    this.setState({resonance: q});
  }
  render(){
    return(
      <div>{/*add code here,
      should be two sliders - one for cutoff,
      one for resonance*/}
      </div>
    );
  }

}
class Envelope extends React.Component {

}
const mainOsc = new Osc()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Osc />);

