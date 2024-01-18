let titleInput = document.querySelector(".title");
let aboutInput = document.querySelector(".about");
let priceInput = document.querySelector(".price");
let photoInput = document.querySelector(".photo");
let addBtn = document.querySelector(".addbtn");
let roundedImage = document.querySelector(".rounded-image");


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
  if (titleInput.value !== "" && aboutInput.value !== "" && priceInput.value !== ""&&photoInput.value !== "") {
    axios.post(`http://localhost:3000/users`, {
      title: titleInput.value,
      about: aboutInput.value,
      price: priceInput.value,
      photo: roundedImage.src,
    })
    .then(res=>window.location='./index.html')
  }
  else{
    alert("Please select input value")
  }
})