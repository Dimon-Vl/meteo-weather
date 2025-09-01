import { useContext } from "react";
import s from "./NowCard.module.scss";
import DetailRow from "./DetailRow";
import CardWrapper from "../cardWrapper/CardWrapper";
import { fmtVisibility, roundTo, fmtTime, calcDewPointC, getSunPosition } from "../../global/constAndFunc";
import { img } from '../../global/img';
import { CommonContext } from "../../context/commonContext";

const NowCard = () => {
  const iconUrl = (code) => (code ? `https://openweathermap.org/img/wn/${code}.png` : null);
  const { data } = useContext(CommonContext);
  
  if (!data) return null;

  const { name, sys, main, wind, visibility, weather, clouds } = data;

  const feelsLike = main?.feels_like ?? main?.temp;
  const temp = main?.temp;
  const high = main?.temp_max;
  const low = main?.temp_min;
  const humidity = main?.humidity;
  const pressure = main?.pressure;
  const windDeg = wind?.deg ?? 0;
  const windSpeed = wind?.speed;
  const cloudiness = clouds?.all;
  const desc = weather?.[0]?.description;
  const icon = weather?.[0]?.icon;

  const sunriseText = fmtTime(sys?.sunrise);
  const sunsetText = fmtTime(sys?.sunset);

  const sunriseMs = sys?.sunrise ? sys.sunrise * 1000 : null;
  const sunsetMs = sys?.sunset ? sys.sunset * 1000 : null;

  const iconSize = 24;
  const sunPos = getSunPosition(sunriseMs, sunsetMs, Date.now(), iconSize);

  const dewPoint = calcDewPointC(temp, humidity);

  return (
    <CardWrapper title={"Погода зараз в" + (name ? ` – ${name}` : "")}>
      <div className={s.content}>
        <div className={s.hero}>
          <span className={s.heroLabel}>Відчувається як</span>
          <span className={s.heroTemp}>
            {roundTo(feelsLike)}<span>°</span>
            <img className={s.weatherIcon} src={iconUrl(icon)} alt="" />
          </span>
        </div>

        <div className={s.sunBlock}>
          <div className={s.sunArc}>
            <svg width="120" height="70" viewBox="0 0 120 70" aria-hidden>
              <path
                d="M10 55 A45 45 0 0 1 110 55"
                fill="none"
                stroke="#F7B34A"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {sunPos && Number.isFinite(sunPos.x) && Number.isFinite(sunPos.y) && (
                <g transform={`translate(${sunPos.x}, ${sunPos.y})`}>
                  <circle cx="12" cy="12" r="12" fill="#FFF" />
                  <path
                    fill="#F7C044"
                    d="M18.405 17.661a1 1 0 0 1-1.437 1.391l-1.665-1.72a1 1 0 1 1 1.437-1.39l1.665 1.72zm-5.541 2.651a1 1 0 0 1-2 0v-2.366a1 1 0 1 1 2 0v2.366zm-6.718-1.624a1 1 0 0 1-1.357-1.469l1.758-1.624a1 1 0 1 1 1.357 1.47l-1.758 1.623zm-2.753-5.769a1 1 0 1 1 .002-2l2.422.001a1 1 0 0 1-.001 2l-2.423-.001zm1.77-6.115A1 1 0 0 1 6.6 5.414l1.664 1.719a1 1 0 0 1-1.436 1.391l-1.665-1.72zm5.751-3.391a1 1 0 1 1 2 0v2.366a1 1 0 0 1-2 0V3.413zm6.5 1.903a1 1 0 1 1 1.356 1.47l-1.757 1.623a1 1 0 1 1-1.357-1.47l1.758-1.623zm3.005 6.114a1 1 0 0 1-.002 2l-2.422-.001a1 1 0 0 1 .001-2l2.423.001z"
                  />
                  <ellipse fill="#F7C044" cx="11.85" cy="11.935" rx="3.225" ry="3.256" />
                </g>
              )}
            </svg>
          </div>
          <div className={s.sunTimes}>
            <div className={s.sunItem}>
              <img className={s.svgIcon} src={img.sunrise} alt="" />
              <span>{sunriseText ?? "--:--"}</span>
            </div>
            <div className={s.sunItem}>
              <img className={s.svgIcon} src={img.sunset} alt="" />
              <span>{sunsetText ?? "--:--"}</span>
            </div>
          </div>
        </div>

        <div className={s.details}>
          <DetailRow iconSrc={img.temperature} iconAlt="" label="Вис./низьк." value={`${roundTo(high)} / ${roundTo(low)}°`} />
          <DetailRow
            iconSrc={img.wind}
            iconAlt="Напрям вітру"
            label="Вітер"
            value={
              <span className={s.windWrap}>
                <img className={s.svgIcon} src={img.arrow} alt="" aria-hidden style={{ transform: `rotate(${windDeg}deg)` }} />
                <span>{roundTo(windSpeed, 1)}</span><span>м/с</span>
              </span>
            }
          />
          <DetailRow iconSrc={img.humidity} iconAlt="" label="Вологість" value={`${roundTo(humidity)}%`} />
          <DetailRow iconSrc={img.pressure} iconAlt="" label="Тиск" value={`${roundTo(pressure)} мбар`} />
          <DetailRow iconSrc={img.visibility} iconAlt="" label="Видимість" value={fmtVisibility(visibility)} />
          <DetailRow iconSrc={img.cloud} iconAlt="" label="Хмарність" value={cloudiness != null ? `${cloudiness}%` : "--"} />
          <DetailRow iconSrc={img.info} iconAlt="" label="Опис" value={desc ?? "--"} />
          <DetailRow iconSrc={img.humidity} iconAlt="" label="Точка роси" value={dewPoint == null ? "--" : `${dewPoint}°`} />
        </div>
      </div>
    </CardWrapper>
  );
};

export default NowCard;
