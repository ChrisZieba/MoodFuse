import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  submit() {
    // Clear out the player view
    // Get token to use with the spotify api if time has passed
    // Get recomendations
    // Find videos on youtube
  }

  render() {
    return (
      <div id="form">
        <div>
          <label>genre</label>
          <select autoComplete="off" className="genre">
            <option>aggressive</option>

          </select>
        </div>
        <div>
          <label>energy</label>
          <input type="range" min="0" max="100" defaultValue="50" className="slider"/>
        </div>
        
        <div>
          <label>danceability</label>
          <input type="range" min="0" max="100" defaultValue="50" className="slider"/>
        </div>

        <div>
          <label>happiness</label>
          <input type="range" min="0" max="100" defaultValue="50" className="slider"/>
        </div>

        <div><button onClick={this.submit}>go</button></div>
      </div>
    );
  }
}

export default Form;
