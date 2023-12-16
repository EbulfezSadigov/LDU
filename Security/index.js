const loadBtn = document.querySelector(".loadBtn");
const sec2Boxs = document.getElementById('sec2Boxs');
const search = document.querySelector(".search");
let page = 1;
const arr = [];

function getDataJson() {
    fetch(`http://localhost:3000/boxs?_page=${page}&_limit=3`)
        .then(response => { return response.json() })
        .then(data => {
            arr.push(data)
            data.forEach(element => {
                sec2Boxs.innerHTML += `
                <div class="sec2-box">
                    <i onclick="addFavorite(${element.id})" class="bi bi-balloon-heart-fill"></i>
                    <img src="${element.image}" alt="Image">
                    <div class="sec2-box-p1">${element.name}</div>
                    <div class="sec2-box-p2">${element.description}</div>
                    <div class = "sec2-box-btns">
                    <button class = "sec2-box-btn"><a href = "./details.html?id=${element.id}">View Details</a></button>
                    <button class = "sec2-box-btn" onclick = "boxsDelete(${element.id})")>Delete</button>
                    <button class = "sec2-box-btn"><a href = "./update.html?id=${element.id}" target = "_blank">Update</a></button>
                    </div>
                </div>
            `
            })
            return arr.flat()
        })
        .then(data => {
            console.log(data);
            search.addEventListener('input', () => {
                let value = event.target.value
                if (value !== null) {
                    data.filter(s => {
                        sec2Boxs.innerHTML = ''
                        return s.name.toLowerCase().includes(value.toLowerCase())
                    }).forEach(element => {
                        sec2Boxs.innerHTML += `
                        <div class="sec2-box">
                            <i onclick="addFavorite(${element.id})" class="bi bi-balloon-heart-fill"></i>
                            <img src="${element.image}" alt="Image">
                            <div class="sec2-box-p1">${element.name}</div>
                            <div class="sec2-box-p2">${element.description}</div>
                            <div class = "sec2-box-btns">
                            <button class = "sec2-box-btn"><a href = "./details.html?id=${element.id}">View Details</a></button>
                            <button class = "sec2-box-btn" onclick = "boxsDelete(${element.id})")>Delete</button>
                            <button class = "sec2-box-btn"><a href = "./update.html?id=${element.id}" target = "_blank">Update</a></button>
                            </div>
                        </div>`
                    })
                }

            })
        })
}

function boxsDelete(id) {
    axios.delete("http://localhost:3000/boxs/" + id)
    window.location.reload()
}

loadBtn.addEventListener("click", () => {
    page++
    getDataJson()
})

getDataJson();

function addFavorite(id) {
    axios.get("http://localhost:3000/boxs/" + id)
        .then(res => {
            axios.post("http://localhost:3000/favorites", res.data)
        })
}