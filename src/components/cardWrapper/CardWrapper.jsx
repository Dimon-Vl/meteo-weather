import s from "./CardWrapper.module.scss";

const CardWrapper = ({title, children}) => {

  return (
    <section className={s.card}>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
      </div>
       {children}
    </section>
  );
};

export default CardWrapper;
