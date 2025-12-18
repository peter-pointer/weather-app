const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const API_URL = import.meta.env.VITE_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5'

if (!API_KEY) {
  console.warn('Falta VITE_WEATHER_API_KEY en .env.local')
}

export async function fetchWeatherByCity(city) {
  if (!city) throw new Error('Ciudad obligatoria')

  const url = `${API_URL}/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=es`

  const res = await fetch(url)

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Ciudad no encontrada')
    }
    throw new Error('Error al obtener el tiempo')
  }

  const data = await res.json()
  return {
    city: `${data.name}, ${data.sys.country}`,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0]?.description ?? '',
    icon: data.weather[0]?.icon ?? '',
    humidity: data.main.humidity,
    wind: data.wind.speed
  }
}
