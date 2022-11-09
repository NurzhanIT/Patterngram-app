import styles from "../Profile.module.css";
import { useState } from "react";
import { BiRename } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import useInput from "../../../../hooks/useInput";
export default function Email({
  firestore,
  user,
  gettingUserData,
  users,
  setData,
}) {
  const [name, setName] = useState(true);
  let nameValue = useInput("");
  return (
    <div onClick={() => setName(false)} className={styles.changer_wrapper}>
      <div
        style={{ backgroundColor: "#b484e4" }}
        className={styles.changer_icon}
      >
        <AiOutlineMail />
      </div>
      {name ? (
        <div className={styles.changer_text}>Изменить email</div>
      ) : (
        <div className={styles.changer_inpyt}>
          <form
            action=""
            onSubmit={(el) => {
              el.preventDefault();
              if (nameValue.value) {
                firestore
                  .collection("users")
                  .get()
                  .then((value) => {
                    value.docs.forEach((res) => {
                      if (res.data().uid === user.uid) {
                        firestore.collection("users").doc(res.id).update({
                          email: nameValue.value,
                        });
                        alert("email setted !!!!");
                      }
                    });
                  });
              } else {
                alert("Invalid input");
              }
              setName(true);
              nameValue.setValue("");
              // nameValue = useInput("");
            }}
          >
            <input
              {...nameValue}
              placeholder="Введите новый Email"
              type="text"
            />
            <button type="submit">submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
