let id = new URLSearchParams(window.location.search).get("id")
const robots = document.querySelector('.robot-two')

fetch(`http://localhost:3000/robots/${id}`)
    .then(response => response.json())
    .then(robot => {
        robots.innerHTML += `
        <div class="blok">
                        <div class="blok-one">
                            <img src="${robot.image}" alt="">
                        </div>
                        <div class="blok-two">
                            <h3>${robot.name}</h3>
                            <p>${robot.category}</p>
                        </div>
                    </div>
        `
    })