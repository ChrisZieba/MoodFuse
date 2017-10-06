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
      <div className="item" onClick={this.handleClick}>
        <span className="artist">{this.props.song.track.artist}</span> - <span className="title">{this.props.song.track.title}</span>
      </div>
    );
  }
}

export default Item;
