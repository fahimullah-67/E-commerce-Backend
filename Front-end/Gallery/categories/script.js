const imageViewer = document.querySelector(".imageViewer");
const viewerImg = document.querySelector(".viewerImg");
const closeBtn = document.querySelector(".closeBtn");
const prevImg = document.querySelector(".PrevImg");
const nextImg = document.querySelector(".NextImg");
const images = document.querySelectorAll(".card img");

let currentIndex = 0;
images.forEach((img , index) => {
    img.addEventListener("click", () => {
        imageViewer.style.display = "flex";
        viewerImg.src = img.src;
        currentIndex = index;
    })
})

closeBtn.addEventListener("click", () => {
    imageViewer.style.display = "none";
})

prevImg.addEventListener("click", () => {
    currentIndex = (currentIndex -1 + images.length) % images.length;
    viewerImg.src = images[currentIndex].src;
})

nextImg.addEventListener("click", () => {
    currentIndex = (currentIndex + 1 ) % images.length;
    viewerImg.src = images[currentIndex].src;
})