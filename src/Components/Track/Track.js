import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  addTrack = () => {
    this.props.onAdd(this.props.track);
  };
  removeTrack = () => {
    this.props.onRemove(this.props.track);
  };
  renderAction() {
    if (this.props.isRemoval === true) {
      return (
        <a className="Track-action" onClick={this.removeTrack}>
          -
        </a>
      );
    } else {
      return (
        <a className="Track-action" onClick={this.addTrack}>
          +
        </a>
      );
    }
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
