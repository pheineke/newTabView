async function getRandomImage() {
    const url = "https://picsum.photos/350/475";
    try {
      const imageElement = document.getElementById("random_photo");
      // Directly set the src attribute to the random image URL
      imageElement.src = url;
    } catch (error) {
      console.error(error.message);
    }
  }

  // Call the function when the page loads
  window.onload = getRandomImage;