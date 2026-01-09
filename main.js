const imageContainer = document.getElementById("image-container");
const APP_NAME = "Grid Lanes Demo";

async function fetchNaturePhotos() {
  const url = `https://api.unsplash.com/search/photos?client_id=${
    import.meta.env.VITE_CLIENT_ID
  }&page=1&query=nature&count=15`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const photos = data.results;

    photos.forEach((photo) => {
      // 1. Create the figure element
      const figure = document.createElement("figure");

      // 2. Create and setup the image
      const img = document.createElement("img");
      img.src = photo.urls.regular;
      img.alt = photo.alt_description || "Nature photo";

      // 3. Create the attribution (figcaption)
      const caption = document.createElement("figcaption");
      caption.innerHTML = `
        Photo by 
        <a href="${photo.user.links.html}?utm_source=${APP_NAME}&utm_medium=referral">
          ${photo.user.name}
        </a> on 
        <a href="https://unsplash.com/?utm_source=${APP_NAME}&utm_medium=referral">
          Unsplash
        </a>
      `;

      // 4. Assemble and inject
      figure.appendChild(img);
      figure.appendChild(caption);
      imageContainer.appendChild(figure);
    });
  } catch (error) {
    console.error("Error displaying images:", error);
  }
}

fetchNaturePhotos();
