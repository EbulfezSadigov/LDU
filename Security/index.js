const loadBtn = document.querySelector(".loadBtn");
let page = 1
function getDataJson() {
    fetch(`http://localhost:3000/boxs?_page=${page}&_limit=3`)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                sec2Boxs.innerHTML += `
                <div class="sec2-box">
                <i onclick="addFavorite(${element.id})" class="bi bi-balloon-heart-fill"></i>
                <img src="${element.image}" alt="Image">
                <div class="sec2-box-p1">${element.name}</div>
                <div class="sec2-box-p2">${element.description}</div>
                <div class = "sec2-box-btns">
                <button class = "sec2-box-btn"><a href = "./details.html?id=${element.id}" target = "_blank">View Details</a></button>
                <button class = "sec2-box-btn" onclick = "boxsDelete(${element.id})")>Delete</button>
                <button class = "sec2-box-btn"><a href = "./update.html?id=${element.id}" target = "_blank">Update</a></button>
                </div>
            </div>
            `
            })
        })
}

getDataJson();

loadBtn.addEventListener("click", () => {
    if (event.target.innerText === "Load More") {
        page++;
        getDataJson();
        event.target.innerText = "Less More"
    }
    else{
        event.target.innerText = "Load More"
        sec2Boxs.innerHTML=""
        page--
        getDataJson()
    }
})

function addFavorite(id) {
    axios.get("http://localhost:3000/boxs/"+id)
    .then(res=>{
        axios.post("http://localhost:3000/favorites",res.data)
    })
}