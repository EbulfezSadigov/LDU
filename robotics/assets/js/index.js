const robots = document.querySelector('.robot-two')

fetch('http://localhost:3000/robots')
 .then(response => response.json())
 .then(data => {
    data.forEach(robot => {
        robots.innerHTML += `
        <div class="blok">
                        <div class="blok-one">
                            <img src="${robot.image}" alt="">
                        </div>
                        <div class="blok-two">
                            <h3>${robot.name}</h3>
                            <p>${robot.category}</p>
                            <a href="./details.html?id=${robot.id}"><button>VIEW DETAILS</button></a>
                        </div>
                    </div>
        `
    });
 })