let myPlaylistData = data;
let playlists = document.getElementById("card-parent");
let searchInput = document.getElementById("search-input");
let sortOptions = document.getElementById("sort-options");

function renderPlaylists(filterText = '', sortBy = 'name') {
  playlists.innerHTML =
  `
  <div class="card add-card">
    <i class="fa fa-plus plus-icon"></i>
  </div>
  `;

  let filteredPlaylists = myPlaylistData["playlists"]
    .filter(item => item['playlist_name'].toLowerCase().includes(filterText.toLowerCase()) || item['playlist_creator'].toLowerCase().includes(filterText.toLowerCase()))

    if (sortBy === 'name') {
      filteredPlaylists.sort((a, b) => a['playlist_name'].localeCompare(b['playlist_name']));
    } else if (sortBy === 'likes') {
      filteredPlaylists.sort((a, b) => a['likeCount'] - b['likeCount']);
    } else if (sortBy === 'date') {
      filteredPlaylists.sort((a, b) => new Date(b['dateAdded']) - new Date(a['dateAdded']));
    }

    filteredPlaylists.forEach((item) => {
      let playlistElement = document.createElement("li");
      playlistElement.innerHTML =  `
        <div>
            <img src="${item['playlist_art']}" alt="" class="img-card">
        </div>

        <div class="text-section">
            <h3>${item['playlist_name']}</h3>
            <p>${item['playlist_creator']}</p>

            <div class="like-section">
                <i class="fa-regular fa-heart likeButton"></i>
                <span class="likeCount">${item['likeCount']}</span>
            </div>
        </div>
      `;
      playlistElement.classList.add("card");
      playlists.appendChild(playlistElement);

      playlistElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('likeButton')) {
          toggleLike(event.target);
        } else {
          loadModalOverlay(item);
          modal.style.display = 'block';
        }
      });
    });

    document.querySelector(".add-card").addEventListener('click', () => {
      modal.style.display = 'block';
    });
}

function toggleLike(button) {
  const likeCountSpan = button.nextElementSibling;
  let likeCount = parseInt(likeCountSpan.textContent);

  if (button.classList.contains('liked')) {
    button.classList.remove('liked');
    button.classList.add('fa-regular');
    button.classList.remove('fa-solid');
    likeCount = 0;
  } else {
    button.classList.add('liked');
    button.classList.add('fa-solid');
    button.classList.remove('fa-regular');
    likeCount = 1;
  }

  likeCountSpan.textContent = likeCount;
}

searchInput.addEventListener('input', (event) => {
  renderPlaylists(event.target.value, sortOptions.value);
})

sortOptions.addEventListener('change', (event) => {
  renderPlaylists(searchInput.value, event.target.value);
})

renderPlaylists();

const modal = document.getElementById('modal-overlay');

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

function loadModalOverlay(playlist) {
  const modalContent = document.querySelector('.modal-content');

  modalContent.innerHTML = `
    <span class="close">&times;</span>
    <div class="modal-playlist-info">
      <img src="${playlist.playlist_art}" alt="Playlist Cover img" class="modal-playlist-img">
      <div class="modal-playlist-info-txt">
        <h1>${playlist.playlist_name}</h1>
        <h2>${playlist.playlist_creator}</h2>
        <button id="shuffle-button">Shuffle <i class="fa-solid fa-shuffle"></i></button>
      </div>
    </div>

  `;

  playlist.songs.forEach(song => {
    const songElement = document.createElement('div');
    songElement.classList.add('modal-each-song');

    songElement.innerHTML = `
      <img src="${song.cover_art}" alt="Each Song" class="modal-each-song-img">
      <div class="modal-song-parent-div">
        <div class="modal-each-song-desc">
          <h3>${song.title}</h3>
          <p><em>${song.album}</p>
        </div>
        <div class="modal-song-time"><h3>${song.duration}</h3></div>
      </div>
    `;
    modalContent.appendChild(songElement);
  });

  const closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  const shuffleButton = document.getElementById('shuffle-button');
  shuffleButton.addEventListener('click', () => {
    shuffleSongs(playlist);
  });
}

function shuffleSongs(playlist) {
  for (let i = playlist.songs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playlist.songs[i], playlist.songs[j]] = [playlist.songs[j], playlist.songs[i]];
  }

  loadModalOverlay(playlist);
}

let songCount = 1;

// Function to add another song input section
function addSongInput() {
  const songsContainer = document.getElementById("songs-container");

  const newSong = document.createElement("div");
  newSong.classList.add("song");

  newSong.innerHTML = `
    <label for="song-title-${songCount}">Title:</label>
    <input type="text" id="song-title-${songCount}" name="song-title-${songCount}" required>
    <label for="song-artist-${songCount}">Artist:</label>
    <input type="text" id="song-artist-${songCount}" name="song-artist-${songCount}" required>
    <label for="song-duration-${songCount}">Duration:</label>
    <input type="text" id="song-duration-${songCount}" name="song-duration-${songCount}" required>
    <label for="song-cover-art-${songCount}">Cover Art URL:</label>
    <input type="text" id="song-cover-art-${songCount}" name="song-cover-art-${songCount}" required>
  `;

  songsContainer.appendChild(newSong);
  songCount++;
}

// Add event listener for adding another song
document.getElementById("add-song-button").addEventListener("click", addSongInput);

// Handle form submission
document.getElementById("new-playlist-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const playlistName = document.getElementById("playlist-name").value;
  const playlistCreator = document.getElementById("playlist-creator").value;
  const playlistArt = document.getElementById("playlist-art").value;

  const songs = [];
  for (let i = 0; i < songCount; i++) {
    const title = document.getElementById(`song-title-${i}`).value;
    const artist = document.getElementById(`song-artist-${i}`).value;
    const duration = document.getElementById(`song-duration-${i}`).value;
    const coverArt = document.getElementById(`song-cover-art-${i}`).value;

    songs.push({
      title,
      artist,
      duration,
      cover_art: coverArt
    });
  }

  const newPlaylist = {
    playlist_name: playlistName,
    playlist_creator: playlistCreator,
    playlist_art: playlistArt,
    songs: songs,
    likeCount: 0,
    dateAdded: new Date().toISOString()
  };

  myPlaylistData["playlists"].push(newPlaylist);
  renderPlaylists(searchInput.value, sortOptions.value);
  modal.style.display = 'none';
});
