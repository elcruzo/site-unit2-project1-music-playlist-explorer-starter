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
        // renderModal(item);
            modal.style.display = 'block';
    })
})

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
