let id = new URLSearchParams(window.location.search).get("id");
let titleInput = document.querySelector(".title");
let aboutInput = document.querySelector(".about");
let priceInput = document.querySelector(".price");
let photoInput = document.querySelector(".photo");
let addBtn = document.querySelector(".addbtn");
let roundedImage = document.querySelector(".rounded-image");

axios(`http://localhost:3000/users/${id}`).then((res) => {
  titleInput.value = res.data.title
  aboutInput.value = res.data.about
  priceInput.value = res.data.price
  roundedImage.src = res.data.photo
  addBtn.innerHTML = "EDIT";
});

photoInput.addEventListener('input', (e) => {
  let file = e.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      roundedImage.src = reader.result;
    }
  }
})

addBtn.addEventListener("click", function () {
  if (!id) {
    axios.post(`http://localhost:3000/users`, {
      title: titleInput.value,
      about: aboutInput.value,
      price: priceInput.value,
      photo: roundedImage.src,
    });
  } else {
    axios.patch(`http://localhost:3000/users/${id}`, {
      title: titleInput.value,
      about: aboutInput.value,
      price: priceInput.value,
      photo: roundedImage.src,
    });
  }
});