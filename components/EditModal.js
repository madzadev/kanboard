import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import styles from "./EditModal.module.css";

export default function EditModal({ editModalVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  //   const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    return () => {
      setIsOpen(!isOpen);
    };
  }, [editModalVisible]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, description, due_date } = data;
    console.log(title);
    // try {
    //   const login = await api.login(email, password);
    //   const { $id } = login;
    //   setUser($id);
    //   router.push("/boards");
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  return (
    <div>
      {/* <button onClick={openModal}>Open modal</button> */}

      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal}>
            <h1>{editModalVisible}</h1>
            <ModalHeader>
              <ModalTitle>Add a new card</ModalTitle>
            </ModalHeader>
            <ModalBody>
              Duplicating this page will make it a child page of{" "}
              <span>Search - user exploration</span>, in the{" "}
              <span>Search & Smarts</span> space.
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <p>Enter the title</p>
                <input
                  {...register("title", { required: true })}
                  className={styles.input}
                />
                {errors.title && <span>Enter a valid title</span>}
                <input
                  {...register("description", { required: true })}
                  className={styles.input}
                />
                {errors.title && <span>Enter a valid description</span>}
                <input
                  {...register("due_date", { required: true })}
                  className={styles.input}
                />
                {errors.due_date && <span>Enter a valid due date</span>}

                {/* <input type="submit" className={styles.submit} /> */}
                <ModalFooter>
                  <button onClick={closeModal} className={styles.cancel}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.add} autoFocus>
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
