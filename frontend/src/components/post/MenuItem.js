const MenuItem = ({ icon, title, subtitle, img }) => {
  return (
    <li className="hover1">
      {img ? <img src={img} alt="" /> : <i className={icon}></i>}
      <span>{title}</span>
      {subtitle && <span className="menu_post_col">{subtitle}</span>}
    </li>
  );
};

export default MenuItem;
