import styles from "./Chat.module.css";
import Users from "./users/Users";
import { useContext } from "react";
import { Profile } from "../../App";
import ProfilePage from "./profile/Profile";
export default function ChatAbilities({
  user,
  users,
  loading,
  createOrOpenChat,
  themLinkSet,
  setProfileInfoPage,
  currentUserData,
}) {
  const {
    setProfilePage,
    userListPage,
    setUserListPage,
    profilePage,
    day_night,
  } = useContext(Profile);
  const chatAbilitiesPaginationHandler = () => {
    if (!!userListPage && !profilePage) {
      return setProfilePage(true), setUserListPage(false);
    }
  };
  return (
    <div
      className={`${
        day_night.mode === "day" ? styles.abilities : styles.abilities_night
      }`}
    >
      {profilePage && (
        <ProfilePage
          currentUserData={currentUserData}
          themLinkSet={themLinkSet}
          user={user}
          profilePage={profilePage}
          setUserListPage={setUserListPage}
          setProfilePage={setProfilePage}
          setProfileInfoPage={setProfileInfoPage}
        />
      )}
      {userListPage && (
        <Users
          day_night={day_night}
          burgerAction={chatAbilitiesPaginationHandler}
          createOrOpenChat={createOrOpenChat}
          user={user}
          users={users}
          loading={loading}
        />
      )}
    </div>
  );
}
