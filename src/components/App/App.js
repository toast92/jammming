import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.state = {
      searchResults: [
        {
          name: 'JT used to have noodle hair',
          artist: 'Britney Spears',
          album: 'I was cool in the 90s',
          id: '123'
        },
        {
          name: 'JT used to have noodle hair',
          artist: 'Britney Spears',
          album: 'I was cool in the 90s',
          id: '123'
        },
        {
          name: 'JT used to have noodle hair',
          artist: 'Britney Spears',
          album: 'I was cool in the 90s',
          id: '123'
        }
      ],
      playlistName: 'Ma playlist',
      playlistTracks: [
        {
          name: 'Back street',
          artist: 'Backstreet Boyz',
          album: 'When boybands were cool',
          id: '456'
        },
        {
          name: 'Back street',
          artist: 'Backstreet Boyz',
          album: 'When boybands were cool',
          id: '456'
        },
        {
          name: 'Back street',
          artist: 'Backstreet Boyz',
          album: 'When boybands were cool',
          id: '456'
        },
      ]
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
          <SearchBar />
            <div className="App-playlist">
              <SearchResults searchBar = {this.state.searchResults} onAdd = {this.addTrack}/>
              <Playlist onNameChange = {this.updatePlaylistName} onRemove = {this.removeTrack} playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
