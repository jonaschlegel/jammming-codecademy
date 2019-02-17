import SearchBar from '../Components/SearchBar/SearchBar';

const clientID = 'c0a5efea5edb4d63a9717f4d1786e1e5';
const redirectURI = 'http://localhost:3000/';

let UserAccessToken;

let Spotify = {
  getAccessToken() {
    if (UserAccessToken) {
      return UserAccessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      UserAccessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (UserAccessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return UserAccessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },
  search(term) {
    const UserAccessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${UserAccessToken}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  },
  async savePlaylist(name, trackURIs) {
    if (!name && !trackURIs.length) {
      throw new Error(
        'Please add at least one track to the playlist and a playlist name.'
      );
    } else if (!trackURIs.length) {
      throw new Error('Please add at least one track to the playlist.');
    } else if (!name) {
      throw new Error('Please enter a playlist name.');
    } else if (
      !window.confirm('Do you really want to save this playlist to Spotify?')
    ) {
      throw new Error();
    }

    const UserAccessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${UserAccessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name })
        })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackURIs })
              }
            );
          });
      });
  }
};

export default Spotify;
