'use strict';

let player;

const youtube = {
  init: () => {
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
  },
  getVideos: (tracks) => {
    const endpoint = "https://www.googleapis.com/youtube/v3/search";
    const options = {
      type: "video",
      order: "relevance",
      'start-index': "1",
      "max-results": "10",
      videoCategoryId: "10",
      alt: "json",
      part: "id,snippet",
      key: "AIzaSyDA9zclpvT41AeFbsAaO5rVLZIx1yCFrvQ"
    };

    // Create a promise for each track
    const promises = tracks.reduce((promises, track) => {
      promises.push(new Promise((resolve, reject) => {
        let qs = Object.keys(options).map(opt => `${opt}=${options[opt]}`).join('&');
        let url = `${endpoint}?q=${track.artist}+${track.title}&${qs}`
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.onload = () => {
          console.log(this.status)
          if (this.status >= 200 && this.status < 300) {
            resolve(xhr.response);
          } else {
            reject(xhr.statusText);
          }
        };
        xhr.onerror = () => reject(xhr.statusText);
      }));
      return promises;
    }, []);

    return new Promise((resolve, reject) => {
      Promise.all(promises).then(values => { 
        console.log(values);
        resolve(values);
      }).catch(reason => {
        console.log(243);
        reject();
      });
    });
  }
};

export default youtube;