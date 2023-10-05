
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
          <div class="dropdown">
            <a href="#">More</a>
              <ul class="menu">
                <li><a href="#"> Year: ${pelicula.release_date} </a></li>
                <li><a href="#"> Runtime: ${pelicula.runtime}</a></li>
                <li><a href="#"> Budget: ${pelicula.budget}</a></li>
                <li><a href="#"> Revenue: ${pelicula.revenue}</a></li>
              </ul>
          </div> 
        <p>${pelicula.tagline}</p>
        <p>Puntaje: ${pelicula.vote_average} / 10</p>`;
      lista.appendChild(itemlista);
      
      itemlista.addEventListener("click", function () {
        mostrarContenedorSuperior(pelicula);
      })
    });
  }

  function mostrarContenedorSuperior(pelicula){
    const canvas = document.getElementById("offcanvas");
    const h1 = document.getElementById("h1canvas");
    const p1 = document.getElementById("p1canvas");
    //Agrega los elementos al canvas
    h1.innerHTML = pelicula.title + ":" + pelicula.genres.map((genre) => genre.name.toLowerCase()).join(', ');
    p1.innerHTML = pelicula.overview;
    if (canvas.style.display === 'none' || canvas.style.display === '') {
      // Si está oculto, muestra el canvas cambiando su estilo de visualización
      canvas.classList.add("show");
      canvas.style.visibility = "hidden";
      canvas.style.visibility = "visible";
      canvas.style.display = 'block';

    } else {
      // Si ya está visible, oculta el canvas
      canvas.style.display = 'none';
    }
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
  
