import { useState } from "react";
import styles from "./Users.module.css";
export default function User({
  user,
  createOrOpenChat,
  day_night,
  setOpenUsers,
  setMobileChat,
}) {
  return (
    <div
      onClick={() => {
        createOrOpenChat(user);
        setOpenUsers(false);
        setMobileChat(true);
      }}
      className={`${
        day_night.mode === "day" ? styles.user : styles.user_night
      }`}
    >
      <div className={styles.user_img}>
        <img src={user.photoURL} alt="" />
      </div>
      <div className={styles.user_text}>
        <div className={styles.user_name}>{user.displayName}</div>
        <div className={styles.text}>
          {user.email ? user.email : "empty email"}
        </div>
      </div>
    </div>
  );
}
