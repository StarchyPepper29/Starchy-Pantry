document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded! 🚀");
  
    const recipeList = document.getElementById("recipeList");
  
    fetch("./recipe-list.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("JSON data is not an array");
        }
        data.forEach((recipe) => {
          const recipeItem = document.createElement("div");
          
          recipeItem.classList.add("recipe-item");
          const recipeingdiv= document.createElement("div");  
          recipeingdiv.classList.add("hidden");
          const linkwrapper = document.createElement("a");
          linkwrapper.href = "single.html?id=" + recipe.id;
          const recipeName = document.createElement("h2");
          recipeName.textContent = recipe.name;
          recipeName.classList.add("nameclass");
          const Expand = document.createElement("button");
            Expand.textContent = "Expand";
            Expand.classList.add("expandbutton");
            
          
            
          const recipeRegion = document.createElement("p");
          recipeRegion.textContent = "Region: " + recipe.region;
          recipeRegion.classList.add("regionclass");
          recipeRegion.classList.add("hidden");
  
          const recipeIngredients = document.createElement("ul");
          
          const recipeDescription = document.createElement("p");
          recipeDescription.textContent = recipe.description;
          recipeDescription.classList.add("descriptionclass");
  
          const recipeImage = document.createElement("img");
          recipeImage.src = recipe.Image;
          recipeImage.alt = recipe.Name;
            recipeImage.classList.add("imageclass");

          const ingredientList = document.createElement("ul"); // Create unordered list
          ingredientList.classList.add("ingredientsclass"); // Add class to unordered list
          ingredientList.classList.add("hidden"); // Hide unordered list
          // Loop through the ingredient list array and create list items
          recipe.ingredientList.forEach((ingredient) => {
            const ingredientItem = document.createElement("li");
            ingredientItem.textContent = ingredient;
            ingredientList.appendChild(ingredientItem);
          });
  
          const recipeShortInstructions = document.createElement("p");
          recipeShortInstructions.textContent = recipe.shortInstructions;
            recipeShortInstructions.classList.add("instructionsclass");
            recipeShortInstructions.classList.add("hidden");

          
          linkwrapper.appendChild(recipeImage);
          linkwrapper.appendChild(recipeName);

          let expand=false;

          recipeItem.appendChild(Expand);
            Expand.addEventListener("click", () => {
            console.log("Hello");
            if(expand==false){
                Expand.textContent = "Collapse";
                expand=true;
                recipeingdiv.innerHTML="";
            }
            else{
                Expand.textContent = "Expand";
                expand=false;
                recipeingdiv.innerHTML="";
            }
            
            
            
             recipeItem.appendChild(recipeRegion);
             recipe.ingredientList.forEach((ingredient) => {
                const ingredientItem = document.createElement("li");
                ingredientItem.textContent = ingredient;
                recipeingdiv.appendChild(ingredientItem);
                
              });
            
            recipeItem.appendChild(recipeingdiv);
            
            recipeingdiv.classList.toggle("hidden");
            recipeRegion.classList.toggle("hidden");
            
    });
          
         
          
          
          recipeList.appendChild(linkwrapper);
          recipeList.appendChild(recipeItem);
          
          
          
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  
      
  });
  