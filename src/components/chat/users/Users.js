import uStyles from "./Users.module.css";
import User from "./User";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Users({
  users,
  loading,
  user,
  createOrOpenChat,
  burgerAction,
  day_night,
  setOpenUsers,
  setMobileChat,
}) {
  const [seacrhValue, setSearchValue] = useState("");

  return (
    <>
      <div
        className={`${
          day_night.mode === "day" ? uStyles.search : uStyles.search_night
        }`}
      >
        <div onClick={() => burgerAction()} className={uStyles.burger}>
          <GiHamburgerMenu />
        </div>
        <input
          value={seacrhValue}
          onChange={(el) => setSearchValue(el.target.value)}
          type="text"
          placeholder="Найти пользователя..."
        />
      </div>

      <div className={uStyles.users_wrapper}>
        {users
          .filter((obj) => obj.uid !== user.uid)
          .filter((obj) => {
            const fullName = obj.displayName.toLowerCase();
            return fullName.includes(seacrhValue.toLowerCase());
          })
          .map((user) => (
            <User
              setOpenUsers={setOpenUsers}
              setMobileChat={setMobileChat}
              day_night={day_night}
              createOrOpenChat={createOrOpenChat}
              user={user}
              key={user.uid}
            />
          ))}
      </div>
    </>
  );
}
