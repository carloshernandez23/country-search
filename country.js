const btn = document.querySelector('.btn');
const input = document.querySelector('input');
const toggler = document.querySelector('.toggler');
const image = document.querySelector('.image');
const info = document.querySelector('.info');
const introducer = document.querySelector('.introducer');
const results = document.querySelector('.results');
const form = document.querySelector('.form');
const stats = document.querySelector('.stats');

let countries = [];



toggler.addEventListener('click', () => {
    document.body.classList.toggle('light-mode')
});





const getApi = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json();
        countries = [...data];
    } catch (error) {
      console.log(error);  
    }
   
}

getApi();

const getWeather = async (latitud, longitud) => {
try {
  const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitud}&lon=${longitud}&appid=260a5ae06c51f785a886e5596a7e0b0c`)
  const data2 = await response2.json();
  return data2;
} catch (error) {
    console.log(error); 
}

}





input.addEventListener('input', async e =>{
    e.preventDefault();
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(input.value.toLowerCase()));
   console.log(filteredCountries);
    image.innerHTML = ''
    info.innerHTML = ''
    if (filteredCountries.length>10){
      results.innerText = 'Tienes que ser mas especifico'
      image.innerHTML = ''
      info.innerHTML = ''
      introducer.innerText = ''
    }  
    
    if (filteredCountries.length>1 && filteredCountries.length<=10) {
      while(image.firstElementChild && info.firstElementChild){  
    image.removeChild(image.firstElementChild)  
    info.removeChild(info.firstElementChild) 
    
    }      
        filteredCountries.forEach(element => {
            introducer.innerHTML = ''
            results.innerText = ''
            image.innerHTML += `<img src = '${element.flags.svg}'><h3 class="country_title">${element.name.common}</h3>`
            info.innerHTML = ''
        });

      
    }

    if (filteredCountries.length===1) {
     
      const weather = await getWeather(filteredCountries[0].latlng[0], filteredCountries[0].latlng[1]);
      

      introducer.innerHTML = ''
      results.innerText = ''
      image.innerHTML = `<img src = '${filteredCountries[0].flags.svg}'>`
      info.innerHTML = `<h3 class="country_title">${filteredCountries[0].name.common}</h3>
      <div class="infos">
          <div class="infos1">
              <p class="official_name">Official Name : <span>${filteredCountries[0].name.official}</span></p>
          
              <p class="capital">Capital City : <span>${filteredCountries[0].capital}</span></p>
              <p class="continent"> Continent : <span>${filteredCountries[0].continents[0]}</span></p>
              <p class="region"> Temp Actual : <span>${weather.main.temp}℃</span></p>

          </div>
          <div class="infos2">
              <p class="region"> Sub Regions : <span>${filteredCountries[0].subregion}</span></p>
              <p class="languages">Languages : <span>${Object.values(filteredCountries[0].languages)
.toString()
.split(",")
.join(", ")}</span></p>
<p class="region"> Clima Actual : <span>${weather.weather[0].description}</span></p>
<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">

          </div>
      </div>`
    }  
    if (filteredCountries.length===0) {
      results.innerText = 'No hay resultados'
      image.innerHTML = ''
      info.innerHTML = ''
      introducer.innerText = ''
    } if (input.value ==='') {
      results.innerText = ''
      image.innerHTML = ''
      info.innerHTML = ''
      introducer.innerText = 'Empieza la busqueda'
    }


})


