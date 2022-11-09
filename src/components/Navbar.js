import { NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "..";
import { useContext } from "react";
import { LOGIN_PATH } from "../consts";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Navbar.module.css";
import { Profile } from "../App";
export default function NavBar({ firestore }) {
  const { setProfilePage } = useContext(Profile);
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  console.log("nav ", user);
  const { day_night } = useContext(Profile);
  const [users, usersLoading] = useCollectionData(
    firestore.collection("users").orderBy("createdAt")
  );
  // getting curentUser
  const [currentUserData, setData] = useState(null);

  useEffect(() => {
    if (users) {
      if (user) {
        users.forEach((userInList) => {
          if (userInList.uid === user.uid) {
            console.log("userdata setted", userInList);
            setData(userInList);
          }
        });
      }
    }
  }, [users]);
  return (
    <div
      className={`${
        day_night.mode === "day" ? styles.navbar : styles.navbar_night
      }`}
    >
      {user ? (
        <>
          <NavLink to={LOGIN_PATH}>
            <button className={styles.hover} onClick={() => auth.signOut()}>
              log_out
            </button>
          </NavLink>
          <div
            onClick={() => setProfilePage(true)}
            className={styles.user_info}
          >
            {currentUserData ? (
              <div>{`Logged as: ${currentUserData.displayName} `}</div>
            ) : (
              ""
            )}

            <div>
              {currentUserData ? (
                <img src={currentUserData.photoURL} alt="" />
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : (
        <NavLink to={LOGIN_PATH}>
          <button className={styles.hover}>log_in</button>
        </NavLink>
      )}
    </div>
  );
}
