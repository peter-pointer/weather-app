import { useState } from 'react'
import { fetchWeatherByCity } from '../api/weather'

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function search(city) {
    try {
      setLoading(true)
      setError(null)
      setWeather(null)

      const data = await fetchWeatherByCity(city)
      setWeather(data)
    } catch (err) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return { weather, loading, error, search }
}
