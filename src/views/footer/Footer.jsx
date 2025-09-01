import cn from "classnames";
import s from "./Footer.module.scss";
import {img} from '../../global/img'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={cn("container", s.footerContent)}>
        <div className={s.brand}>
          <img className={s.logo} src={img.logo} alt=""/>
          <span className={s.title}>Meteo-weather</span>
        </div>

        <div className={s.meta}>
          <span>Дані: OpenWeather</span>
          <span>© {new Date().getFullYear()} Meteo-weather</span>
        </div>
      </div>
    </footer>
  );
}
