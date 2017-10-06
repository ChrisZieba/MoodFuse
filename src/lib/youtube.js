'use strict';

let player;

// Takes the raw response from youtube
const format = (res) => {
  return res.reduce((playlist, result) => {
    if (Array.isArray(result.response.items) && result.response.items.length > 0) {
      let id = result.response.items[0].id["videoId"];
      
      if (id) {
        playlist.push({
          track: result.track,
          id
        });
      }
    }

    return playlist;
  }, []);
};

const youtube = {
  init: () => {
    // This code loads the IFrame Player API code asynchronously
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Youtube api needs to use the global space
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player('media', {
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
          onStateChange: (event) => {
            // Play the next song in the playlist
            if (event.data == YT.PlayerState.ENDED) {
              this.next();
            } 
          }
        }
      });
    }
  },
  next: () => {

  },
  play: (id) => {
    if (!player) {
      return;
    }

    player.loadVideoById(id);

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
        xhr.responseType = 'json';

        xhr.open('GET', url);
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve({
              track,
              response: xhr.response
            });
          } else {
            reject(xhr.response);
          }
        };
        xhr.onerror = () => reject(xhr.response);
        xhr.send();
      }));
      return promises;
    }, []);

    return new Promise((resolve, reject) => {
      Promise.all(promises).then(values => { 
        resolve(format(values));
      }).catch(reason => {
        reject({
          error: {
            message: 'Could not retrieve search results from YouTube'
          }
        });
      });
    });
  }
};

export default youtube;