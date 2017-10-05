'use strict';

// Takes the raw response from spotify
const format = (res) => {
  return res.tracks.reduce((playlist, track) => {
    if (track.type === 'track' && Array.isArray(track.artists) && track.artists.length === 1) {
      playlist.push({
        title: track.name,
        artist: track.artists[0].name,
        uri: track.external_urls.spotify
      });
    }

    return playlist;
  }, []);

};

const spotify = {
  getRecommendations: (genre = 'pop', energy = 0.5, danceability = 0.5, valence = 0.5) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'https://api.spotify.com/v1/recommendations?limit=50';

      xhr.open('GET', `${url}&seed_genres=${genre}&max_danceability=${danceability}&max_valence=${valence}&max_energy=${energy}`);
      xhr.setRequestHeader('Authorization', `Bearer ${window.ts}`);
      xhr.onload = () => {
        const playlist = format(JSON.parse(xhr.responseText));
        resolve(playlist);
      }
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }
};

export default spotify;