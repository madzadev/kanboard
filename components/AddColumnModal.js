import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { boardState } from "../store/board";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import { api } from "../appwrite";

import styles from "./AddColumnModal.module.css";

export default function AddColumnModal({ addColumnModalVisible }) {
  const [activeBoard, setActiveBoard] = useRecoilState(boardState);
  const [isOpen, setIsOpen] = useState(false);
  //   const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const router = useRouter();

  useEffect(() => {
    return () => {
      setIsOpen(!isOpen);
    };
  }, [addColumnModalVisible]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data["board_id"] = activeBoard;
    try {
      await api.createColumn(data);
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
            <h1>{addColumnModalVisible}</h1>
            <ModalHeader>
              <ModalTitle>Add a new column</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(onSubmit);
                }}
                className={styles.form}
              >
                <p className={styles.title}>Enter the title</p>
                <input
                  {...register("title", { required: true })}
                  className={styles.input}
                />
                {errors.title && (
                  <span className={styles.error}>Enter a valid title</span>
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
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
}
