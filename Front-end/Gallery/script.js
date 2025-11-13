const selectElement = document.getElementById("categories");
const cardElements = document.querySelectorAll(".card");
const categories = document.querySelectorAll(".categories");

const addBtn = document.querySelector(".addBtn");
const formContent = document.querySelector(".formContent");
const closeBtn = document.querySelector(".closeBtn");
const submitBtn = document.querySelector(".submitBtn");

selectElement.addEventListener("change", (event) => {
  const selectedCategory = event.target.value;
  console.log(`Selected category: ${selectedCategory}`);
  cardElements.forEach((card, index) => {
    const categoryText = categories[index].textContent.toLowerCase();
    if (
      selectedCategory === "all" ||
      categoryText.includes(selectedCategory.toLowerCase())
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

addBtn.addEventListener("click", () => {
  formContent.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
  formContent.style.display = "none";
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let cetagoryInput = document.querySelector(".categoryInput").value;
  let descriptionInput = document.querySelector(".descriptionInput").value;
  let imageInput = document.querySelector(".imageInput").files[0];
  console.log(cetagoryInput, descriptionInput, imageInput);
  addImg(cetagoryInput, descriptionInput, imageInput);
  formContent.style.display = "none";
});

function addImg(category, description, imageFile) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const imageUrl = e.target.result;
    const mainContainer = document.querySelector("main");
    const cardDiv = document.createElement("a");
    cardDiv.className = "card";
    cardDiv.innerHTML = `
      <img src="${imageUrl}" alt="Image">
      <div class="description">${description}</div>`;
    mainContainer.appendChild(cardDiv);
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "categories";
    categoryDiv.style.display = "none";
    categoryDiv.textContent = category;
    cardDiv.appendChild(categoryDiv);
  };
  reader.readAsDataURL(imageFile);
}
