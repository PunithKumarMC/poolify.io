//  window.addEventListener("load", () => {
// 	document.getElementById("wrapper").style.display = "block";
// 	document.getElementById("loader").style.display = "none";
// });

// const prevButton = document.getElementById("prev");
// const nextButton = document.getElementById("next");
// const repeatButton = document.getElementById("repeat");
// const shuffleButton = document.getElementById("shuffle");
// const audio = document.getElementById("audio");
// const songImage = document.getElementById("song-image");
// const songName = document.getElementById("song-name");
// const songArtist = document.getElementById("song-artist");
// const pauseButton = document.getElementById("pause");
// const playButton = document.getElementById("play");
// const playlistButton = document.getElementById("playlist");
// const maxDuration = document.getElementById("max-duration");
// const currentTimeRef = document.getElementById("current-time");
// const progressBar = document.getElementById("progress-bar");
// const playlistContainer = document.getElementById("playlist-container");
// const closeButton = document.getElementById("close-button");
// const playlistSongs = document.getElementById("playlist-songs");
// const currentProgress = document.getElementById("current-progress");
// //index for songs
// let index;
// //initially loop=true(loop the playlist)
// let loop = true;
// const songsList = [
// 	{
// 		name: "Perfect",
// 		link: "https://www.dropbox.com/s/3mjzj73400sxovk/perfect.mp3?raw=1",
// 		artists: "Ed Sheeran",
// 		image: "https://www.dropbox.com/s/crlthbozdznb13g/perfect.jpeg?raw=1"
// 	},
// 	{
// 		name: "7 Rings",
// 		link: "https://www.dropbox.com/s/yo5tcfdjoz95ozf/7-rings.mp3?raw=1",
// 		artists: "Ariana Grande",
// 		image: "https://www.dropbox.com/s/gobvfxj4r0t053v/7-rings.jpg?raw=1"
// 	},
// 	{
// 		name: "Happier",
// 		link: "https://www.dropbox.com/s/zp1xfir101y4sc3/happier.mp3?raw=1",
// 		artists: "Marshmello",
// 		image: "https://www.dropbox.com/s/xxmwcz14hkn7iwl/happier.png?raw=1"
// 	},
// 	{
// 		name: "Stay",
// 		link: "https://www.dropbox.com/s/umam9olakop001d/stay.mp3?raw=1",
// 		artists: "Justin Bieber",
// 		image: "https://www.dropbox.com/s/kierj5lzst1yx9n/stay.jpg?raw=1"
// 	},
// 	{
// 		name: "Girls Like You",
// 		link: "https://www.dropbox.com/s/yi1cpg16snrl3fc/girls-like-you.mp3?raw=1",
// 		artists: "Maroon 5",
// 		image: "https://www.dropbox.com/s/ouq5zzgbqsk9zx0/girls-like-you.png?raw=1"
// 	}
// ];
// //events object
// let events = {
// 	mouse: {
// 		click: "click"
// 	},
// 	touch: {
// 		click: "touchstart"
// 	}
// };
// let deviceType = "";

