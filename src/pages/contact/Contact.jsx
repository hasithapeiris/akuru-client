import React from "react";
import styles from "./contact.module.css";
import {
  Facebook,
  LinkedIn,
  Instagram,
  MailOutline,
  PersonAddAltOutlined,
  Language,
} from "@mui/icons-material";

function Contact() {
  return (
    <div className={styles.contactPage}>
      <div className={styles.contactContainer}>
        <h1 className={styles.contact}>අපව සම්බන්ධ කරගන්න.</h1>
        <p className={styles.para}>
          Don't hesitate to contact us, just say hello and we will reply to
          you...
        </p>
        <div className={styles.cards}>
          <div className={styles.card}>
            <PersonAddAltOutlined className={styles.cardIcon} />
            <h3 className={styles.name}>Social Media</h3>
            <div className={styles.icons}>
              <Facebook className={styles.icon} />
              <LinkedIn className={styles.icon} />
              <Instagram className={styles.icon} />
            </div>
          </div>
          <div className={styles.card}>
            <MailOutline className={styles.cardIcon} />
            <h3 className={styles.name}>Email</h3>
            <span className={styles.email}>designbyhasitha@gmail.com</span>
          </div>
          <div className={styles.card}>
            <Language className={styles.cardIcon} />
            <h3 className={styles.name}>Website</h3>
            <span className={styles.email}>www.hasithapeiris.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
