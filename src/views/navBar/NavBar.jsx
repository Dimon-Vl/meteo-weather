import cn from "classnames";
import s from "./NavBar.module.scss";
import { tabs } from "../../global/constAndFunc"
import { useContext } from "react";
import { CommonContext } from "../../context/commonContext";

const NavBar = () => {
    const { tab, setTab } = useContext(CommonContext)

    return (
        <nav className={s.navBar}>
            <div className={cn(s.navContainer, "container")}>
                <ul className={s.tablist}>
                    {tabs.map(t => (
                        <li key={t.key}>
                            <button
                                className={tab === t.key ? s.tabActive : s.tab}
                                onClick={() => setTab(t.key)}
                            >
                                {t.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;


