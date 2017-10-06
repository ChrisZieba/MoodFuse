import React, { Component } from 'react';
import './Container.css';
import spotify from '../../lib/spotify';
import youtube from '../../lib/youtube';
import Form from '../Form/Form';
import Player from '../Player/Player';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
    };
  }

  // Will be the playlist
  myCallback(genre, energy, danceability, happiness) {
    // Get recommendations from spotify
    const recommendations = spotify.getRecommendations(genre, energy, danceability, happiness);
    
    recommendations.then((tracks) => youtube.getVideos(tracks)).then((playlist) => {
      console.log(playlist)
    }).catch((res) => {
      console.log(res);
      if (res.error && res.error.message) {
        alert(res.error.message);
      }
    });
  }

  render() {
    return (
      <div id="container">
        <Form callbackFromParent={this.myCallback} />
        <Player/>
      </div>
    );
  }
}

export default Container;
