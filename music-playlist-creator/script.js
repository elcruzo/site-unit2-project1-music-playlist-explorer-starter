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





let myPlaylistData = data
let playlists = document.getElementById('card-parent')
const myPlaylistCards = myPlaylistData['playlists'].map((item) => {
    console.log(item)
    return (

        `
        <div class="card">
            <div class="card-img">
                <img src="${item['playlist_art']}" alt="" class="card-img">
            </div>

            <div>
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
