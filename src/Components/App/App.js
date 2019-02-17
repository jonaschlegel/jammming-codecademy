import React, { Component } from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };
  }
  search = term => {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  };
  addTrack = track => {
    if (
      this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)
    ) {
      return;
    }
    this.setState({ playlistTracks: [...this.state.playlistTracks, track] });
  };
  removeTrack = track => {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(
        savedTrack => savedTrack.id !== track.id
      )
    });
  };
  updatePlaylistName = name => {
    this.setState({
      playlistName: name
    });
  };
  savePlaylist = () => {
    const trackURIs = this.state.playlistTracks.map(track => {
      return track.uri;
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
      .then(() => {
        this.setState({
          playlistName: '',
          playlistTracks: []
        });
      })
      .catch(err => {
        alert(err.message);
      });
  };
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
