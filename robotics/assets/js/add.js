const name = document.querySelector("#name")
const category = document.querySelector("#category")
const image = document.querySelector("#image")
const form = document.querySelector(".category-form")

form.addEventListener("submit", function (event) {
    event.preventDefault()
    const formdata = new FormData()
    formdata.append("name", name.value)
    formdata.append("category", category.value)
    formdata.append("image", image.files[0])
    console.log(Object.fromEntries(formdata))
    axios.post("http://localhost:3000/robots", formdata)
})