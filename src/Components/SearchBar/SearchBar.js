import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  state = {
    term: ''
  };
  search = () => {
    this.props.onSearch(this.state.term);
  };
  handleTermChange = event => {
    this.setState({
      term: event.target.value
    });
  };
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.search();
    }
  };
  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          onKeyPress={this.handleKeyPress}
        />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
