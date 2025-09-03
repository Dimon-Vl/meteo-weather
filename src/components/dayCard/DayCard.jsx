import { Fragment, useContext } from "react";
import s from "./DayCard.module.scss";
import { CommonContext } from "../../context/commonContext";
import { img } from '../../global/img'
import CardWrapper from "../cardWrapper/CardWrapper";
import { fmtVisibility, roundTo, calcDewPointC,TABS } from "../../global/constAndFunc";

const iconUrl = (code) => (code ? `https://openweathermap.org/img/wn/${code}.png` : null);

const DayCard = () => {
  const { data, tab } = useContext(CommonContext);

  const { list = [], city } = data || {};
  let day=[];

  if (tab === "today" && list.length) {
    day = list.slice(0, 8);
  } else if (tab === "tomorrow") {
    const todayWeekday = new Date().toLocaleDateString("en-US", { weekday: "long" });
    day = list.filter(e => new Date(e.dt_txt).toLocaleDateString("en-US", { weekday: "long" }) !== todayWeekday).slice(0, 8);
  } else if (tab === "dayAfterTomorrow") {
    const todayWeekday = new Date().toLocaleDateString("en-US", { weekday: "long" });
    day = list.filter(e => new Date(e.dt_txt).toLocaleDateString("en-US", { weekday: "long" }) !== todayWeekday).slice(8, 16);
  } else if (tab === "five") {
    day = list.filter((_, i) => i % 8 === 0);
  }

  if (!day.length) return null;

  const cols = day.map((i) => {
    const temp = i.main?.temp;
    const hum = i.main?.humidity;
    return {
      key: i.dt,
      time: tab === "five"?i.dt_txt?.slice(5,10).split("-").reverse().join("."):i.dt_txt?.slice(11, 16),
      icon: i.weather?.[0]?.icon,
      clouds: i.clouds?.all ?? "--",
      temp,
      feels: i.main?.feels_like,
      pop: Math.round((i.pop ?? 0) * 100),
      prcp: Number((i.rain?.["3h"] ?? i.snow?.["3h"] ?? 0).toFixed(1)),
      press: i.main?.pressure,
      hum: hum ?? "--",
      dew: calcDewPointC(temp, hum),
      vis: fmtVisibility(i.visibility),
      windDeg: i.wind?.deg ?? 0,
      windSpd: i.wind?.speed,
    };
  });

  const rows = [
    {
      label: "Час",
      render: (c) => (
        <>
          <div className={s.hoursTime}>{c.time}</div>
          {c.icon && (
            <img className={s.hoursIcon} src={iconUrl(c.icon)} alt="" aria-hidden />
          )}
        </>
      ),
    },
    { label: "Температура, °", render: (c) => roundTo(c.temp) },
    { label: "Хмарність, %", render: (c) => c.clouds },
    { label: "Відчувається, °", render: (c) => roundTo(c.feels) },
    { label: "Точка роси, °", render: (c) => (c.dew == null ? "--" : roundTo(c.dew)) },
    { label: "Видимість", render: (c) => c.vis ?? "--" },
    { label: "Ймовірність опадів, %", render: (c) => c.pop },
    { label: "Опади, мм", render: (c) => c.prcp },
    { label: "Тиск, мм", render: (c) => c.press },
    { label: "Вологість, %", render: (c) => c.hum },
    {
      label: "Вітер, м/с",
      render: (c) => (
        <span className={s.windWrap}>
          <img
            className={s.svgIcon}
            src={img.arrow}
            alt=""
            style={{ transform: `rotate(${c.windDeg}deg)` }}
          />
          <span>{roundTo(c.windSpd)}</span>
        </span>
      ),
    },
  ];

  return (
    <CardWrapper title={`Погода ${tab?TABS.filter(e=>e.key===tab)[0].label.toLowerCase():""} в ${city?.name}`}>
      <div className={s.hours}>
        <div className={s.hoursScroller}>
          <div
            className={s.hoursGrid}
            style={{
              gridTemplateColumns: `160px repeat(${cols.length}, minmax(68px, 1fr))`,
            }}
          >
            {rows.map((row, i) => (
              <Fragment key={i}>
                <div className={s.hoursLabel}>{row.label}</div>
                {cols.map((c) => (
                  <div key={`${row.label}-${c.key}`} className={s.hoursCell}>
                    {row.render(c)}
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default DayCard;