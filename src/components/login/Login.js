import { useContext } from "react";
import { Context } from "../..";
import firebase from "firebase/compat/app";
import { NavLink } from "react-router-dom";
import { CHAT_PATH } from "../../consts";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../Navbar.module.css";
import { BsGoogle } from "react-icons/bs";
import logo from "../../static/imgs/favicon-3.png";
import mb_bg from "../../static/imgs/patterngram_logo.PNG";
import sign_bg from "../../static/imgs/signinbg.jpg";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
export default function Login() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithRedirect(provider);

    // console.log(user);
  };
  const [signIn, setSignIn] = useState(true);
  return (
    <>
      <div className={styles.welcome_page}>
        <div className={styles.greeting}>
          <div style={{ fontSize: 20 }}>Dear user, welcome to </div>
          <div
            style={{
              display: "flex",
              flrxDirection: "row",
              alignItems: "center",
            }}
          >
            <img src={logo} alt="" />
            <div style={{ fontSize: 18 }}>atterngram</div>
          </div>
        </div>
        <div style={{ width: "40%" }}>
          <NavLink to={CHAT_PATH}>
            <div onClick={() => login()} className={styles.reg_btn}>
              <div className={styles.google_icon}>
                <BsGoogle />
              </div>
              <div className={styles.reg_button}>
                <button>Войти с помощью гугл</button>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      <div
        className={
          signIn
            ? `${styles.mobile_welcome_page} ${styles.bg_first}`
            : `${styles.mobile_welcome_page} ${styles.bg_second}`
        }
      >
        {signIn ? (
          <>
            <div className={styles.logo_img}>
              <img src={mb_bg} alt="" />
            </div>
            <div className={styles.action_with}>
              <div className={styles.welcome_title}>Patterngram</div>

              <div
                onClick={() => setSignIn(false)}
                className={styles.start_message_btn}
              >
                Start messaging
              </div>
            </div>
          </>
        ) : (
          <NavLink className={styles.google_sign_in_navlink} to={CHAT_PATH}>
            <div className={styles.google_sign_in}>
              <div className={styles.google_icon}>
                <FcGoogle />
              </div>
              <div onClick={() => login()} className={styles.sign_in_text}>
                {" "}
                Sign in with google
              </div>
            </div>
          </NavLink>
        )}
      </div>
    </>
  );
}
