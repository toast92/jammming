import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: 'jdjd'
        }
        this.search = this.search.bind(this);
        this.handletermChange = this.handletermChange.bind(this);
    }

    search(){
        this.props.onSearch(this.state.term);
    }

    handletermChange(event){
        this.setState({
            term: event.target.value
        });
    }
    
    render() {
        return (
            <div className="SearchBar">
                <input onChange = {this.handletermChange} placeholder="Enter A Song, Album, or Artist" />
                <a onClick = {this.search}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;