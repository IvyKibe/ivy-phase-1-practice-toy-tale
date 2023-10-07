document.addEventListener("DOMContentLoaded", () => {
    const toyCollection = document.getElementById("toy-collection");
    const toyForm = document.querySelector(".add-toy-form");
    const toyBtn = document.getElementById("new-toy-btn");
  
    toyBtn.addEventListener("click", () => {
      const container = document.querySelector(".container");
      container.style.display = "block";
    });
  
    toyForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const nameInput = toyForm.querySelector('input[name="name"]');
      const imageInput = toyForm.querySelector('input[name="image"]');
      const name = nameInput.value;
      const image = imageInput.value;
  
      createToy(name, image)
        .then((toy) => {
          renderToy(toy);
          nameInput.value = "";
          imageInput.value = "";
          const container = document.querySelector(".container");
          container.style.display = "none";
        })
        .catch((error) => console.error(error));
    });
  
    getToys()
      .then((toys) => {
        toys.forEach((toy) => {
          renderToy(toy);
        });
      })
      .catch((error) => console.error(error));
  
    toyCollection.addEventListener("click", (event) => {
      if (event.target.classList.contains("like-btn")) {
        const toyId = event.target.id;
        const likesElement = event.target.previousElementSibling;
        let likes = parseInt(likesElement.textContent);
        likes++;
  
        updateToyLikes(toyId, likes)
          .then(() => {
            likesElement.textContent = `${likes} Likes`;
          })
          .catch((error) => console.error(error));
      }
    });
  
    function getToys() {
      return fetch("http://localhost:3000/toys")
        .then((response) => response.json())
        .catch((error) => console.error(error));
    }
  
    function createToy(name, image) {
      const toyData = {
        name: name,
        image: image,
        likes: 0
      };
  
      return fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(toyData)
      })
        .then((response) => response.json())
        .catch((error) => console.error(error));
    }
  
    function updateToyLikes(toyId, likes) {
      const toyData = {
        likes: likes
      };
  
      return fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(toyData)
      })
        .then((response) => response.json())
        .catch((error) => console.error(error));
    }
  
    function renderToy(toy) {
      const card = document.createElement("div");
      card.className = "card";
  
      const name = document.createElement("h2");
      name.textContent = toy.name;
  
      const image = document.createElement("img");
      image.className = "toy-avatar";
      image.src = toy.image;
  
      const likes = document.createElement("p");
      likes.textContent = `${toy.likes} Likes`;
  
      const likeBtn = document.createElement("button");
      likeBtn.className = "like-btn";
      likeBtn.id = toy.id;
      likeBtn.textContent = "Like ❤️";
  
      card.appendChild(name);
      card.appendChild(image);
      card.appendChild(likes);
      card.appendChild(likeBtn);
  
      toyCollection.appendChild(card);
    }
  });