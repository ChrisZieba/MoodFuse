import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clickHandler(this.props.song.id);
  }

  render() {
    return (
      <div>
        <div className="item" onClick={this.handleClick}>
          <span className="artist">{this.props.song.track.artist}</span> - <span className="title">{this.props.song.track.title}</span>
        </div>
        <div className="links">
          <a href={this.props.song.track.uri} target="_blank"><i className="fa fa-spotify" aria-hidden="true"></i></a>
          <a href={`https://www.youtube.com/watch?v=${this.props.song.id}`} target="_blank"><i className="fa fa-youtube" aria-hidden="true"></i></a>
        </div>
      </div>
    );
  }
}

export default Item;
