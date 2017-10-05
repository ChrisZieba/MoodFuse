import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
import youtube from './lib/youtube';

import Container from './components/Container/Container';

class App extends Component {
  componentWillMount() {
    // Load the youtube player asap
    youtube.init();
  }

  render() {
    return (
      <div className="app">
        <div className="social">
          <iframe src="//platform.twitter.com/widgets/follow_button.html?screen_name=MoodFuse&amp;show_count=true&amp;show_screen_name=true&amp;size=m" allowTransparency="true" frameBorder="0" scrolling="no" width="270px" height="20px"></iframe>
          <iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FMoodFuse%2F470773119625275&amp;send=false&amp;layout=button_count&amp;width=200&amp;show_faces=true&amp;font&amp;colorscheme=light&amp;action=like&amp;height=21&amp;appId=137698956385466" scrolling="no" frameBorder="0" allowTransparency="true" width="120px" height="20px"></iframe>
          <iframe src="//ghbtns.com/github-btn.html?user=ChrisZieba&repo=MoodFuse&type=star&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe>
        </div>
        <header>
          <img src={logo} alt="Moodfuse" className="logo" />

        </header>

        <Container/>
      </div>
    );
  }
}

export default App;
