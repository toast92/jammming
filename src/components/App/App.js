import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    }
  }

  addTrack(track) {
    let updatedTracks = this.state.playlistTracks;
    if(!updatedTracks.find(savedTrack => savedTrack.id === track.id)) {
      this.state.playlistTracks.push(track);
    }
    this.setState({
      playlistTracks: updatedTracks
    });
  }

  removeTrack(track){
    let updatedTracks = this.state.playlistTracks;
    updatedTracks.filter(removedTrack => removedTrack.id !== track.id);
    this.setState({
      playlistTracks: updatedTracks
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    if(this.state.playlistName){
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: 'New playlist',
          playlistTracks: []
        });
      });
    }
  }

  search(searchTerm){
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch = {this.search}/>
            <div className="App-playlist">
              <SearchResults searchBar = {this.state.searchResults} onAdd = {this.addTrack}/>
              <Playlist onSave = {this.savePlaylist} onNameChange = {this.updatePlaylistName} onRemove = {this.removeTrack} playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;