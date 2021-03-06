import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  handleNameChange = event => {
    this.props.onNameChange(event.target.value);
  };
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.props.onSave();
    }
  };
  render() {
    return (
      <div className="Playlist">
        <input
          placeholder={'New Playlist'}
          onChange={this.handleNameChange}
          onKeyPress={this.handleKeyPress}
        />
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <a className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}

export default Playlist;