// //Detect touch device
// const is_touch_device = () => {
// 	try {
// 		//We try to create TouchEvent (it would fail for desktops and throw error)
// 		document.createEvent("TouchEvent");
// 		deviceType = "touch";
// 		return true;
// 	} catch (e) {
// 		deviceType = "mouse";
// 		return false;
// 	}
// };
// //Format time(convert ms to seconds, minutes and add 0 if less than 10)
// const timeFormatter = (timeInput) => {
// 	let minute = Math.floor(timeInput / 60);
// 	minute = minute < 10 ? "0" + minute : minute;
// 	let second = Math.floor(timeInput % 60);
// 	second = second < 10 ? "0" + second : second;
// 	return `${minute}:${second}`;
// };
// //pause song
// const pauseAudio = () => {
// 	audio.pause();
// 	pauseButton.classList.add("hide");
// 	playButton.classList.remove("hide");
// };
// //play song
// const playAudio = () => {
// 	audio.play();
// 	pauseButton.classList.remove("hide");
// 	playButton.classList.add("hide");
// };
// //repeat button
// repeatButton.addEventListener("click", () => {
// 	if (repeatButton.classList.contains("active")) {
// 		repeatButton.classList.remove("active");
// 		audio.loop = false;
// 		console.log("Repeat Off");
// 	} else {
// 		repeatButton.classList.add("active");
// 		audio.loop = true;
// 		console.log("Repeat On");
// 	}
// });
// //set song
// const setSong = (arrayIndex) => {
// 	//this extracts all the variables from the object
// 	let { name, link, artists, image } = songsList[arrayIndex];
// 	audio.src = link;
// 	songName.innerHTML = name;
// 	songArtist.innerHTML = artists;
// 	songImage.src = image;
// 	//display duration when metadata loads
// 	audio.onloadedmetadata = () => {
// 		maxDuration.innerText = timeFormatter(audio.duration);
// 	};
// };
// //next song
// const nextSong = () => {
// 	//if loop is true then continue in normal order
// 	if (loop) {
// 		if (index == songsList.length - 1) {
// 			//if last song is being played
// 			index = 0;
// 		} else {
// 			index += 1;
// 		}
// 		setSong(index);
// 		playAudio();
// 	} else {
// 		//else find a random index and play that song
// 		let randIndex = Math.floor(Math.random() * songsList.length);
// 		console.log(randIndex);
// 		setSong(randIndex);
// 		playAudio();
// 	}
// };
// //previous song(you can't go back to a randomly played song)
// const previousSong = () => {
// 	if (index > 0) {
// 		pauseAudio();
// 		index -= 1;
// 	} else {
// 		//if first song is being played
// 		index = songsList.length - 1;
// 	}
// 	setSong(index);
// };

// //next song when current song ends
// audio.onended = () => {
// 	nextSong();
// };

// shuffleButton.addEventListener("click", () => {
// 	if (shuffleButton.classList.contains("active")) {
// 		shuffleButton.classList.remove("active");
// 		loop = true;
// 		console.log("shuffle Off");
// 	} else {
// 		shuffleButton.classList.add("active");
// 		loop = false;
// 		console.log("Shuffle On");
// 	}
// });
// //previous button
// prevButton.addEventListener("click", previousSong);
// //next button
// nextButton.addEventListener("click", nextSong);
// //pause button
// pauseButton.addEventListener("click", pauseAudio);
// //play button
// playButton.addEventListener("click", playAudio);

// //if user clicks on progress bar
// is_touch_device();
// progressBar.addEventListener(events[deviceType].click, (event) => {
// 	//start of progressBar
// 	let coordStart = progressBar.getBoundingClientRect().left;
// 	//mouse click position
// 	let coordEnd = !is_touch_device() ? event.clientX : event.touches[0].clientX;
// 	let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
// 	//set width to progress
// 	currentProgress.style.width = progress * 100 + "%";
// 	//set time
// 	audio.currentTime = progress * audio.duration;
// 	//play
// 	audio.play();
// 	pauseButton.classList.remove("hide");
// 	playButton.classList.add("hide");
// });
// //update progress every second
// setInterval(() => {
// 	currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
// 	currentProgress.style.width =
// 		(audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
// }, 1000);
// //update timer
// audio.addEventListener("timeupdate", () => {
// 	currentTimeRef.innerText = timeFormatter(audio.currentTime);
// });
// //display playlist
// playlistButton.addEventListener("click", () => {
// 	playlistContainer.classList.remove("hide");
// });
// //hide playlist
// closeButton.addEventListener("click", () => {
// 	playlistContainer.classList.add("hide");
// });
// //creates playlist
// const initializePlaylist = () => {
// 	for (let i in songsList) {
// 		playlistSongs.innerHTML += `
//       <li class='playlistSong' onclick='setSong(${i})'>
//       <div class="playlist-image-container">
//       <img src="${songsList[i].image}"/>
//       </div>
//       <div class="playlist-song-details">
//       <span id="playlist-song-name">${songsList[i].name}</span>
//       <span id="playlist-song-artist-album">${songsList[i].artists} </span>
//       </div>
//       </li>
//       `;
// 	}
// };

// window.onload = () => {
// 	//initally first song
// 	index = 0;
// 	setSong(index);
// 	//create the playlist
// 	initializePlaylist();
// };
window.onload=function(){
const APIController = (function() {
    
    const clientId = 'ADD YOUR CLIENT ID';
    const clientSecret = 'ADD YOUR CLIENT SECRET';

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa('1a9fe9f1a0fe46c59e704483e305cb7f' + ':' + 'fe7b542e792540b796fd16239920bdb1')
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }
    
    const _getGenres = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;
        
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.items;
    }

    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        }
    }
})();


