let cards = document.querySelector(".cards");
let sortBtn = document.querySelector(".sort");
let searchInput = document.querySelector(".search");
let copyArr = []
let filteredArr = []

async function getAllCards() {
  let res = await axios("http://localhost:3000/users");
  let data = await res.data;
  cards.innerHTML = ""
  copyArr = data
  filteredArr = filteredArr.length || searchInput.value ? filteredArr : data;
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
          </div>
        </div>
      </div>
      `;
  });
}

getAllCards();

searchInput.addEventListener("input", function (e) {
  filteredArr = copyArr;
  filteredArr = filteredArr.filter((el) =>
    el.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  getAllCards();
});

sortBtn.addEventListener("change", function (e) {
  if (e.target.value === "za") {
    filteredArr.sort((a, b) => a.price - b.price);
  } else if (e.target.value === "az") {
    filteredArr.sort((a, b) => b.price - a.price);
  } else {
    filteredArr = []
  }
  getAllCards();
});

function deleteBtn(id) {
  axios.delete(`http://localhost:3000/users/${id}`)
    .then(res => window.location.reload())
}