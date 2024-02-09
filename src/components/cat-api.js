import axios from "axios";
import Notiflix from "notiflix"; 

axios.defaults.headers.common["x-api-key"] = "live_GOntijT5mcsZuF8Xse7bW5xiUzxzmExDJZZSXrMkru463kbaoa4zGyHdyAhm56WP";

export function fetchBreeds() {
  const loader = document.querySelector('.loader');
  const errorElement = document.querySelector('.error');

  loader.style.display = "block";
  errorElement.style.display = "none";

  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => {
      const breedSelect = document.querySelector('.breed-select');
      breedSelect.innerHTML = "";

      response.data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      loader.style.display = "none"; // Hide loader on success

      return response.data;
    })
    .catch(error => {
      console.error("error fetching", error);
      loader.style.display = "none"; // Hide loader on error
      errorElement.style.display = "block"; // Show error message
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const loader = document.querySelector('.loader');
  const errorElement = document.querySelector('.error');
  const catInfoDiv = document.querySelector('.cat-info');

  loader.style.display = "block";
  errorElement.style.display = "none";
  catInfoDiv.innerHTML = ""; // Clear previous cat information

  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const catInfo = response.data && response.data.length > 0 ? response.data[0] : null;
      if (catInfo) {
        catInfoDiv.innerHTML = `
        <img src="${catInfo.url}" alt="${catInfo.breeds ? catInfo.breeds[0].name : 'Unknown'}" width="300px">
          <p>Breed: ${catInfo.breeds ? catInfo.breeds[0].name : 'Unknown'}</p>
          <p>Description: ${catInfo.breeds[0].description}</p>
          <p>Temperament: ${catInfo.breeds[0].temperament}</p>
        `;
        loader.style.display = "none"; // Hide loader on success
        return catInfo;
      } else {
        throw new Error("Invalid information");
      }
    })
    .catch(error => {
      console.error("error fetching", error);
      loader.style.display = "none"; // Hide loader on error
      errorElement.style.display = "block"; // Show error message
      throw error;
    });
}
