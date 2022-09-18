const categoryEditButton = document.getElementById("category-edit-btn")

categoryEditButton.addEventListener("click", (event) => {
  event.preventDefault()

  event.currentTarget.closest(".radioSet").classList.toggle("edit")
})
