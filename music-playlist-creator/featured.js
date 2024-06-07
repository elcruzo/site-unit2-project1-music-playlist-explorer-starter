document.addEventListener("DOMContentLoaded", () => {
    const playlistData = data.playlists;
    const randomPlaylist = playlistData[Math.floor(Math.random() * playlistData.length)];

    const featuredImg = document.querySelector(".featured-img-left");
    const featuredName = document.getElementById("featured-name");
    const featuredCreator = document.getElementById("featured-creator");
    const songList = document.getElementById("song-list");

    featuredImg.src = randomPlaylist.playlist_art;
    featuredName.textContent = randomPlaylist.playlist_name;
    featuredCreator.textContent = randomPlaylist.playlist_creator;

    randomPlaylist.songs.forEach(song => {
        const songItem = document.createElement("li");
        songItem.classList.add("modal-each-song");

        songItem.innerHTML = `
            <img src="${song.cover_art}" alt="${song.title}" class="modal-each-song-img">
            <div class="modal-song-parent-div">
                <div class="modal-each-song-desc">
                    <h3>${song.title}</h3>
                    <p><em>${song.album}</em></p>
                </div>
                <div class="modal-song-time">
                    <h3>${song.duration}</h3>
                </div>
            </div>
        `;
        songList.appendChild(songItem);
    });
});
