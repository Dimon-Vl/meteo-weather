import { useContext } from "react";
import cn from "classnames";
import s from "./MainContent.module.scss";
import { CommonContext } from "../../context/commonContext";
import NowCard from "../../components/nowCard/NowCard";
import DayCard from "../../components/dayCard/DayCard";
import Map from "../../components/map/Map";

const MainContent = () => {
    const { tab } = useContext(CommonContext);
    return (
        <main className="main">
            <div className={cn(s.mainContainer, "container")}>
                {tab === "now" && <NowCard />}
                {tab === "today" && <DayCard />}
                {tab === "tomorrow" && <DayCard />}
                {tab === "dayAfterTomorrow" && <DayCard />}
                {tab === "five" && <DayCard />}
                <Map/>
            </div>
        </main>
    );
}

export default MainContent