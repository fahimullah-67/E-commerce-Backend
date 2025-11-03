  const gridGallery = document.getElementById('gridGallery');
  const sliderTrack = document.getElementById('sliderTrack');
  const curvedGallery = document.getElementById('curvedGallery');
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');

  let sliderIndex = 0;

  function openModal(imgSrc) {
    modal.style.display = 'flex';
    modalImage.src = imgSrc;
  }
  function closeModal(event) {
    if (event.target.id === 'modalImage') return;
    modal.style.display = 'none';
  }

  function addImage() {
    const url = document.getElementById('imgUrl').value.trim();
    const title = document.getElementById('imgTitle').value.trim() || 'New Image';
    if (!url) return alert('Please enter an image URL.');

    // === Add to Grid Gallery ===
    const gridCard = document.createElement('div');
    gridCard.className = 'card';
    gridCard.innerHTML = `
      <img src="${url}" alt="${title}" onclick="openModal('${url}')">
      <div class="card-content">
        <h3>${title}</h3>
        <a href="${url}" target="_blank" class="card-link">${url}</a>
      </div>`;
    gridGallery.appendChild(gridCard);

    // === Add to Horizontal Slider ===
    const sliderCard = document.createElement('div');
    sliderCard.className = 'slider-card';
    sliderCard.innerHTML = `
      <img src="${url}" alt="${title}" onclick="openModal('${url}')">
      <div class="card-content">
        <h3>${title}</h3>
        <a href="${url}" target="_blank" class="card-link">${url}</a>
      </div>`;
    sliderTrack.appendChild(sliderCard);

    // === Add to Curved Gallery ===
    const curvedCard = document.createElement('div');
    curvedCard.className = 'curved-card';
    curvedCard.innerHTML = `<img src="${url}" alt="${title}" onclick="openModal('${url}')">`;
    curvedGallery.appendChild(curvedCard);

    document.getElementById('imgUrl').value = '';
    document.getElementById('imgTitle').value = '';
  }

  // === Slider Navigation ===
  function moveSlide(dir) {
    const cards = sliderTrack.children;
    const cardWidth = cards[0]?.offsetWidth + 20 || 320;
    sliderIndex += dir;
    const maxIndex = Math.max(0, cards.length - Math.floor(window.innerWidth / cardWidth));
    if (sliderIndex < 0) sliderIndex = 0;
    if (sliderIndex > maxIndex) sliderIndex = maxIndex;
    sliderTrack.style.transform = `translateX(${-sliderIndex * cardWidth}px)`;
  }

  // === Sample Initial Images ===
  const sampleImages = [
    {url:"https://i.pinimg.com/1200x/62/06/31/620631d20675c58d7493180cfa477942.jpg", title:"Norway Fjords"},
    {url:"https://i.pinimg.com/1200x/02/9e/9e/029e9e9c3271feb308084073e88d115d.jpg", title:"Iceland Volcano"},
    {url:"https://i.pinimg.com/1200x/2b/ab/91/2bab9166891723ccec644fe13fed0fe5.jpg", title:"Lapland Aurora"}
  ];
  sampleImages.forEach(img => {
    document.getElementById('imgUrl').value = img.url;
    document.getElementById('imgTitle').value = img.title;
    addImage();
  });