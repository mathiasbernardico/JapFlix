document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://japceibal.github.io/japflix_api/movies-data.json';
  
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        // Almacenar los datos en una variable sin mostrarlos
        const moviesData = responseData;
  
        // Puedes acceder a los datos a través de la variable "moviesData" en este punto
        console.log('Datos de películas cargados:', moviesData);
      }
    };
  
    xhr.open('GET', url, true);
    xhr.send();
  });
  