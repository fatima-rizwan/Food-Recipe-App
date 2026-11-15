let food = document.querySelector('.food')

let indian = document.querySelector('#indian')
let canadian = document.querySelector('#canadian')
let american = document.querySelector('#american')
let british = document.querySelector('#british')
let thai = document.querySelector('#thai')
let russian = document.querySelector('#russian')

let recipe



const fetchData = async (area) => {
    const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );

    const data = await api.json();
    recipe = data.meals;

    console.log("MY Recipe = ", recipe);

    showData(recipe);

    scrollToRecipes();
};

// Automatic scroll to recipes section

const scrollToRecipes = () => {
    document.querySelector(".recipes-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
};

fetchData("India");

//search recipe 

const search = () => {
    let input = document.querySelector("#search");

    input.addEventListener('keydown', async (e) => {

        if (e.key === "Enter") {

            let inputVal = input.value.trim();

            if (!inputVal) return;

            // Remove cursor from search bar
            input.blur();

            const api = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(inputVal)}`
            );

            const data = await api.json();

            recipe = data.meals;

            console.log("search food", recipe);

            if (recipe) {
                showData(recipe);
            } else {
                food.innerHTML = "<p>No recipes found!</p>";
            }

            // Automatically scroll to results
            scrollToRecipes();
        }
    });
};

search();

let showData = (items) => {
    food.innerHTML = items
        .map(
            (meal) => `
    <div style="text-align:center">
    <div>
    <img src=${meal.strMealThumb} class="img" />
    </div>
    <h5 style="margin:10px">${meal.strMeal}</h5>
    </div>
    `
        )
        .join(" ");
};

indian.addEventListener("click", () => {
    fetchData("india");
});
american.addEventListener("click", () => {
    fetchData("united states");
});
russian.addEventListener("click", () => {
    fetchData("russian");
});
british.addEventListener("click", () => {
    fetchData("british");
});
thai.addEventListener("click", () => {
    fetchData("thai");
});
canadian.addEventListener("click", () => {
    fetchData("canadian");
});