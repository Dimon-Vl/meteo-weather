import { useContext } from "react";
import s from "./Header.module.scss";
import cn from "classnames";
import { img } from '../../global/img'
import { roundTo } from '../../global/constAndFunc'
import { CommonContext } from "../../context/commonContext";
import Modal from "../../components/modal/Modal";

const Header = () => {
    const { value, setValue, getWeather, data } = useContext(CommonContext);
    return (
        <header className={s.header}>
            <div className={cn(s.headerContainer, "container")}>
                <div className={s.left}>
                    <div className={s.logo}>
                        <img src={img.logo} className={s.logoIcon} alt="Meteo weather" />
                        <h1 className={s.logoText}>Meteo-weather</h1>
                    </div>
                    <span className={s.city}>{data?.name||data?.city?.name} <span className={s.temp}>{roundTo(data?.main?.temp||data?.list[0]?.main?.temp)}°C</span>
                    </span>
                </div>
                <div className={s.right}>
                    <div className={s.searchBox}>
                        <input
                            className={s.searchForm}
                            type="text"
                            placeholder="Введіть населений пункт"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={getWeather}
                        />

                        <button className={s.searchBtn} type="button" onClick={getWeather}>
                            Знайти
                        </button>
                        <Modal/>
                    </div>                   
                </div>
            </div>
        </header>
    );
};

export default Header;
