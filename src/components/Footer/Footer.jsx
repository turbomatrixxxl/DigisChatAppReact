import { useState } from "react";
import Modal from "../ModalFooter/ModalFooter";
import styles from "./Footer.module.css";

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleTextClick = () => {
    setModalOpen(true);
  };

  return (
    <footer className={styles.footer}>
      <div onClick={handleTextClick} className={styles.footerText}>
        <p>℗ & © NRB 2025</p>
        <p>Powered by Naramzoiu Radu Bogdan </p>
      </div>
      {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
    </footer>
  );
};

export default Footer;
