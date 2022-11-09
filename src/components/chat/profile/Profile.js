import styles from "./Profile.module.css";
import { TbArrowBackUp } from "react-icons/tb";
import { RiMoonLine } from "react-icons/ri";
import { FaListUl } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Profile } from "../../../App";
import { useContext, useState } from "react";
import { ThemeCounter, instance } from "../../classes/singleton";
import PortfolioInfo from "./ProfileInfo";
export default function ProfilePage({
  user,
  setUserListPage,
  setProfilePage,
  profilePage,
  themLinkSet,
  setProfileInfoPage,
  currentUserData,
}) {
  const { changeTheme, day_night } = useContext(Profile);
  const [headerState, setHeaderState] = useState(true);
  const [usersPageSate, setUsersPageSate] = useState(true);
  const [themesPage, setThemesPage] = useState(false);

  return (
    <>
      {headerState && (
        <div
          className={`${
            day_night.mode === "day" ? styles.header : styles.header_night
          }`}
        >
          <div
            onClick={() => {
              setUserListPage(true);
              setProfilePage(false);
            }}
            className={styles.burger}
          >
            <TbArrowBackUp />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.user_img}>
              {currentUserData ? (
                <img src={currentUserData.photoURL} alt="" />
              ) : (
                ""
              )}
            </div>
            <div className={styles.user_info}>{user.displayName}</div>
          </div>
        </div>
      )}
      {usersPageSate && (
        <div
          className={`${
            day_night.mode === "day"
              ? styles.settings_list
              : styles.settings_list_night
          }`}
        >
          <div className={styles.settings_item}>
            <div className={styles.icon}>
              <RiMoonLine />
            </div>
            <div className={styles.item_name}>Ночной режим</div>
            <div className={styles.action}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  name="night_mod"
                  onChange={() => changeTheme()}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
          </div>
          <div
            onClick={() => {
              setThemesPage(true);
              setUsersPageSate(false);
            }}
            style={{ cursor: "pointer" }}
            className={styles.settings_item}
          >
            <div style={{ backgroundColor: "#b488f4" }} className={styles.icon}>
              <FaListUl />
            </div>
            <div className={styles.item_name}>Темы</div>
          </div>
          <div
            onClick={() => {
              setProfileInfoPage(true);
              // setHeaderState(false);
              // setUsersPageSate(false);
            }}
            style={{ cursor: "pointer" }}
            className={styles.settings_item}
          >
            <div style={{ backgroundColor: "#f4b454" }} className={styles.icon}>
              <CgProfile />
            </div>
            <div className={styles.item_name}>Профиль</div>
          </div>
        </div>
      )}
      {themesPage && (
        <div className={styles.themes}>
          <div className={styles.them_item}>
            <div
              onClick={() => {
                const them = new ThemeCounter();
                them.setTheme(
                  "https://thumb.cloud.mail.ru/weblink/thumb/xw1/Jfnf/nCYN7odhk"
                );
                themLinkSet(instance.img);
                console.log(instance.img);
              }}
            >
              <img
                src={
                  "https://thumb.cloud.mail.ru/weblink/thumb/xw1/Jfnf/nCYN7odhk"
                }
                alt=""
              />
            </div>
            <div className={styles.theme_name}>Sweety</div>
          </div>
          <div className={styles.them_item}>
            <div
              onClick={() => {
                const them = new ThemeCounter();
                them.setTheme(
                  "https://thumb.cloud.mail.ru/weblink/thumb/xw1/WVqU/9c8FfGZPd"
                );
                themLinkSet(instance.img);
                console.log(instance.img);
              }}
            >
              <img
                src={
                  "https://thumb.cloud.mail.ru/weblink/thumb/xw1/WVqU/9c8FfGZPd"
                }
                alt=""
              />
            </div>
            <div className={styles.theme_name}>Dark</div>
          </div>
          <div className={styles.them_item}>
            <div
              onClick={() => {
                const them = new ThemeCounter();
                them.setTheme(
                  "https://thumb.cloud.mail.ru/weblink/thumb/xw1/nuoH/YU3D6xLTb"
                );
                themLinkSet(instance.img);
                console.log(instance.img);
              }}
            >
              <img
                src={
                  "https://thumb.cloud.mail.ru/weblink/thumb/xw1/nuoH/YU3D6xLTb"
                }
                alt=""
              />
            </div>
            <div className={styles.theme_name}>Gray</div>
          </div>
          <div className={styles.them_item}>
            <div
              onClick={() => {
                const them = new ThemeCounter();
                them.setTheme(
                  "https://thumb.cloud.mail.ru/weblink/thumb/xw1/sVD6/Vddeak4LU"
                );
                themLinkSet(instance.img);
                console.log(instance.img);
              }}
            >
              <img
                src={
                  "https://thumb.cloud.mail.ru/weblink/thumb/xw1/sVD6/Vddeak4LU"
                }
                alt=""
              />
            </div>
            <div className={styles.theme_name}>Cute fogs</div>
          </div>
          <div className={styles.them_item}>
            <div
              onClick={() => {
                const them = new ThemeCounter();
                them.setTheme(
                  "https://thumb.cloud.mail.ru/weblink/thumb/xw1/yMqy/14F3aVkBz"
                );
                themLinkSet(instance.img);
                console.log(instance.img);
              }}
            >
              <img
                src={
                  "https://thumb.cloud.mail.ru/weblink/thumb/xw1/yMqy/14F3aVkBz"
                }
                alt=""
              />
            </div>
            <div className={styles.theme_name}>Light blue</div>
          </div>
        </div>
      )}
      <div className={styles.footer_info}>
        <div className={styles.footer_title}>Patterngram Desktop</div>
        <div className={styles.version_info}> Версия 2.11 Web</div>
      </div>
    </>
  );
}
