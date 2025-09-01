import { useState, useEffect } from "react";
import { CommonContext } from "./commonContext";
import { baseUrl } from "../global/constAndFunc";

export const CommonProvider = ({ children }) => {
  const [tab, setTab] = useState("now");
  const [value, setValue] = useState("Київ");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fetchByCity = async (type, city) => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const res = await fetch(baseUrl({ type, city }));
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
    } finally {
      setLoading(false);
    }
  };

  const getWeather = async (e) => {
    const isEnter = e?.type === "keydown" && e.key === "Enter";
    const isClick = e?.type === "click";
    if (e && !isEnter && !isClick) return;
    if (!value.trim()) return;

    const type = tab === "now" ? "weather" : "forecast";
    await fetchByCity(type, value);
    setValue("");
  };

  useEffect(() => {
    const type = tab === "now" ? "weather" : "forecast";
    fetchByCity(type, value);
  }, []);

  useEffect(() => {
    const type = tab === "now" ? "weather" : "forecast";
    const currentCity = data?.name || data?.city?.name || value || "Київ";
    fetchByCity(type, currentCity);
  }, [tab]);

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
