import styles from "../Profile.module.css";
import { useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { BsTelephonePlusFill } from "react-icons/bs";
import useInput from "../../../../hooks/useInput";
export default function Ava({ firestore, user }) {
  const [name, setName] = useState(true);
  const nameValue = useInput("");
  return (
    <div onClick={() => setName(false)} className={styles.changer_wrapper}>
      <div
        style={{ backgroundColor: "#f46c64" }}
        className={styles.changer_icon}
      >
        <MdPhotoCamera />
      </div>
      {name ? (
        <div className={styles.changer_text}>Изменить Фото</div>
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
                          photoURL: nameValue.value,
                        });
                        console.log("Ava setted");
                      }
                    });
                  });
              } else {
                alert("Invalid input");
              }
              setName(true);
            }}
          >
            <input {...nameValue} placeholder="Only URL" type="text" />
            <button className={styles.input_btn} type="submit">
              submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
