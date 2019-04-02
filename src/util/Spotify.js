let userAccessToken = '';
const clientId = '5bd986d1e44643c7840fa529bdb1b9ea';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){
        if(userAccessToken){
            return userAccessToken;
        }
        //window.location.href returns the url of the page, then we use match to check if an expression that mathes our regex is present in it
        const hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if(hasAccessToken && hasExpiresIn) {
            userAccessToken = hasAccessToken[1]; //match method returns an array, where the value of the access token has index 1
            const expiresIn = Number(hasExpiresIn[1]); //match method returns an array, where the value of the expiration time of the token has index 1
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }
    },

    search(searchTerm) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    } 
                
                });
            }
        });
    },

    savePlaylist(playlistName, trackUris){
        if(!playlistName && trackUris.length === 0){
            return;
        }
        const userAccessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${userAccessToken}`
        }
        let userID;
        return fetch('https://api.spotify.com/v1/me', { 
            headers:headers
        }).then(response => {
            if(response.ok) {
                return response.json();
            }
        }).then(jsonResponse => {
            if(jsonResponse.id) {
                userID = jsonResponse.id;
            }
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
            }).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris})
                });
            });
        });
    }
}

export default Spotify;