'use strict';

let player;

const youtube = {
  init: () => {
    console.log(234);
    // This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Youtube api needs to use the global space
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player('player', {
        height: '279',
        width: '372',
        videoId: '',
        playerVars: { 
          'wmode': 'opaque',
          'rel': 0,
          'showinfo': 1,
          'controls': 2
        },
        events: {
          'onReady': function () {
            ytf.init();
          },
          'onStateChange': function (event) {

            ytf.setPageTitle(event.data);

            if (event.data == YT.PlayerState.ENDED) {
              ytf.next();
            } 
          }
        }
      });
    }
  },
  getPlayer: () => {
    return player;
  }
};

export default youtube;