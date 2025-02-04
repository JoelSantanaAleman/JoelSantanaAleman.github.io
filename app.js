/*geolocalizacion*/
window.addEventListener('load', () => {
    let lat;
    let lon;

    //temperatura_valor, temperatura_descripcion, ubicacion, icono_animado, viento_velocidad
    let temperatura_valor = document.getElementById('temperatura_valor')
    let temperatura_descripcion = document.getElementById('temperatura_descripcion')
    let ubicacion = document.getElementById('ubicacion')
    let icono_animado = document.getElementById('icono_animado')
    let viento_velocidad = document.getElementById('viento_velocidad')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            // mediante longitud y latitud
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5647987e7045817570b98f5b79b0eb8d`;

            //mediante ubicacion por ciudad
            //const url = `https://api.openweathermap.org/data/2.5/weather?q=Firgas&lan=es&units=metric&appid=5647987e7045817570b98f5b79b0eb8d`;

            //console.log(url);
            fetch(url)
                .then(response => {return response.json()})
                .then(data => {
                    //console.log(data);
                    let temp = Math.round(data.main.temp)
                    temperatura_valor.textContent = `${temp} ºC`
                    let desc = data.weather[0].description
                    temperatura_descripcion.textContent = desc.toUpperCase()
                    ubicacion.textContent = data.name
                    viento_velocidad.textContent = `${data.wind.speed} m/s`
                    //iconos estaticos
                    //console.log(data)
                    /*let icon_code = data.weather[0].icon
                    const url_icon = `https://openweathermap.org/img/wn/${icon_code}.png`
                    console.log(url_icon) */

                    //iconos dinamicos
                    let icon_code = data.weather[0].icon
                    const url_icon = `https://openweathermap.org/img/wn/${icon_code}.png`
                    switch(data.weather[0].main){
                        case 'Thunderstorm':
                            icono_animado.src='animated/thunder.svg'
                            console.log('TORMENTA');
                            break;
                        case 'Drizzle':
                            icono_animado.src='animated/rainy-2.svg'
                            console.log('LLOVIZNA');
                            break;
                        case 'Rain':
                            icono_animado.src='animated/rainy-7.svg'
                            console.log('LLUVIA');
                            break;
                        case 'Snow':
                            icono_animado.src='animated/snowy-6.svg'
                            console.log('NIEVE');
                            break;                        
                        case 'Clear':
                            icono_animado.src='animated/day.svg'
                            console.log('LIMPIO');
                            break;
                        case 'Atmosphere':
                            icono_animado.src='animated/weather.svg'
                            console.log('ATMOSFERA');
                            break;  
                        case 'Clouds':
                            icono_animado.src='animated/cloudy-day-2.svg'
                            console.log('NUBES');
                            break;  
                        case 'SCATTERED CLOUDS':
                            icono_animado.src='animated/cloudy-day-1.svg'
                            console.log('NUBES DISPERSAS');
                            break; 
                        default:
                            icono_animado.src='animated/cloudy-day-1.svg'
                            console.log('por defecto');
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        });
    }
});


