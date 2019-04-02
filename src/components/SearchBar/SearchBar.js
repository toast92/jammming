import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: ''
        }
        this.search = this.search.bind(this);
        this.handletermChange = this.handletermChange.bind(this);
        this.searchOnEnter = this.searchOnEnter.bind(this);
    }

    handletermChange(event){
        this.setState({
            term: event.target.value
        });
    }

    search(){
        this.props.onSearch(this.state.term);
    }

    searchOnEnter(event){
        if(event.keyCode === 13){
            this.search();
        }
    }

    onFocus(event) {
        event.target.placeholder = '';
    }

    onBlur(event) {
        event.target.placeholder = 'Enter A Song, Album, or Artist';
    }

    render() {
        return (
            <div className="SearchBar">
                <input onChange = {this.handletermChange} onKeyDown = {this.searchOnEnter} placeholder="Enter A Song, Album, or Artist" onFocus = {this.onFocus} onBlur = {this.onBlur}/>
                <a onClick = {this.search}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;