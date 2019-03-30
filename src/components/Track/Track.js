import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    constructor(props){
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
    }
    
    renderAction(isRemoval) {
        return isRemoval ? '-' : '+';
    }

    addTrack() {
        return this.props.onAdd(this.props.track);
    }

    render () {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p> 
                </div>
                <a class="Track-action">{this.renderAction(false)}</a>
            </div>
        );
    }
}

export default Track;
