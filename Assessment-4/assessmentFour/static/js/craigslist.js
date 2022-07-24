
function addPost() {
    title = document.getElementById("newTitle").value
    user = document.getElementById("newUser").value
    description = document.getElementById("newDescription").value

    axios.post("", {title: title, user: user, description: description}).then((response) => {
        window.location.href = "../../"
    })
}

function editPost() {
    title = document.getElementById("newTitle").value
    user = document.getElementById("newUser").value
    description = document.getElementById("newDescription").value

    axios.post("", {title: title, user: user, description: description}).then((response) => {
        window.location.href = "../../../"
    })
}

function addCategory() {
    name = document.getElementById("newName").value

    axios.post("", {name: name}).then((response) => {
        window.location.href = "../../"
    })
}

function editCategory() {
    name = document.getElementById("newName").value

    axios.post("", {name: name}).then((response) => {
        window.location.href = "../../../"
    })
}