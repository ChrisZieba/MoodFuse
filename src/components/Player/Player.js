import React, { Component } from 'react';
import './Player.css';
import Item from './Item/Item';

class Player extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    console.log(id)
    this.props.callbackFromParent(id);
  }

  render() {
    return (
      <div id="player">
        <div id="media-container" style={{visibility: this.props.visibility}}>
          <div id="media"></div>
        </div>
        <div id="playlist">
          {this.props.playlist.map((song) => {
            return (
              <Item key={song.id} clickHandler={this.handleClick} song={song} current={this.props.current} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Player;
