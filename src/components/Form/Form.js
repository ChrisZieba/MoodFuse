import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: 'indie-pop',
      energy: 85,
      happiness: 75,
      danceability: 60,
      button: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submit() {

    this.setState({button: 'active loader'});
    setTimeout(()=> {
      this.setState({button: ''});
    }, 1500);

    this.props.callbackFromParent(this.state.genre, this.state.energy/100, this.state.danceability/100, this.state.happiness/100);
  }


  render() {
    return (
      <div id="form">
        <div className="option">
          <div className="label">genre</div>
          <div className="elem">
            <select name="genre" autoComplete="off" className="genre" value={this.state.genre} onChange={this.handleChange}>
              <option>alt-rock</option>
              <option>alternative</option>
              <option>blues</option>
              <option>chill</option>
              <option>classical</option>
              <option>club</option>
              <option>country</option>
              <option>dance</option>
              <option>disco</option>
              <option>dubstep</option>
              <option>electronic</option>
              <option>folk</option>
              <option>funk</option>
              <option>hip-hop</option>
              <option>holidays</option>
              <option>house</option>
              <option>indie</option>
              <option>indie-pop</option>
              <option>j-pop</option>
              <option>jazz</option>
              <option>k-pop</option>
              <option>metal</option>
              <option>pop</option>
              <option>punk</option>
              <option>punk-rock</option>
              <option>r-n-b</option>
              <option>reggae</option>
              <option>rock</option>
              <option>rock-n-roll</option>
              <option>romance</option>
              <option>salsa</option>
              <option>samba</option>
              <option>synth-pop</option>
              <option>techno</option>
            </select>
          </div>
        </div>
        <div className="option">
          <div className="label">energy</div>
          <div className="elem"><input name="energy" type="range" min="20" max="100"  value={this.state.energy} className="slider" onChange={this.handleChange}/></div>
        </div>

        <div className="option">
          <div className="label">happiness</div>
          <div className="elem"><input name="happiness" type="range" min="20" max="100"  value={this.state.happiness} className="slider" onChange={this.handleChange}/></div>
        </div>

        <div className="option">
          <div className="label">danceability</div>
          <div className="elem"><input name="danceability" type="range" min="20" max="100"  value={this.state.danceability} className="slider" onChange={this.handleChange}/></div>
        </div>

        <div className="button-container"><button type="submit" onClick={this.submit.bind(this)} className={this.state.button} >click me!</button></div>
      </div>
    );
  }
}

export default Form;
