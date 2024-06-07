let myPlaylistData = data;
let playlists = document.getElementById("card-parent");
let searchInput = document.getElementById("search-input");

function renderPlaylists(filterText = '') {
  playlists.innerHTML = "";
  myPlaylistData["playlists"]
    .filter(item => item['playlist_name'].toLowerCase().includes(filterText.toLowerCase()) || item['playlist_creator'].toLowerCase().includes(filterText.toLowerCase()))
    .forEach((item) => {
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
  renderPlaylists(event.target.value);
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
      <div class="modal-each-song-desc">
        <h3>${song.title}</h3>
        <p><em>${song.album}</p>
      </div>
      <div class="modal-song-time"><h3>${song.duration}</h3></div>
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
