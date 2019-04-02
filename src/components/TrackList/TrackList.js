import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends Component {
    render () {
        console.log(this);
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return <Track key = {track.id} 
                                      track = {track} 
                                      isRemoval = {this.props.isRemoval} 
                                      onRemove = {this.props.onRemove} 
                                      onAdd = {this.props.onAdd} 
                                      tracks={this.props.tracks}/>
                    })
                }
            </div>
        );
    }
}

export default TrackList;