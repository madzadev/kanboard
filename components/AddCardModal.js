import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import { api } from "../appwrite";

import styles from "./AddCardModal.module.css";

export default function AddCardModal({ addCardModalVisible, activeColumn }) {
  const [isOpen, setIsOpen] = useState(false);
  //   const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const router = useRouter();

  useEffect(() => {
    return () => {
      setIsOpen(!isOpen);
    };
  }, [addCardModalVisible]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const posts = await api.fetchPostsByColumnId(activeColumn);
      data["pos_index"] = posts.total;
      data["column_id"] = activeColumn;
      data["user_id"] = "626314f83fb2f2996b2e";
      data["created_at"] = Date.now();
      await api.createPost(data, "626314f83fb2f2996b2e");
      closeModal();
      router.reload(window.location.pathname);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {/* <button onClick={openModal}>Open modal</button> */}

      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal} className={styles.wrapper}>
            <h1>{addCardModalVisible}</h1>
            <ModalHeader>
              <ModalTitle>Add a new card</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <p className={styles.title}>Enter the title</p>
                <input
                  {...register("title", { required: true })}
                  className={styles.input}
                />
                {errors.title && (
                  <span className={styles.error}>Enter a valid title</span>
                )}
                <p className={styles.title}>Enter the description</p>
                <textarea
                  {...register("description", { required: true })}
                  className={`${styles.input} ${styles.textarea}`}
                />
                {errors.title && (
                  <span className={styles.error}>
                    Enter a valid description
                  </span>
                )}
                <p className={styles.title}>Enter the due date (optional)</p>
                <input
                  {...register("due_date")}
                  type="date"
                  className={styles.input}
                />
                {errors.due_date && (
                  <span className={styles.error}>Enter a valid due date</span>
                )}

                {/* <input type="submit" className={styles.submit} /> */}
                <ModalFooter>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      closeModal();
                    }}
                    className={styles.cancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.add}>
                    Add
                  </button>
                </ModalFooter>
              </form>
            </ModalBody>
            {/* <ModalFooter>
              <button onClick={closeModal}>Cancel</button>
              <button onClick={closeModal} autoFocus>
                Add
              </button>
            </ModalFooter> */}
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
}
