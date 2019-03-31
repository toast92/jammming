import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends Component {
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input value={this.props.playlistName} onChange={this.handleNameChange}/>
                <TrackList isRemoval = {true} onRemove = {this.props.onRemove} tracks = {this.props.playlistTracks}/>
                <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        )
    }
}

export default Playlist;