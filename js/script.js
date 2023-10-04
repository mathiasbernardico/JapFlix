
document.addEventListener('DOMContentLoaded', function () {
  const url = 'https://japceibal.github.io/japflix_api/movies-data.json';
  const lista = document.getElementById("lista");
  const inputBuscar = document.getElementById("inputBuscar");
  const btnBuscar = document.getElementById("btnBuscar");

  let moviesData = [];

  function buscarPelicula(query) {
    query = query.toLowerCase();
    const encontradas = moviesData.filter((pelicula) =>
      pelicula.title.toLowerCase().includes(query) ||
      pelicula.tagline.toLowerCase().includes(query) ||
      pelicula.overview.toLowerCase().includes(query) ||
      pelicula.genres.map((genre) => genre.name.toLowerCase()).join(', ').includes(query)
    );

    return encontradas;
  }

  function mostrarPeliculas(peliculas) {
    lista.innerHTML = "";
    peliculas.forEach((pelicula) => {
      const itemlista = document.createElement("li");
      itemlista.classList.add("item-lista");
      itemlista.innerHTML =
        `<h2>${pelicula.title}</h2>
        <p>${pelicula.tagline}</p>
        <p>Puntaje: ${pelicula.vote_average} / 10</p>`;
      lista.appendChild(itemlista);
    });
  }

  btnBuscar.addEventListener('click', function () {
    const busqueda = inputBuscar.value.trim().toLowerCase();
    if (busqueda !== "") {
      const coincidenciasPeliculas = buscarPelicula(busqueda);
      mostrarPeliculas(coincidenciasPeliculas);
    }
  });

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        // Almacenar los datos en una variable sin mostrarlos
         moviesData = responseData;
  
        console.log('Datos de películas cargados:', moviesData);
      }
    };
  
    xhr.open('GET', url, true);
    xhr.send();
  });
  
