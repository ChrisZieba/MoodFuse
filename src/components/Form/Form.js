import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  render() {
    return (
      <div id="form">
        <div>
          <select id="mood" autoComplete="off">
            <option>aggressive</option>

          </select>
        </div>
        <div>
          <label>energy</label>
          <input type="range" min="0" max="1"/>
        </div>
        
        <div>
          <label>danceability</label>
          <input type="range" min="0" max="1"/>
        </div>

        <div>
          <label>happiness</label>
          <input type="range" min="0" max="1"/>
        </div>
      </div>
    );
  }
}

export default Form;
