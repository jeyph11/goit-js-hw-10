import { fetchBreeds, fetchCatByBreed } from "./components/cat-api.js";
// Event listener for breed-select dropdown
document.querySelector('.breed-select').addEventListener('change', function () {
  const selectedBreedId = this.value;

  if (selectedBreedId) {
    // Fetch cat information by breed ID
    fetchCatByBreed(selectedBreedId)
      .then(catInfo => {
        console.log("Cat information:", catInfo);
      })
      .catch(error => {
        console.error("Error fetching cat information:", error);
      });
  }
});

// Event listener for page load
document.addEventListener('DOMContentLoaded', function () {
  // Fetch breeds and populate breed-select dropdown on page load
  fetchBreeds()
    .then(breeds => {
      console.log("Breeds:", breeds);
    })
    .catch(error => {
      console.error("Error fetching breeds:", error);
    });
});
