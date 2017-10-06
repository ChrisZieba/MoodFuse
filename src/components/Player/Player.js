import React, { Component } from 'react';
import './Player.css';
import Item from './Item/Item';
import youtube from '../../lib/youtube';

class Player extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    youtube.play(id)
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
              <Item key={song.id} clickHandler={this.handleClick} song={song} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Player;
