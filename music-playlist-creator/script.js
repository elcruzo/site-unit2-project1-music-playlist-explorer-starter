let myPlaylistData = data
let playlists = document.getElementById("card-parent")
playlists.innerHTML = "";

myPlaylistData["playlists"].forEach((item) => {
    let playlistElement = document.createElement("li")

    playlistElement.innerHTML =  `
                <div>
                    <img src="${item['playlist_art']}" alt="" class="img-card">
                </div>

                <div class="text-section">
                    <h3>${item['playlist_name']}</h3>
                    <p>${item['playlist_creator']}</p>

                    <div class="like-section">
                        <i id="likeButton" class="fa-regular fa-heart"></i>
                        <span id="likeButton">${item['likeCount']}</span>
                    </div>
                </div>
    `
    playlistElement.classList.add("card");
    playlists.appendChild(playlistElement);

    playlistElement.addEventListener('click', () => {
        loadModalOverlay(item);
        modal.style.display = 'block';
    });
});

const modal = document.getElementById('modal-overlay');
const closeButton = document.querySelector('.close');

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

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
}
