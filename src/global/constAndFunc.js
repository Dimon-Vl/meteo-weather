export const apiKey = 'a8b8713d6186f33f473cd4c9c1688230'

export const baseUrl = ({ type = "weather", city = "Київ" }) => {
    return `https://api.openweathermap.org/data/2.5/${type}?q=${encodeURIComponent(city)}&units=metric&lang=uk&appid=${apiKey}`;
}

export const tabs = [
    { key: "now", label: "Зараз" },
    { key: "today", label: "Сьогодні" },
    { key: "tomorrow", label: "Завтра" },
    { key: "dayAfterTomorrow", label: "Післязавтра" },
    { key: "five", label: "на 5 днів" },
];

export const roundTo = (val, to = 0) => {
    if (val == null) return "--";
    if (typeof val !== "number" || Number.isNaN(val)) {
        throw new Error("val must be a number");
    }
    return +val.toFixed(to);
};

export const fmtVisibility = (m) => {
    if (m == null) return "--";
    if (m >= 1000) return `${roundTo(m / 1000, 1)} км`;
    return `${m} м`;
};

export const fmtTime = (unixSec, tzOffsetSec = 0) => {
    if (!unixSec) return null;
    const d = new Date((unixSec + tzOffsetSec) * 1000);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export const calcDewPointC = (tempC, humidityPct) => {
    if (tempC == null || humidityPct == null) return null;
    const a = 17.27, b = 237.7;
    const alpha = ((a * tempC) / (b + tempC)) + Math.log(humidityPct / 100);
    const dew = (b * alpha) / (a - alpha);
    return Math.round(dew);
}

export const getSunPosition = (sunrise, sunset, date = Date.now(), iconSize = 24) => {
    const total = sunset - sunrise;
    const progress = Math.min(Math.max((date - sunrise) / total, 0), 1);
    const r = 45, cx = 60, cy = 55;
    const angle = -Math.PI + Math.PI * progress;
    const centerX = cx + r * Math.cos(angle);
    const centerY = cy + r * Math.sin(angle);
    return { x: centerX - iconSize / 2, y: centerY - iconSize / 2 };
};
