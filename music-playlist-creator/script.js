// document.addEventListener("DOMContentLoaded", function() {
//     const likeButtons = document.getElementById("likeButton");
//     const likeCount = document.getElementById("likeCount");

//     let count = 0;
//     likeButton.addEventListener("click", function() {
//         if (likeButton.classList.contains("liked")) {
//             count--;
//             likeButton.classList.remove("liked");
//         }
//         else {
//             count++;
//             likeButton.classList.add("liked");
//         }
//         likeCount.textContent = count;
//     });
// });


function openModal(festival) {
    document.getElementById('festivalName').style.display = "block";
}

function closeModal(festival) {
    document.getElementById('festivalName').style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const myPlaylistData = data
    const playlists = document.getElementById('card-parent')
    const myPlaylistCards = myPlaylistData['playlists'].map((item) => {
        console.log(item)
        return (
            `
            <div class="card" onclick='openModal(${JSON.stringify(item)})'>
                <div class="card-img">
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
            </div>
            `
        )
    }).join('')

    playlists.innerHTML = myPlaylistCards

    const modal = document.getElementById("festivalModal");
    const span = document.getElementsByClassName("close")[0];

    window.openModal = function(playlist) {
        document.getElementById('playlistImage').src = playlist.playlist_art;
        document.getElementById('playlistName').innerText = playlist.playlist_name;
        document.getElementById('playlistCreator').innerText = `By: ${playlist.playlist_creator}`;

        const songList = document.getElementById('songList');
        songList.innerHTML = '<h3>Song List:</h3>';
        playlist.songs.forEach(song => {
            const songItem = document.createElement('div');
            songItem.innerHTML =
            `
            <img src="${song.cover_art}" alt="Cover Art" style="width:50px; vertical-align: middle;">
            <span>${song.title} - ${song.artist} (${song.duration})</span>
            `
            ;
            songList.appendChild(songItem);
        });
        modal.style.display = "block";
    };

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});
