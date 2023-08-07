document.addEventListener("DOMContentLoaded", () => {
    const URLp= new URLSearchParams(window.location.search);
    const id = URLp.get("id");
    console.log(id);

    fetch("./recipe-list.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            const recipe = data.find((item) => item.id === id);
            if (!recipe) {
              throw new Error("Recipe not found");
            }
            document.getElementById("recipeName").textContent = recipe.name;
            document.getElementById("recipeRegion").textContent = "Region: " + recipe.region;
      
            const ingredientList = document.getElementById("recipeIngredients");
            recipe.ingredientList.forEach((ingredient) => {
              const listItem = document.createElement("li");
              listItem.textContent = ingredient;
              ingredientList.appendChild(listItem);
            });
      
            document.getElementById("recipeDescription").textContent = recipe.description;
            document.getElementById("recipeImage").src = "./media/recipeimage.png";
            document.getElementById("recipeImage").alt = recipe.name;
            document.getElementById("recipeShortInstructions").textContent = recipe.shortInstructions;
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });  
});

