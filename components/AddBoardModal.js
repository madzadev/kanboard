// Test adding new board after refresh

import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import urlSlug from "url-slug";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import { api } from "../appwrite";

import styles from "./AddBoardModal.module.css";

export default function AddBoardModal({ addBoardModalVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  //   const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const router = useRouter();

  useEffect(() => {
    return () => {
      setIsOpen(!isOpen);
    };
  }, [addBoardModalVisible]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.createBoard(data, "626314f83fb2f2996b2e");
      closeModal();
      router.push(`/board/${urlSlug(data.title)}`);
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
            <h1>{addBoardModalVisible}</h1>
            <ModalHeader>
              <ModalTitle>Add a new board</ModalTitle>
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
                <input
                  {...register("description", { required: true })}
                  className={styles.input}
                />
                {errors.description && (
                  <span className={styles.error}>
                    Enter a valid description
                  </span>
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
