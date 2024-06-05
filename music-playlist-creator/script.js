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


let myPlaylistData = data
let playlists = document.getElementById('card-parent')
const myPlaylistCards = myPlaylistData['playlists'].map((item) => {
    console.log(item)
    return (

        `
        <div class="card">
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

var modal = document.getElementById("festivalModal");
var span = document.getElementsByClassName("close")[0];

function openModal(festival) {
   document.getElementById('festivalName').innerText = festival.name;
   document.getElementById('festivalImage').src = festival.imageUrl;
   document.getElementById('festivalDates').innerText = `Dates: ${festival.dates}`;
   document.getElementById('festivalLocation').innerText = `Location: ${festival.location}`;
   document.getElementById('artistLineup').innerHTML = `<strong>Lineup:</strong> ${festival.lineup.join(', ')}`;
   modal.style.display = "block";
}

span.onclick = function() {
   modal.style.display = "none";
}
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}
