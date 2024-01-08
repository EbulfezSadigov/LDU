let cards = document.querySelector(".cards");
let sortBtn = document.querySelector(".sort");
let sorted = "ascending";
let filteredArr = [];

async function getAllCards() {
  let res = await axios("http://localhost:3000/users");
  let data = await res.data;
  cards.innerHTML = ""
  filteredArr = filteredArr.length ? filteredArr : data;
  filteredArr.forEach((el) => {
    cards.innerHTML += `
        <div class="col col-md-4 col-12 mt-4">
        <div class="card">
          <img width="60px" src="${el.photo}" alt="" />
          <div class="card-body">
            <h5>${el.title}</h5>
            <p>
              ${el.about}
            </p>
            <span>${el.price}$</span>
            <a class="btn btn-primary m-3" href="./details.html?id=${el.id}" >LEARN MORE</a>
            <div>
              <a onclick=deleteBtn(${el.id}) class="btn btn-danger" >DELETE</a>
              <a onclick="editBtn(${el.id})" class="btn btn-secondary" href="./add.html?id=${el.id}">EDİT</a>
              <a onclick="addFav(${el.id})" class="btn btn-dark" >ADD FAV</a>
            </div>
          </div>
        </div>
      </div>
        `;
  });
}
getAllCards();

sortBtn.addEventListener("click", function () {
  if (sorted === "ascending") {
    filteredArr.sort((a, b) => a.price - b.price);
    sorted = "descending";
    sortBtn.innerText = "SORT ASC";
  } else if (sorted === "descending") {
    filteredArr.sort((a, b) => b.price - a.price);
    sorted = "def";
    sortBtn.innerText = "SORT DSC";
  } else {
    filteredArr = []
    sorted = "ascending";
    sortBtn.innerHTML = "SORT";
  }
  getAllCards();
});

function deleteBtn(id) {
  axios.delete(`http://localhost:3000/users/${id}`);
  window.location.reload()
}

async function addFav(cardId) {
  let res = await axios(`http://localhost:3000/users/${cardId}`);
  let obj = await res.data;
  axios.post(`http://localhost:3000/favorites`, obj);
}