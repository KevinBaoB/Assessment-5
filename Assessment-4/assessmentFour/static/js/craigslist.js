
function addPost() {
    title = document.getElementById("newTitle").value
    user = document.getElementById("newUser").value
    description = document.getElementById("newDescription").value

    axios.post("", {title: title, user: user, description: description}).then((response) => {
        window.location.href = "../../"
    })
}