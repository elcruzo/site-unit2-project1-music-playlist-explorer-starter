document.addEventListener("DOMContentLoaded", function() { 
    const likeButtons = document.getElementById("likeButton"); 
    const likeCount = document.getElementById("likeCount"); 
    
    let count = 0; 
    likeButton.addEventListener("click", function() { 
        if (likeButton.classList.contains("liked")) { 
            count--; 
            likeButton.classList.remove("liked"); 
        } 
        else { 
            count++; 
            likeButton.classList.add("liked");
        } 
        likeCount.textContent = count;
    });
});
