//APIs
const ULR_STAR_WARS = "https://swapi.dev/api/people";
const ULR_SW_IMAGES = "https://akabab.github.io/starwars-api/api/all.json";

//Search
const inputSearch = document.querySelector(".search__input");
const btnSearch = document.querySelector(".search__btn");

//Card
const card = document.querySelector(".card");
const image = document.querySelector(".image");
const cardName = document.querySelector(".card__name");
const cardPlanet = document.querySelector(".card__planet");
const cardVehicles = document.querySelector(".card__vehicles");

// Boton search
const starwarSearch = btnSearch.onclick = (event) => {
  event.preventDefault();

  const inputStarwars = inputSearch.value;

  inputSearch.value = "";
  console.log(inputStarwars);

  if (inputStarwars === "") {
    Swal.fire({
      title: "Error",
      text: "Debe llenar el campo nombre pokemon o id",
      icon: "error",
    });
    return;
  }

  getDataFromStarWars(inputStarwars);
};

inputSearch.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    getDataFromStarWars(event.target.value);
    inputSearch.value = "";
  }
});

// Obtención de la data
const getDataFromStarWars = async (id) => {
  const response = await fetch(ULR_STAR_WARS);
  const data = await response.json();
  
  await getImageFromStarWars(data.results, id);
  // console.log(data.results);
};
getDataFromStarWars();

const getImageFromStarWars = async (actors, id) => {
  const response = await fetch(ULR_SW_IMAGES);
  const imagenes = await response.json();

  actors.map((actor) => {
    // la idea es que por cada iteracion se pueda extraer la foto del API de ULR_SW_IMAGES
    const resultado = imagenes.filter((imagen) => imagen.name === actor.name);
    actor.imageFromAPI = resultado[0].image;
  });

  // console.log(actors);
  // console.log(actors, id);
  console.log(actors[id]);
  setStarwarsCard(actors, id);
};

const setStarwarsCard = async(actors, id=1) => {
  const planetUrl = await actors[id-1].homeworld;
  const responsePlanet = await fetch(planetUrl);
  const dataPlanet = await responsePlanet.json();
  // console.log(dataPlanet);
  
  const idSearch = actors[id-1];
  // const dataVehicles = await getVehiclesFromStarwars(actors, id);

  image.src = `${idSearch.imageFromAPI}`;

  cardName.textContent = idSearch.name;

  cardPlanet.textContent = `Homeworld: ${dataPlanet.name}`;

  // cardVehicles.textContent = `Vehicle: ${dataVehicles.name}`;
  
  console.log(id);
  console.log(actors);
  // getVehiclesFromStarwars(actors, id);
}

// const getVehiclesFromStarwars = async (actors, id) => {
//   const vehiclesUrl = actors[id].vehicles[0];
//   const responseVehicles = await fetch(vehiclesUrl);
//   const dataVehicles = await responseVehicles.json();

//   cardVehicles.textContent = `Vehicle: ${dataVehicles.name}`;

//   // console.log(dataVehicles);
// }

