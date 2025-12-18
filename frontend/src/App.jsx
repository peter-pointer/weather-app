import { useState } from 'react'
import { useWeather } from './hooks/useWeather'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const { weather, loading, error, search } = useWeather()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!city.trim()) return
    await search(city.trim())
  }

  return (
    <div className="app">
      <h1>My Weather App</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Introduce una ciudad, por ejemplo Madrid"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.city}</h2>

          <div className="main-info">
            <div className="temp">
              <span className="temp-value">{weather.temp}°C</span>
              <span className="temp-feels">
                Sensación {weather.feelsLike}°C
              </span>
              <span className="desc">{weather.description}</span>
            </div>

            {weather.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
              />
            )}
          </div>

          <div className="extra">
            <p>Humedad: {weather.humidity}%</p>
            <p>Viento: {weather.wind} m/s</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App




/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + vamos a seguir??</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App */
