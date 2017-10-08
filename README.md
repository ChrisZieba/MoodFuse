MoodFuse
=========

[![MoodFuse](https://pbs.twimg.com/profile_images/2995289769/2ece3a5c6f8eac2fd208b7c783117fe2_400x400.png)](https://moodfuse.com/)

[![Build Status](https://travis-ci.org/ChrisZieba/dodgercms.svg)](https://travis-ci.org/ChrisZieba/dodgercms)
 
[MoodFuse](https://moodfuse.com/) A simple way to enjoy new music based on your mood! The [Spotify](https://spotify.com/) recommendations API is used to generate a list of tracks based on energy, danceability, happiness and genre. The tracks are played in the browser using YouTube.

## Installation

Build the assets and run locally.

```
node_modules/webpack-dev-server/bin/webpack-dev-server.js --content-base public/ --inline
```

Once the assets are compiled run a dev server to serve.

```
http://localhost:8080/
```

## License

`MIT License` (MIT)  
Copyright (c) 2015 Chris Zieba