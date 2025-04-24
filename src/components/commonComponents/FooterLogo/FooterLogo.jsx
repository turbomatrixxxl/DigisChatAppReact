import { Link } from "react-router-dom";
import styles from "./FooterLogo.module.css";
import PropTypes from "prop-types";

const Logo = ({ variant = "default" }) => {
  return (
    <Link
      className={`${styles.logo} ${styles[variant] || styles.default}`}
      to="/"
    >
      <span>Sandbox</span>
    </Link>
  );
};

Logo.propTypes = {
  variant: PropTypes.string,
};

export default Logo;
