import { useEffect, useState } from 'react';
import styles from './profileInfoItem.module.css';
import UpdateProfileModal from './updateProfileModal';

function ProfileInfoItem({ label, type, value }: { label: string; type: string; value: string }) {
  const [inputType, setInputType] = useState<string>('text');
  const [editButtonVisible, setEditButtonVisible] = useState<boolean>(false);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  //set the input type and edit button visibility based on the type of the input
  useEffect(() => {
    if (type === 'password') {
      setEditButtonVisible(true);
      setInputType('password');
    }
    if (type === 'email') {
      setEditButtonVisible(true);
      setInputType('email');
    }
  }, [type]);


  return (
    <div className={styles.profileInfoItem}>
      {modalIsVisible ? (<UpdateProfileModal type={type} setModalIsVisible={setModalIsVisible} />) : (<></>)}
      <div className={styles.inputContainer}>
        <label className={styles.label}>{label}</label>
        <input type={inputType} name={type} id={type} disabled={true} value={value} className={styles.input} />
      </div>
      {editButtonVisible ? (
        <button className={styles.editButton} onClick={() => {setModalIsVisible(true)}}>
          Edit
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProfileInfoItem;
