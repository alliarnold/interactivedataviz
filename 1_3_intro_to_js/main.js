const label = document.getElementById("name-label")
const input = document.getElementById("name-input")
const button = document.getElementById("name-submit")

let userName;

function updateName() {
    userName = input.value
    console.log(userName)
    label.innerText = "Wow! I love the name " + userName
    button.innerText = "Try again!"
    input.value = ""
}