// UI Module
const UIController = (function() {

    //object to hold references to html selectors
    const DOMElements = {
        selectGenre: '#select_genre',
        selectPlaylist: '#select_playlist',
        buttonSubmit: '#btn_submit',
        divSongDetail: '#song-detail',
        hfToken: '#hidden_token',
        divSonglist: '.song-list'
    }

    //public methods
    return {

        //method to get input fields
        inputField() {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                tracks: document.querySelector(DOMElements.divSonglist),
                submit: document.querySelector(DOMElements.buttonSubmit),
                songDetail: document.querySelector(DOMElements.divSongDetail)
            }
        },

        // need methods to create select list option
        createGenre(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
        }, 

        createPlaylist(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
        },

        // need method to create a track list group item 
        createTrack(id, name) {
            const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
            document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html);
        },

        // need method to create the song detail
        createTrackDetail(img, title, artist) {

            const detailDiv = document.querySelector(DOMElements.divSongDetail);
            // any time user clicks a new song, we need to clear out the song detail div
            detailDiv.innerHTML = '';

            const html = 
            `
            <div class="row col-sm-12 px-0">
                <img src="${img}" alt="">        
            </div>
            <div class="row col-sm-12 px-0">
                <label for="Genre" class="form-label col-sm-12">${title}:</label>
            </div>
            <div class="row col-sm-12 px-0">
                <label for="artist" class="form-label col-sm-12">By ${artist}:</label>
            </div> 
            `;

            detailDiv.insertAdjacentHTML('beforeend', html)
        },

        resetTrackDetail() {
            this.inputField().songDetail.innerHTML = '';
        },

        resetTracks() {
            this.inputField().tracks.innerHTML = '';
            this.resetTrackDetail();
        },

        resetPlaylist() {
            this.inputField().playlist.innerHTML = '';
            this.resetTracks();
        },
        
        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        }
    }

})();

const APPController = (function(UICtrl, APICtrl) {

    // get input field object ref
    const DOMInputs = UICtrl.inputField();

    // get genres on page load
    const loadGenres = async () => {
        //get the token
        const token = await APICtrl.getToken();           
        //store the token onto the page
        UICtrl.storeToken(token);
        //get the genres
        const genres = await APICtrl.getGenres(token);
        //populate our genres select element
        genres.forEach(element => UICtrl.createGenre(element.name, element.id));
    }

    // create genre change event listener
    DOMInputs.genre.addEventListener('change', async () => {
        //reset the playlist
        UICtrl.resetPlaylist();
        //get the token that's stored on the page
        const token = UICtrl.getStoredToken().token;        
        // get the genre select field
        const genreSelect = UICtrl.inputField().genre;       
        // get the genre id associated with the selected genre
        const genreId = genreSelect.options[genreSelect.selectedIndex].value;             
        // ge the playlist based on a genre
        const playlist = await APICtrl.getPlaylistByGenre(token, genreId);       
        // create a playlist list item for every playlist returned
        playlist.forEach(p => UICtrl.createPlaylist(p.name, p.tracks.href));
    });
     

    // create submit button click event listener
    DOMInputs.submit.addEventListener('click', async (e) => {
        // prevent page reset
        e.preventDefault();
        // clear tracks
        UICtrl.resetTracks();
        //get the token
        const token = UICtrl.getStoredToken().token;        
        // get the playlist field
        const playlistSelect = UICtrl.inputField().playlist;
        // get track endpoint based on the selected playlist
        const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
        // get the list of tracks
        const tracks = await APICtrl.getTracks(token, tracksEndPoint);
        // create a track list item
        tracks.forEach(el => UICtrl.createTrack(el.track.href, el.track.name))
        
    });

    // create song selection click event listener
    DOMInputs.tracks.addEventListener('click', async (e) => {
        // prevent page reset
        e.preventDefault();
        UICtrl.resetTrackDetail();
        // get the token
        const token = UICtrl.getStoredToken().token;
        // get the track endpoint
        const trackEndpoint = e.target.id;
        //get the track object
        const track = await APICtrl.getTrack(token, trackEndpoint);
        // load the track details
        UICtrl.createTrackDetail(track.album.images[2].url, track.name, track.artists[0].name);
    });    

    return {
        init() {
            console.log('App is starting');
            loadGenres();
        }
    }

})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();
}


