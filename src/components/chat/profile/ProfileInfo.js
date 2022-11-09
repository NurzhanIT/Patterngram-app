import styles from "./Profile.module.css";
import { AiOutlineClose } from "react-icons/ai";
import useInput from "../../../hooks/useInput";
import { TbArrowBackUp } from "react-icons/tb";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephonePlusFill } from "react-icons/bs";
import { MdPhotoCamera } from "react-icons/md";
import { useState, useContext } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { MdLocalLibrary } from "react-icons/md";
import { Context } from "../../..";
import Phone from "./info_page/Phone";
import Email from "./info_page/Email";
import Name from "./info_page/Name";
import Ava from "./info_page/Ava";
export default function PortfolioInfo({
  user,
  setActive,
  active,
  currentUserData,
  gettingUserData,
  setData,
  users,
  setProfilInfo,
}) {
  const { firestore } = useContext(Context);
  const [name, setName] = useState(true);
  const [email, setEmail] = useState(true);
  const [phone, setPhone] = useState(true);
  const [ava, setAva] = useState(true);
  const [aboutUs, setAboutUs] = useState(true);
  const nameValue = useInput("");
  console.log(user.phone);
  return (
    <div
      onClick={() => setActive(false)}
      className={
        active
          ? `${styles.profileInfoPage} ${styles.active}`
          : `${styles.profileInfoPage}`
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          active ? `${styles.content} ${styles.active}` : `${styles.content}`
        }
      >
        <div className={styles.header_info}>
          <div className={styles.header_title}>
            <div>Profile</div>
            <div
              onClick={() => {
                setActive(false);
                setProfilInfo(true);
              }}
              className={styles.close_btn}
            >
              <AiOutlineClose />
            </div>
          </div>
          <div className={styles.user_info}>
            <div className={styles.user_main_ava}>
              {currentUserData ? (
                <img src={currentUserData.photoURL} alt="ava" />
              ) : (
                ""
              )}
            </div>
            <div className={styles.contacts}>
              <div style={{ fontWeight: "bold" }}>
                {currentUserData ? currentUserData.displayName : ""}
              </div>
              {currentUserData ? (
                <div>{currentUserData.email}</div>
              ) : (
                <div style={{ opacity: 0.5 }}>email not added</div>
              )}
              {currentUserData ? (
                <div>{currentUserData.phoneNumber}</div>
              ) : (
                <div style={{ opacity: 0.5 }}>phone not added</div>
              )}
            </div>
          </div>
        </div>
        {aboutUs ? (
          <>
            <div className={styles.body_interaction}>
              <Phone
                gettingUserData={gettingUserData}
                user={user}
                firestore={firestore}
                users={users}
                setData={setData}
              />
              <Email
                gettingUserData={gettingUserData}
                user={user}
                firestore={firestore}
                users={users}
                setData={setData}
              />
              <Name
                gettingUserData={gettingUserData}
                user={user}
                firestore={firestore}
                users={users}
                setData={setData}
              />
              <Ava
                gettingUserData={gettingUserData}
                user={user}
                firestore={firestore}
                users={users}
                setData={setData}
              />
            </div>
            <div
              onClick={() => setAboutUs(false)}
              className={styles.about_program}
            >
              <div className={styles.about_img}>
                {/* <img
                  src={
                    "https://thumb.cloud.mail.ru/weblink/thumb/xw1/Dgpg/2oXDnpNwG"
                  }
                  alt=""
                /> */}
              </div>
              <div className={styles.about_text}>О программе</div>
            </div>
            <div className={styles.contacts_and_info}>
              <div className={styles.contact_container}>
                <div className={styles.contact_icon}>
                  <FaTelegramPlane />
                </div>
                <div className={styles.contact_info}>
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href="https://t.me/patterngram"
                    target="_blank"
                  >
                    Official telegram
                  </a>
                </div>
              </div>
              <div className={styles.contact_container}>
                <div
                  style={{ backgroundColor: "#f4a03c" }}
                  className={styles.contact_icon}
                >
                  <MdLocalLibrary />
                </div>
                <div className={styles.contact_info}>
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href="https://t.me/z0ld1ck1337"
                    target="_blank"
                  >
                    IT support
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.program_info}>
            <div className={styles.program_title}>
              <div className={styles.title_text}>
                <div
                  style={{
                    fontWeight: 500,
                    marginBottom: 10,
                    fontSize: "large",
                  }}
                >
                  Patterngram Desktop
                </div>
                <div style={{ opacity: 0.5 }}>Версия 2.11 Web</div>
              </div>

              <div
                onClick={() => setAboutUs(true)}
                className={styles.close_btn}
              >
                <TbArrowBackUp />
              </div>
            </div>
            <div className={styles.program_body}>
              <div>
                Официальное бесплатное приложение для быстрого и безопасного
                обмена сообщениями на основе{" "}
                <a
                  style={{ textDecoration: "none", color: "#68acdc" }}
                  href="https://firebase.google.com/docs/reference"
                  target="_blank"
                >
                  Firebase API
                </a>
                .
              </div>
              <div>
                Эта программа запущена через{" "}
                <a
                  style={{ textDecoration: "none", color: "#68acdc" }}
                  href="https://firebase.google.com/docs/hosting"
                  target="_blank"
                >
                  FireBase Hosting
                </a>
                . Исходный код доступен на{" "}
                <a
                  style={{ textDecoration: "none", color: "#68acdc" }}
                  href="https://github.com/NurzhanIT/Patterngram.git"
                  target="_blank"
                >
                  GitHub
                </a>
                .
              </div>
              <div>
                Больше информации здесь:{" "}
                <a
                  style={{ textDecoration: "none", color: "#68acdc" }}
                  href="https://t.me/patterngram"
                  target="_blank"
                >
                  Patterngram
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
