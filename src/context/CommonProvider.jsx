import { useState, useEffect } from "react";
import { CommonContext } from "./commonContext";
import { baseUrl, valueTrimLover, STORAGE_KEY, HOUR,DEFAULT_CITY } from "../global/constAndFunc";
import { v4 as uuidv4 } from "uuid";

export const CommonProvider = ({ children }) => {
  const [tab, setTab] = useState("now");
  const [value, setValue] = useState(DEFAULT_CITY);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [storage, setStorage] = useState(
    () => JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || []
  );

  const fetchByCity = async (type, city) => {
    const cityNorm = valueTrimLover(city);
    if (!cityNorm) return;

    const keyMatch = (x) => valueTrimLover(x.city) === cityNorm && x.type === type;

    const cached = storage.find(keyMatch);
    if (cached && Date.now() - cached.timestamp < HOUR) {
      setData(cached.data);
      setError(null);
      setNotFound(false);
      return;
    }

    setLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const res = await fetch(baseUrl({ type, city: cityNorm }));
      if (!res.ok) {
        if (res.status === 404) {
          setError("Місто не знайдено");
          setNotFound(true);
        } else {
          setError(`Помилка: ${res.status}`);
        }
        return;
      }
      const json = await res.json();
      setData(json);

      setStorage((prev) => [
        ...prev.filter((x) => !keyMatch(x)),
        {
          id: uuidv4(),
          city: cityNorm,
          type,
          data: json,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getWeather = async (e) => {
    const isEnter = e?.type === "keydown" && e.key === "Enter";
    const isClick = e?.type === "click";
    if (e && !isEnter && !isClick) return;

    const cityValue = valueTrimLover(value);
    if (!cityValue) return;

    const type = tab === "now" ? "weather" : "forecast";
    await fetchByCity(type, cityValue);
    setValue("");
  };

  useEffect(() => {
    const type = tab === "now" ? "weather" : "forecast";
    const currentCity = data?.name || data?.city?.name || value || DEFAULT_CITY;
    fetchByCity(type, currentCity);
  }, [tab]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  }, [storage]);

  return (
    <CommonContext.Provider
      value={{
        tab, setTab,
        value, setValue,
        data, loading, error,
        notFound, setNotFound,
        getWeather,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};
