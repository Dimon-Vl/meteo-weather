import s from "./DetailRow.module.scss";

const DetailRow =({ iconSrc, iconAlt, label, value, rotateDeg }) => {
  return (
    <div className={s.detailRow}>
      <span className={s.iconWrap}>
        <img
          className={s.svgIcon}
          src={iconSrc}
          alt={iconAlt || ""}
          style={rotateDeg != null ? { transform: `rotate(${rotateDeg}deg)` } : undefined}
        />
      </span>
      <div className={s.detailLabel}>{label}</div>
      <div className={s.detailValue}>{value}</div>
    </div>
  );
}

export default DetailRow