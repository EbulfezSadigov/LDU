const robots = document.querySelector('.robot-two')
const loadBtn = document.querySelector('.load')
const search = document.querySelector('.search')
let page = 1;
const arr = [];
function showData() {
    fetch(`http://localhost:3000/robots?_page=${page}&_limit=4`)
        .then(response => response.json())
        .then(data => {
            arr.push(data)
            axios.get(`http://localhost:3000/favourites`)
                .then(res => {
                    data.forEach(robot => {
                        let ids = res.data.find(f => f.id === robot.id);
                        console.log(ids);
                        if (ids) {
                            robots.innerHTML += `
                            <div class="blok">
                                <div class="blok-one">
                                    <i onclick="addFavorite(${robot.id})" class="bi bi-heart-fill"></i>
                                    <img src="${robot.image}" alt="">
                                </div>
                                <div class="blok-two">
                                    <h3>${robot.name}</h3>
                                    <p>${robot.category}</p>
                                    <a href="./details.html?id=${robot.id}"><button>VIEW DETAILS</button></a>
                                    <button onclick="deleteRobot(${robot.id})">Delete</button>
                                    <a href="./update.html?id=${robot.id}"><button>Update Robot</button></a>
                                </div>
                            </div>`
                        }
                        else {
                            robots.innerHTML += `
                            <div class="blok">
                                <div class="blok-one">
                                    <i onclick="addFavorite(${robot.id})" class="bi bi-heart"></i>
                                    <img src="${robot.image}" alt="">
                                </div>
                                <div class="blok-two">
                                    <h3>${robot.name}</h3>
                                    <p>${robot.category}</p>
                                    <a href="./details.html?id=${robot.id}"><button>VIEW DETAILS</button></a>
                                    <button onclick="deleteRobot(${robot.id})">Delete</button>
                                    <a href="./update.html?id=${robot.id}"><button>Update Robot</button></a>
                                </div>
                            </div>`
                        }
                    })
                })



            return arr.flat()
        })
        .then(data => {
            search.addEventListener('input', (e) => {
                let search = e.target.value;
                console.log(search);
                if (search) {
                    data.filter(robot => {
                        robots.innerHTML = ''
                        return robot.name.toLowerCase().includes(search.toLowerCase())
                    }).forEach(robot => {
                        robots.innerHTML += `
                        <div class="blok">
                            <div class="blok-one">
                                <i onclick="addFavorite(${robot.id})" class="bi bi-heart nese"></i>
                                <img src="${robot.image}" alt="">
                            </div>
                            <div class="blok-two">
                                <h3>${robot.name}</h3>
                                <p>${robot.category}</p>
                                <a href="./details.html?id=${robot.id}"><button>VIEW DETAILS</button></a>
                                <button onclick="deleteRobot(${robot.id})">Delete</button>
                                <a href="./update.html?id=${robot.id}"><button>Update Robot</button></a>
                            </div>
                        </div>`
                    })
                }
                else {
                    robots.innerHTML = ''
                    data.forEach(robot => {
                        robots.innerHTML += `
                        <div class="blok">
                            <div class="blok-one">
                                <i onclick="addFavorite(${robot.id})" class="bi bi-heart nese"></i>
                                <img src="${robot.image}" alt="">
                            </div>
                            <div class="blok-two">
                                <h3>${robot.name}</h3>
                                <p>${robot.category}</p>
                                <a href="./details.html?id=${robot.id}"><button>VIEW DETAILS</button></a>
                                <button onclick="deleteRobot(${robot.id})">Delete</button>
                                <a href="./update.html?id=${robot.id}"><button>Update Robot</button></a>
                            </div>
                        </div>`
                    })
                }
            })

        })
}

showData()

loadBtn.addEventListener("click", () => {
    page++
    showData()
    event.target.style.display = "none"
})

function deleteRobot(id) {
    axios.delete(`http://localhost:3000/robots/${id}`)
    window.location.reload();
}

function addFavorite(id) {
    event.target.classList.remove('bi-heart')
    event.target.classList.add('bi-heart-fill')
    axios.get(`http://localhost:3000/robots/${id}`)
        .then(res => {
            return res.data
        })
        .then(res => {
            axios.get(`http://localhost:3000/favourites`)
                .then(r => {
                    let ids = r.data.find(f => f.id === res.id);
                    if (!ids) {
                        axios.post(`http://localhost:3000/favourites`, res)
                    }
                    else {
                        axios.delete(`http://localhost:3000/favourites/${ids.id}`)
                    }
                })
        })
}

