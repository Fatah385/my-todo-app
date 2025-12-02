import { Search, Droplet, Wind, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function App() {
  const apiKey = import.meta.env.VITE_WEATHER_KEY;
  const [city, setCity] = useState("jakarta");
  const [weather, setWeather] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const weatherImages = {
    Clear: "src/assets/images/clear.png",
    Clouds: "src/assets/images/clouds.png",
    Rain: "src/assets/images/rain.png",
    Drizzle: "src/assets/images/drizzle.png",
    Snow: "src/assets/images/snow.png",
    Thunderstorm: "src/assets/images/thunder.png",
    Mist: "src/assets/images/mist.png",
  };

  const getWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      console.log("Error fetching:", err);
    }

    setCity("");
  };

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  useEffect(() => {
    getWeather();

    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";
    setDarkMode(isDark);
    document.documentElement.dataset.theme = savedTheme;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(weather);

  return (
    <div className="flex w-full justify-center ">
      <div className="card bg-sky-300 dark:bg-sky-800 w-full h-screen sm:w-sm sm:h-auto flex flex-col text-center sm:mt-20 px-5 py-6 rounded-md shadow-md transition-all duration-300 ease-in-out">
        <nav className="flex justify-between">
          {" "}
          <button
            onClick={toggleTheme}
            className="bg-sky-400 dark:bg-sky-600 p-2 rounded-full transition-all duration-300"
          >
            <span
              className={`block transition-transform duration-300 ${
                darkMode
                  ? "rotate-180 scale-90 opacity-75"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            >
              {darkMode ? <Sun /> : <Moon />}
            </span>
          </button>
          <div className="search bg-white text-neutral-500 w-6/7 sm:w-5/6 flex justify-between py-2 px-4 rounded-md">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-md border-none outline-none"
              placeholder="Search city..."
            />{" "}
            <button
              onClick={getWeather}
              className="cursor-pointer hover:text-neutral-800"
            >
              <Search />
            </button>
          </div>
        </nav>
        {!weather.main ? (
          <p className="text-2xl font-semibold pt-20">City not found .....</p>
        ) : (
          <>
            <div className="weather flex flex-col justify-center mt-5 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-white/30 backdrop-blur-md rounded-md py-6">
                {" "}
                <div className="flex flex-col p-2 justify-center">
                  <img
                    src={
                      weatherImages[weather?.weather?.[0]?.main] ||
                      weatherImages["Clear"]
                    }
                    alt=""
                    className="w-32 m-auto"
                  />
                  <h2 className="weartherText text-2xl font-semibold">
                    {weather?.weather?.[0]?.main}
                  </h2>
                </div>
                <div className="flex flex-col p-2 justify-center gap-2">
                  <h1 className="temp text-5xl font-bold">
                    {Math.round(weather?.main?.temp)}°C
                  </h1>
                  <h2 className="city text-2xl font-semibold">
                    {weather?.name}
                  </h2>
                </div>
              </div>

              <div className="details grid grid-cols-1 sm:grid-cols-2 mt-5 gap-2">
                <div className="col flex justify-center px-2 py-6 bg-white/30 backdrop-blur-md rounded-t-md sm:rounded-l-md">
                  <Droplet className="size-10 mr-2" />
                  <div className="">
                    <p className="humidity text-sm text-left">
                      {weather?.main?.humidity}%
                    </p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className="col flex justify-center px-2 py-6 bg-white/30 backdrop-blur-md rounded-b-md sm:rounded-r-md ">
                  <Wind className="size-10 mr-2" />
                  <div>
                    <p className="wind text-sm text-left">
                      {weather?.wind?.speed} km/h
                    </p>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
