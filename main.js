const imageContainer = document.getElementById("image-container");
const APP_NAME = "Grid Lanes Demo";

async function fetchNaturePhotos() {
  const url = `https://api.unsplash.com/photos/random?client_id=${
    import.meta.env.VITE_CLIENT_ID
  }&query=nature&count=15`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const photos = data;

    photos.forEach((photo) => {
      const figure = document.createElement("figure");
      figure.classList.add("grid-item"); // Added class

      const img = document.createElement("img");
      img.src = photo.urls.regular;

      const caption = document.createElement("figcaption");
      caption.classList.add("attribution"); // Added class
      caption.innerHTML = `
  Photo by 
  <a href="${photo.user.links.html}?utm_source=${APP_NAME}&utm_medium=referral">
    ${photo.user.name}
  </a> on 
  <a href="https://unsplash.com/?utm_source=${APP_NAME}&utm_medium=referral">
    Unsplash
  </a>
`;

      figure.appendChild(img);
      figure.appendChild(caption);
      imageContainer.appendChild(figure);
    });
  } catch (error) {
    console.error("Error displaying images:", error);
  }
}

fetchNaturePhotos();
