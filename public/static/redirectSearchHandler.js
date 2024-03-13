const searchInput = document.getElementById('searchInput')
searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter"){
        console.log(searchInput.value)
        console.log(searchInput)
        window.location.href = `/discover/${searchInput.value}`
    }
})