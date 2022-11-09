import styles from "../Profile.module.css";
import { useState } from "react";
import { BiRename } from "react-icons/bi";
import { BsTelephonePlusFill } from "react-icons/bs";
import useInput from "../../../../hooks/useInput";
export default function Phone({
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
      <div className={styles.changer_icon}>
        <BsTelephonePlusFill />
      </div>
      {name ? (
        <div className={styles.changer_text}>Изменить телефон</div>
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
                        firestore
                          .collection("users")
                          .doc(res.id)
                          .update({
                            phoneNumber: parseInt(nameValue.value),
                          });
                        alert("phone setted !!!!");
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
              placeholder="Введите новый номер"
              type="text"
            />
            <button type="submit">submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
