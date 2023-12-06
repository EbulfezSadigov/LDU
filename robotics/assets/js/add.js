const name = document.querySelector("#name")
const category = document.querySelector("#category")
const image = document.querySelector("#image")
const img = document.querySelector("#img")
const form = document.querySelector(".category-form")

form.addEventListener("submit", function (event) {
    event.preventDefault()
    let obj = {}
    let src = image.files[0]
    const reader = new FileReader();
    reader.onload = function (e) {
        obj = {
            image: e.target.result,
            name: name.value,
            category: category.value
        }
        axios.post("http://localhost:3000/robots", obj)
    };
    reader.readAsDataURL(src);
    window.location="../robotics/index.html"
})