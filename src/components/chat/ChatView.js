import styles from "./Chat.module.css";
import Loader from "../Loader";
import { Profile } from "../../App";
import { useContext } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
export default function ChatView({
  value,
  setValue,
  sendMessage,
  certainChat,
  chatLoading,
  user,
  opponent,
  themPic,
  currentUserData,
  setOpenUsers,
  setMobileChat,
  dummy,
}) {
  const { day_night } = useContext(Profile);
  if (chatLoading) return <Loader />;
  if (certainChat)
    return (
      <div
        className={`${
          day_night.mode === "day" ? styles.chatpart : styles.chatpart_night
        }`}
      >
        <div className={styles.opponents_info}>
          <div className={styles.left_part}>
            <div className={styles.opponent_img}>
              <img src={opponent.photoURL} alt="" />
            </div>
            <div>{opponent.displayName}</div>
          </div>
          <div
            onClick={() => {
              setOpenUsers(true);
              setMobileChat(false);
            }}
            className={styles.go_back_mb}
          >
            <RiArrowGoBackFill />
          </div>
        </div>
        <div
          style={{
            background: `url(${themPic}) `,
            backgroundSize: "cover",
          }}
          className={styles.chatwindow}
        >
          {certainChat.map((mes) => (
            <>
              {" "}
              <div
                // align="rigth"
                style={{ marginLeft: mes.uid === user.uid ? "80%" : "" }}
                className={styles.messageVal}
              >
                <div className={styles.user_img}>
                  <img src={mes.photoURL} alt="" />
                </div>
                <div className={styles.user_text}>
                  <div className={styles.user}>{mes.displayName}</div>
                  <div>{mes.text}</div>
                </div>
              </div>
              <div ref={dummy}></div>
            </>
          ))}
        </div>
        <div
          style={{
            background: `url(${themPic}) `,
            backgroundSize: "cover",
          }}
          className={styles.mobile_chatview}
        >
          {certainChat.map((mes) => (
            <>
              <div
                // align="rigth"

                className={styles.messageVal}
              >
                <div className={styles.user_img}>
                  <img src={mes.photoURL} alt="" />
                </div>
                <div className={styles.user_text}>
                  <div className={styles.user}>{mes.displayName}</div>
                  <div className={styles.mes_text}>{mes.text}</div>
                </div>
              </div>
              <div ref={dummy}></div>
            </>
          ))}
        </div>
        <form
          className={styles.form}
          action=""
          onSubmit={(el) => sendMessage(el)}
        >
          <input
            name="message"
            placeholder="type your message"
            value={value}
            type="text"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button type="submit">send</button>
        </form>
      </div>
    );
}
