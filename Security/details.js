let id = new URLSearchParams(window.location.search).get('id');
const body = document.querySelector('body');

fetch("http://localhost:3000/boxs/" + id)
    .then((response) => response.json())
    .then((data) => {
        body.innerHTML=`<div class="sec2-box">
    <img src="${data.image}" alt="Image">
    <div class="sec2-box-p1">${data.name}</div>
    <div class="sec2-box-p2">${data.description}</div>
    <div class = "sec2-box-btns">
    </div>
</div>`
    })