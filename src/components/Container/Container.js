import React, { Component } from 'react';
import './Container.css';

import Form from '../Form/Form';
import Player from '../Player/Player';

class Container extends Component {
  render() {
    return (
      <div id="container">
        <Form/>
        <Player/>
      </div>
    );
  }
}

export default Container;
