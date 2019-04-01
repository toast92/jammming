import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    constructor(props){
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction() {
        return this.props.isRemoval ? <a onClick = {this.removeTrack} className="Track-action">-</a> : <a onClick = {this.addTrack} className="Track-action">+</a>;
    }


    addTrack() {
        return this.props.onAdd(this.props.track);
    }

    removeTrack() {
        return this.props.onRemove(this.props.track);
    }

    render () {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p> 
                </div>
                <div>{this.renderAction()}</div>
            </div>
        );
    }
}

export default Track;