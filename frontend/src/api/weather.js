const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const API_URL =
  import.meta.env.VITE_WEATHER_API_URL ||
  'https://api.openweathermap.org/data/2.5'
const GEO_URL =
  import.meta.env.VITE_WEATHER_GEO_URL ||
  'https://api.openweathermap.org/geo/1.0'

if (!API_KEY) {
  console.warn('Falta VITE_WEATHER_API_KEY en el .env')
}

async function fetchCityCoordinates(city) {
  const url = `${GEO_URL}/direct?q=${encodeURIComponent(
    city
  )}&limit=1&appid=${API_KEY}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Error al obtener la ubicación')
  }

  const data = await res.json()
  if (!data.length) {
    throw new Error('Ciudad no encontrada')
  }

  return {
    name: data[0].name,
    country: data[0].country,
    lat: data[0].lat,
    lon: data[0].lon
  }
}

export async function fetchWeatherByCity(city) {
  if (!city) throw new Error('Ciudad obligatoria')

  const location = await fetchCityCoordinates(city)

  const url = `${API_URL}/weather?lat=${location.lat}&lon=${
    location.lon
  }&appid=${API_KEY}&units=metric&lang=es`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Error al obtener el tiempo')
  }

  const data = await res.json()
  return {
    city: `${location.name}, ${location.country}`,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0]?.description ?? '',
    icon: data.weather[0]?.icon ?? '',
    humidity: data.main.humidity,
    wind: data.wind.speed
  }
}
