const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".datos");
const api = "cd15917fb810f8e38712de3c9e80ff44";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let city = input.value;
  console.log(city);

  let lon;
  let lat;
  //declaramos variables del index
  let temperaturaValor = document.getElementById("temperatura_valor");
  let temperaturaDescripcion = document.getElementById(
    "temperatura_descripcion"
  );

  let ubicacion = document.getElementById("ubicacion");
  let ciudad = document.getElementById("ciudad");
  let iconoAnimado = document.getElementById("icono_animado");

  let vientoVelocidad = document.getElementById("viento_velocidad");

  let humedad = document.getElementById("humedad");
  ///////////

  //damos el objeto navigator para mostrar la ubicacion
  if (navigator.geolocation) {
    // console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition((posicion) => {
      // console.log(posicion.coords.latitude);
      // gurdamos los valores de la longitud y la latitud que utliza el api
      lon = posicion.coords.longitude;
      //  console.log(lon);
      lat = posicion.coords.latitude;

      console.log(city);
      // Check for Geolocation API permissions
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (permissionStatus) {
          console.log(
            "geolocation permission state is ",
            permissionStatus.state
          );

          permissionStatus.onchange = function () {
            console.log(
              "geolocation permission state has changed to ",
              this.state
            );
          };
        });

        ///////////
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log('Geolocation permissions granted');
          console.log('Latitude:' + position.coords.latitude);
          console.log('Longitude:' + position.coords.longitude);
        });
        

      // console.log(inputValue);
      //guuarda en la variable url la ubicacion actual resultado de la respuesta API
      //  const url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cd15917fb810f8e38712de3c9e80ff44`

      //busqueda por ciudad
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${api}&lang=es`;
      // console.log(url);
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //obteniendo valores del data y pasandolo a las variables del index
          let temp = Math.round(data.main.temp);
          temperaturaValor.textContent = `${temp} °C`;

          let desc = data.weather[0].description;
          //convertimos a mayuscula el contenido de la variable desc
          temperaturaDescripcion.textContent = desc.toUpperCase();

          let ubicac = data.name;
          ubicacion.textContent = ubicac;

          let country = data.sys.country;
          ciudad.textContent = country;
          console.log(country);

          let veloc = data.wind.speed;
          vientoVelocidad.textContent = `${veloc} m/s`;

          let humed = data.main.humidity;
          humedad.textContent = `${humed} %`;

          //para usra iconos staticos
          /*cosole.log(data.weather[0].icon);
               let codeIcon =  data.weather[0].icon
               const urlIcon = `http://api.openweathermap.org/img/wn/${codeIcon}.png`
               console.log(urlIcon);*/

          // para usar iconos animados
          // console.log(data.weather[0].main);
          switch (data.weather[0].main) {
            case "Thunderstorm":
              iconoAnimado.src = "animated/thunder.svg";
              console.log("Tormenta");
              break;
            case "Drizzle":
              iconoAnimado.src = "animated/rainy-2.svg";
              console.log("Llovisna");
              break;
            case "Rain":
              iconoAnimado.src = "animated/rainy-7.svg";
              console.log("Lluvia");
              break;
            case "Snow":
              iconoAnimado.src = "animated/snowy-6.svg";
              console.log("Nieve");
              break;
            case "Snow":
              iconoAnimado.src = "animated/snowy-6.svg";
              console.log("Nieve");
              break;
            case "Clear":
              iconoAnimado.src = "animated/day.svg";
              console.log("Despejado");
              break;
            case "Atmosphere":
              iconoAnimado.src = "animated/weather.svg";
              console.log("Atmosfera");
              break;
            case "Clouds":
              iconoAnimado.src = "animated/cloudy-day-1.svg";
              console.log("Nublado");
              break;

            default:
              iconoAnimado.src = "animated/cloudy-day-1.svg";
              console.log("Por defecto");
              break;
          }
          return $(".datos").show();
        })
        .catch((error) => {
          msg.textContent = "Por favor busca una ciudad válida";
        });
    });
  }
});
