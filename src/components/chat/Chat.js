import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { Profile } from "../../App";
import PortfolioInfo from "./profile/ProfileInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "../Loader";
import firebase from "firebase/compat/app";
import styles from "./Chat.module.css";
import ChatAbilities from "./ChatAbilities";
import ChatView from "./ChatView";
export default function Chat() {
  const { day_night } = useContext(Profile);
  const { auth, firestore } = useContext(Context);
  const [user, load] = useAuthState(auth);
  console.log("under u", user);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  console.log(messages);
  // set user to  users collection
  const [users, usersLoading] = useCollectionData(
    firestore.collection("users").orderBy("createdAt")
  );
  // getting curentUser
  const [currentUserData, setData] = useState(null);
  // if (!currentUserData) {
  //   if (users) {
  //     users.forEach((userInList) => {
  //       if (userInList.uid === user.uid) {
  //         setInterval(setData(userInList), 1000);
  //       }
  //     });
  //   }
  // }
  // console.log(users);
  // const gettingUserData = () => {
  //   users.forEach((userInList) => {
  //     if (userInList.uid === user.uid) {
  //       console.log("userdata setted", userInList);
  //       setData(userInList);
  //     }
  //   });
  // };
  // if (users) {
  //   if (!currentUserData) {
  //     gettingUserData();
  //   }
  // }
  useEffect(() => {
    if (users) {
      users.forEach((userInList) => {
        if (userInList.uid === user.uid) {
          console.log("userdata setted", userInList);
          setData(userInList);
        }
      });
    }
  }, [users]);

  // setInterval(gettingUserData(), 1000);
  // if (users) {
  //   firestore
  //     .collection("users")
  //     .get()
  //     .then((value) => {
  //       value.docs.forEach((res) => {
  //         if (res.data().uid === user.uid) {
  //           setInterval(setData(res.data()), 1000);
  //         }
  //       });
  //     });
  // }
  //
  console.log("userInfo", user);
  if (users) {
    const isUser = users.filter((item) => item.uid === user.uid);
    if (isUser.length <= 0) {
      firestore.collection("users").add({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        phone: user.phoneNumber,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    // firestore
    //   .collection("users")
    //   .get()
    //   .then((value) => {
    //     value.docs.forEach((res) => {
    //       if (res.data().uid === user.uid) {
    //         firestore.collection("users").doc(res.id).update({
    //           email: user.email,
    //           email: user.email,
    //           phone: user.phoneNumber,
    //         });
    //         console.log("setted");
    //       }
    //     });
    //   });
  }

  //  opening or creating Private chat with encryprion
  const [opponent, setOpponent] = useState();
  const [openChat, setOpenChat] = useState(false);
  const [colectionName, setColectionName] = useState("us");
  const [certainChat, chatLoading] = useCollectionData(
    firestore.collection(colectionName).orderBy("createdAt")
  );
  console.log("user", user);

  // setNumColectionName(friendId + myConvertedUid);
  // setColectionName
  function createOrOpenChat(obj) {
    console.log(obj);
    let friendsConvertedUid = "";
    for (let i = 0; i < obj.uid.length / 3; i++) {
      if (parseInt(obj.uid[i])) {
        continue;
      } else {
        friendsConvertedUid += obj.uid[i].toLowerCase().charCodeAt(0) - 97 + 1;
      }
    }
    let myConvertedUid = "";
    for (let i = 0; i < user.uid.length / 3; i++) {
      if (parseInt(user.uid[i])) {
        continue;
      } else {
        myConvertedUid += user.uid[i].toLowerCase().charCodeAt(0) - 97 + 1;
      }
    }
    // console.log("fr id", parseInt(friendsConvertedUid));
    // setfriendId(parseInt(friendsConvertedUid));
    let ourConvertedId =
      parseInt(myConvertedUid) + parseInt(friendsConvertedUid);
    console.log("our", ourConvertedId);
    let ourStringifiedId = `${ourConvertedId}`;
    let currentCollection = "";
    console.log("our", ourStringifiedId);
    for (let i = 0; i < ourStringifiedId.length; i++) {
      currentCollection += String.fromCharCode(94 + ourStringifiedId[i]);
    }
    // console.log(currentCollection);
    // setColectionName(friendId + user.id);
    // firestore.collection(colectionName).add({
    //   uid: user.uid,
    //   displayName: user.displayName,
    //   photoURL: user.photoURL,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    // });
    setOpponent(obj);
    setColectionName(currentCollection);
    setOpenChat(true);
  }
  const sendMessage = async (el) => {
    el.preventDefault();
    if (value) {
      firestore.collection(colectionName).add({
        uid: user.uid,
        displayName: currentUserData.displayName,
        photoURL: currentUserData.photoURL,
        text: value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setValue("");
    }
  };
  //
  // theme changer
  const [themPic, setThemPic] = useState(
    "https://thumb.cloud.mail.ru/weblink/thumb/xw1/JvfR/CvFdvZq55"
  );
  const themLinkSet = (link) => {
    setThemPic(link);
  };

  // profile modal
  const [profileInfoPage, setProfileInfoPage] = useState(false);
  const [mobileChat, setMobileChat] = useState(false);
  const [openUsers, setOpenUsers] = useState(true);
  const [profileInfo, setProfilInfo] = useState(true);
  if (loading) return <Loader />;
  return (
    <>
      <div className={styles.mobile_chatpage}>
        {profileInfo ? (
          <>
            {openUsers && (
              <ChatAbilities
                themLinkSet={themLinkSet}
                createOrOpenChat={createOrOpenChat}
                user={user}
                users={users}
                loading={usersLoading}
                setProfileInfoPage={setProfileInfoPage}
                currentUserData={currentUserData}
                setOpenUsers={setOpenUsers}
                setMobileChat={setMobileChat}
                setProfilInfo={setProfilInfo}
              />
            )}
            {mobileChat && (
              <ChatView
                currentUserData={currentUserData}
                themPic={themPic}
                opponent={opponent}
                user={user}
                chatLoading={chatLoading}
                certainChat={certainChat}
                value={value}
                sendMessage={sendMessage}
                setValue={setValue}
                setOpenUsers={setOpenUsers}
                setMobileChat={setMobileChat}
              />
            )}
          </>
        ) : (
          <PortfolioInfo
            user={user}
            active={profileInfoPage}
            setActive={setProfileInfoPage}
            currentUserData={currentUserData}
            // gettingUserData={gettingUserData}
            setData={setData}
            users={users}
            setProfilInfo={setProfilInfo}
          />
        )}
      </div>
      <div className={styles.chatpage}>
        <ChatAbilities
          themLinkSet={themLinkSet}
          createOrOpenChat={createOrOpenChat}
          user={user}
          users={users}
          loading={usersLoading}
          setProfileInfoPage={setProfileInfoPage}
          currentUserData={currentUserData}
        />
        {openChat ? (
          <ChatView
            currentUserData={currentUserData}
            themPic={themPic}
            opponent={opponent}
            user={user}
            chatLoading={chatLoading}
            certainChat={certainChat}
            value={value}
            sendMessage={sendMessage}
            setValue={setValue}
          />
        ) : (
          <div
            className={`${
              day_night.mode === "day" ? styles.chatpart : styles.chatpart_night
            }`}
          >
            <div
              style={{
                background: `url(${themPic}) `,
                backgroundSize: "cover",
              }}
              className={styles.chatwindow}
            >
              <div className={styles.choose_friend}>
                Выберите, кому хотели бы написать
              </div>
            </div>
            {/* <form
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
        </form> */}
          </div>
        )}
        <PortfolioInfo
          user={user}
          active={profileInfoPage}
          setActive={setProfileInfoPage}
          currentUserData={currentUserData}
          // gettingUserData={gettingUserData}
          setData={setData}
          users={users}
        />
      </div>
    </>
  );
}
